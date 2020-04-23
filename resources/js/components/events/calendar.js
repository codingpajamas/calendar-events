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
        // fetch the event schedules for the current month
        this.getEvents(); 

        // reset the selected event when closing the modal
        $('#editEventModal').on('hide.bs.modal', (e) => {
            this.selectedEvent = {
                name: '',
                rrule: [],
                hash: ''
            }

            this.setMsg([], '', '');
        });

        // reset the form and errors when closing the modal
        $('#addEventModal').on('hide.bs.modal', (e) => {
            this.setMsg([], '', '');

            this.newEvent = {
                name: '',
                start: '',
                end: '',
                rrule: []
            }
        })
    },  

    computed: {
        /*
        * get the current Year
        */ 
        year: function() {
            return this.dateCursor.format('Y');
        },

        /*
        * get the current Month
        */ 
        month: function() {
            return this.dateCursor.format('MMMM');
        },

        /*
        * get how many days in the current month
        */ 
        daysInMonth: function () {
            return this.dateCursor.daysInMonth();
        },

        /*
        * 
        */ 
        currentDate: function () {
            return this.dateCursor.get('date');
        },

        /*
        *  
        */ 
        firstDayOfMonth: function () {
            var firstDay = moment(this.dateCursor).subtract((this.currentDate - 1), 'days');
            return firstDay.weekday();
        },

        /*
        *  
        */ 
        initialDate: function () { 
            return this.today.get('date');
        },

        /*
        *  
        */ 
        initialMonth: function () { 
            return this.today.format('MMMM');
        },

        /*
        * 
        */ 
        initialYear: function () { 
            return this.today.format('Y');
        },

        /*
        * create an array of dates with events to loop in the calendar grid
        */ 
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

        /*
        * create a query filter : start and end date of current month
        */ 
        rangeFilter: function() {
            return {
                start: this.year + '-' + this.dateCursor.format('M') + '-01',
                end: this.year + '-' + this.dateCursor.format('M') + '-' + this.daysInMonth
            }
        }
    },

    methods: {
        /*
        * fetch all event schedules for the current month
        */
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
                }).catch((error)=>{ 
                     
                }); 
            
            this.isLoading = false; 
        },

        /*
        * adjust current month to next month
        */
        addMonth() {  
            this.dateCursor = moment(this.dateCursor).add(1, 'month');
            this.getEvents()
        },

        /*
        * adjust current month to previous month
        */
        subtractMonth() {  
            this.dateCursor = moment(this.dateCursor).subtract(1, 'month');
            this.getEvents()
        },

        /*
        * open the daily events modal to display all events on that day 
        * which are not displayed in the grid
        */ 
        viewAllDateEvents(date) {
            this.selectedDate = date;
            $('#dateEventModal').modal('show');
        },

        /*
        * open the add event modal
        */ 
        addEventModal() {
            $('#addEventModal').modal('show');
        }, 

        /*
        * open the edit event modal
        */ 
        openEditModal(event) { 
            this.selectedEvent = event;
            $('#dateEventModal').modal('hide');
            $('#editEventModal').modal('show');
        },

        /*
        * save the new event to database
        */  
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
                    this.setMsg([], response.data.message, '');
                    
                    // close modal
                    setTimeout(()=>{
                        $('#addEventModal').modal('hide');
                    }, 500)
                    
                    // just fetch event schedules for this month
                    this.getEvents(); 
                }).catch((error)=>{ 
                    this.setMsg(error.response.data.errors, '', error.response.data.message);
                });  
        },

        /*
        * save changes to datebase 
        */ 
        saveEditEvent() { 
            if(this.isSaving){
                return false;
            }

            this.isSaving = true; 

            axios.post('/api/events/'+this.selectedEvent.hash+'?_method=PUT', this.selectedEvent)
                .then((response)=>{  
                    this.setMsg([], response.data.message, '');

                    // close the modal
                    setTimeout(()=>{
                        $('#editEventModal').modal('hide');
                    }, 500)

                    this.getEvents();
                }).catch((error)=>{
                    this.setMsg(error.response.data.errors, '', error.response.data.message);
                });  
        },

        /*
        * delete the event
        */ 
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

        /*
        * helper function to get events for specific date
        */ 
        getThisDateEvents(date) {
            let events = this.events.filter(event => {
                return event['date'] == date;
            })

            return events;
        },

        setMsg(errs, msgSuccess, msgError) {
            this.errors = errs; 
            this.msgSuccess = msgSuccess;
            this.msgError = msgError;
            this.isSaving = false; 
        }
    }
});