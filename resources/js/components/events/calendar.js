import moment from 'moment'

Vue.component('events-calendar', {
    props: [],

    data() {
        return {
            isLoading: false,
            today: moment(),
            dateCursor: moment(),
            days: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
            bgColors: ['#7ebdb4', '#f6d198', '#f6acc8', '#ccafaf'],
            events: [
                {"date": 2, "name": 'Event 1', "duration": 1},
                {"date": 2, "name": 'Event Long Name', "duration": 3},
                {"date": 2, "name": 'Just Another Event', "duration": 3},
                {"date": 20, "name": 'How are you', "duration": 3},
                {"date": 25, "name": 'Vacation Time', "duration": 3},
            ],
            selectedEvent: {
                name: ''
            },
            selectedDate: {
                date: '',
                events: []
            },
            newEvent: {
                name: '',
                date: ''
            }
        }
    }, 

    mounted() {  
        console.log(this.datesWithEvents);
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
        }
    },

    methods: {
        getEvents(page) {
            if(this.isLoading){
                return false;
            }
            
            this.isLoading = false; 
        },
        addMonth() { 
            this.dateCursor = moment(this.dateCursor).add(1, 'month');
        },
        subtractMonth() { 
            this.dateCursor = moment(this.dateCursor).subtract(1, 'month');
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
        saveEvent() {
            console.log('saved:', this.selectedEvent) 
        },
        deleteEvent() {
            console.log('deleted:', this.selectedEvent)
        },
        addEventModal() {
            $('#addEventModal').modal('show');
        },   
        submitEventModal() {
            this.events.push({
                "date": this.newEvent.date, 
                "name": this.newEvent.name, 
                "duration": 3
            })

            $('#addEventModal').modal('hide');
        },
        viewAllDateEvents(date) {
            this.selectedDate = date;
            $('#dateEventModal').modal('show');
        }
    }
});