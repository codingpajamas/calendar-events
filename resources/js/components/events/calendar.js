import moment from 'moment'

Vue.component('events-calendar', {
    props: [],

    data() {
        return {
            isDeleting: false,
            isLoading: false,
            isSaving: false,
            today: moment(),
            dateCursor: moment(),
            days: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
            bgColors: ['#7ebdb4', '#f6d198', '#f6acc8', '#ccafaf'],
            events: [ ],
            selectedEvent: {
                name: '',
                rrule: [],
                hash: ''
            },
            selectedDate: {
                date: '',
                events: []
            },
            newEvent: {
                name: '',
                start: '',
                end: '',
                rrule: []
            },
            errors: [],
            msgError: '',
            msgSuccess: '',
        }
    }, 

    mounted() {
        this.getEvents(); 

         $('editEventModal').on('hide.bs.modal', (e) => {
            this.selectedEvent = {
                name: ''
            }
        })
    },  

    computed: {
        year: function() {
            return this.dateCursor.format('Y');
        },
        month: function() {
            return this.dateCursor.format('MMMM');
        },
        daysInMonth: function () {
            return this.dateCursor.daysInMonth();
        },
        currentDate: function () {
            return this.dateCursor.get('date');
        },
        firstDayOfMonth: function () {
            var firstDay = moment(this.dateCursor).subtract((this.currentDate - 1), 'days');
            return firstDay.weekday();
        },
        initialDate: function () { 
            return this.today.get('date');
        },
        initialMonth: function () { 
            return this.today.format('MMMM');
        },
        initialYear: function () { 
            return this.today.format('Y');
        },
        datesWithEvents: function() {
            let dates = [];

            for (let days = 1; days <= this.daysInMonth; days++) { 
                dates.push({
                    "date": days,
                    "events": this.getThisDateEvents(days)
                })
            }

            return dates;
        },
        rangeFilter: function() {
            return {
                start: this.year + '-' + this.dateCursor.format('M') + '-01',
                end: this.year + '-' + this.dateCursor.format('M') + '-' + this.daysInMonth
            }
        }
    },

    methods: {
        getEvents() {
            this.events = [];

            if(this.isLoading){
                return false;
            } 

            axios.get('/api/schedules', { params: this.rangeFilter })
                .then((response)=>{
                    response.data.data.forEach(evSched => {
                        this.events.push({
                            "date": evSched.date, 
                            "name": evSched.event.name,
                            "hash": evSched.event.hash,
                            "start": evSched.event.start,
                            "end": evSched.event.end,
                            "rrule": evSched.event.repeat
                        })
                    })

                    console.log(this.events);
                }).catch((error)=>{ 
                     
                }); 
            
            this.isLoading = false; 
        },
        addMonth() {  
            this.dateCursor = moment(this.dateCursor).add(1, 'month');
            this.getEvents()
        },
        subtractMonth() {  
            this.dateCursor = moment(this.dateCursor).subtract(1, 'month');
            this.getEvents()
        },
        getThisDateEvents(date) {
            let events = this.events.filter(event => {
                return event['date'] == date;
            })

            return events;
        },
        editEvent(event) { 
            this.selectedEvent = event;
            $('#dateEventModal').modal('hide');
            $('#editEventModal').modal('show');
        },
        saveEditEvent() { 
            if(this.isSaving){
                return false;
            }

            this.isSaving = true; 

            axios.post('/api/events/'+this.selectedEvent.hash+'?_method=PUT', this.selectedEvent)
                .then((response)=>{ 
                    this.errors = []; 
                    this.msgSuccess = 'event changes has been successfully saved.';
                    this.msgError = '';
                    this.isSaving = false; 

                    $('#editEventModal').modal('hide');
                }).catch((error)=>{ 
                    this.errors = error.response.data.errors;
                    this.msgError = 'Error in saving event changes.';
                    this.msgSuccess = '';
                    this.isSaving = false;
                }); 

            this.getEvents();
        },
        deleteEvent() { 
            if(this.isDeleting){
                return false;
            }

            this.isDeleting = true; 

            axios.delete('/api/events/'+this.selectedEvent.hash)
                .then((response)=>{  
                    this.isDeleting = false; 

                    $('#editEventModal').modal('hide');
                }).catch((error)=>{ 
                    this.isDeleting = false;
                }); 

            this.getEvents();
        },
        addEventModal() {
            $('#addEventModal').modal('show');
        },   
        saveNewEvent() {
            if(this.isSaving){
                return false;
            }

            this.isSaving = true; 

            if(!this.newEvent.end) {
                this.newEvent.end = this.newEvent.start
            }

            axios.post('/api/events', this.newEvent)
                .then((response)=>{ 
                    this.errors = []; 
                    this.msgSuccess = 'event has been successfully saved.';
                    this.msgError = '';
                    this.isSaving = false; 

                    $('#addEventModal').modal('hide');
                }).catch((error)=>{ 
                    this.errors = error.response.data.errors;
                    this.msgError = 'Error in saving new event.';
                    this.msgSuccess = '';
                    this.isSaving = false;
                }); 

            // just fetch event schedules for this month
            this.getEvents();
        },
        viewAllDateEvents(date) {
            this.selectedDate = date;
            $('#dateEventModal').modal('show');
        }
    }
});