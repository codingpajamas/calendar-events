import moment from 'moment'

Vue.component('events-calendar', {
    props: [],

    data() {
        return {
            title: 'Calendar',
            isLoading: false,
            today: moment(),
            dateContext: moment(),
            days: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
            events: [

            ]
        }
    }, 

    mounted() {  
        this.getEvents();

        console.log(this.today, this.year, this.month, this.firstDayOfMonth, this.initialYear);
    },  

    computed: {
        year: function() {
            return this.dateContext.format('Y');
        },
        month: function() {
            return this.dateContext.format('MMMM');
        },
        daysInMonth: function () {
            return this.dateContext.daysInMonth();
        },
        currentDate: function () {
            return this.dateContext.get('date');
        },
        firstDayOfMonth: function () {
            var firstDay = moment(this.dateContext).subtract((this.currentDate - 1), 'days');
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
        addMonth: function () { 
            this.dateContext = moment(this.dateContext).add(1, 'month');
        },
        subtractMonth: function () { 
            this.dateContext = moment(this.dateContext).subtract(1, 'month');
        }
    }
});