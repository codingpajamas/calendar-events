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
                {"date": 20, "name": 'How are you', "duration": 3},
                {"date": 25, "name": 'Vacation Time', "duration": 3},
            ],
            selectedEvent: {
                name: ''
            }
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
            $('#editEventModal').modal('show');
        },
        saveEvent() {
            console.log('saved:', this.selectedEvent)
        },
        deleteEvent() {
            console.log('deleted:', this.selectedEvent)
        }
    }
});