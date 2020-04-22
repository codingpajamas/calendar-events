@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
           <events-calendar inline-template>
                <div> 
                    <div class="calendar">
                        <div class="calendar-header py-2 px-5 text-center">
                            <a @click="subtractMonth" class="btn btn-default btn-sm">
                                <i class="fa fa-fw fa-chevron-left"></i>
                            </a>
                            
                            @{{month + ' - ' + year}}

                            <a @click="addMonth" class="btn btn-default btn-sm">
                                <i class="fa fa-fw fa-chevron-right"></i>
                            </a>
                            
                        </div>
                        <ul class="weekdays">
                            <li v-for="day in days">@{{day}}</li>
                        </ul>
                        <ul class="dates">
                            <li v-for="blank in firstDayOfMonth">&nbsp;</li>
                            <li v-for="date in daysInMonth" 
                                :class="{'current-day': date == initialDate && month == initialMonth && year == initialYear}"
                            >
                                <span class="date-num">@{{date}}</span>
                                <span class="date-events">
                                    <span class="event-item text-truncate"
                                        v-bind:style="{ backgroundColor: bgColors[evIndex] }"
                                        v-for="(event, evIndex) in getThisDateEvents(date)"
                                        @click="editEvent(event)"
                                    >@{{event['name']}}</span>
                                </span>
                           </li>
                        </ul>
                    </div>

                    @include('events.edit-modal') 
                </div>
            </events-calendar> 
        </div>
    </div> 
</div>
@endsection
