@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
           <events-calendar inline-template>
                <div> 
                    <div class="calendar" v-cloak>
                        <div class="calendar-header py-2 px-5 text-center">
                            <div class="d-inline-block mr-5">
                                <a @click="subtractMonth" class="btn btn-default btn-sm">
                                    <i class="fa fa-fw fa-chevron-left"></i>
                                </a>
                                
                                @{{month + ' - ' + year}}

                                <a @click="addMonth" class="btn btn-default btn-sm">
                                    <i class="fa fa-fw fa-chevron-right"></i>
                                </a>
                            </div>
                            
                            <a @click="addEventModal" class="btn btn-default btn-sm ml-5">
                                <i class="fa fa-plus"></i> Add Event
                            </a>
                        </div>
                        <ul class="weekdays">
                            <li v-for="day in days">@{{day}}</li>
                        </ul>
                        <ul class="dates">
                            <li v-for="blank in firstDayOfMonth">&nbsp;</li>
                            <li v-for="date in datesWithEvents" 
                                :class="{'current-day': date.date == initialDate && month == initialMonth && year == initialYear}"
                            >
                                <span class="date-num">@{{date.date}}</span>
                                <span class="date-events">
                                    <span class="event-item text-truncate"
                                        v-bind:style="{ backgroundColor: bgColors[evIndex] }"
                                        v-for="(event, evIndex) in date.events.slice(0,2)"
                                        @click="openEditModal(event)"
                                    >@{{event['name']}}</span>
                                    
                                    <span class="event-item"
                                        v-if="date.events.length > 2"
                                        @click="viewAllDateEvents(date)"
                                    >
                                        view all...
                                    </span>
                                </span>
                           </li>
                        </ul>
                    </div>

                    @include('events.edit-modal') 
                    @include('events.add-modal') 
                    @include('events.dateevents-modal') 
                </div>
            </events-calendar> 
        </div>
    </div> 
</div>
@endsection
