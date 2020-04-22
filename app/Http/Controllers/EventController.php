<?php

namespace App\Http\Controllers;

use App\Event;
use App\Schedule;
use Illuminate\Http\Request;
use App\Http\Requests\EventRequest;
use Recurr\Rule;
use Carbon\Carbon;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('events.index');
    } 

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(EventRequest $request)
    {
        // construct the variables
        $rrule = $request->input('rrule', []); 
        $start = $request->start ? Carbon::createFromFormat('Y-m-d', $request->start) : null;
        $end = $request->end ? Carbon::createFromFormat('Y-m-d', $request->end) : $start;

        // save the event in database
        $objEvent = Event::create([
            'name' => $request->name,
            'repeat' => $request->rrule,
            'started_at' => $start,
            'ended_at' => $end
        ]);

        // return error if event was not added
        if(!$objEvent)
        {
            return response()->json([
                'errors' => [], 
                'message' => 'Unable to save new event'
            ], 422);
        } 

        // generate the event schedules by day
        // this is not necessary if we use calendar plugin
        // in the frontend like "fullcalendar"
        $rule = (new Rule)
            ->setStartDate($start)
            ->setTimezone(config('app.timezone'))
            ->setFreq('DAILY')
            ->setUntil($end);

        // check if recurrence option was passed on request, 
        // and given date was a date range
        if(@count($rrule) && $request->end)
        {
            $rule->setByDay($rrule);
        }

        // transform the RRULE into array
        $transformer = new \Recurr\Transformer\ArrayTransformer(); 
        $eventDates = $transformer->transform($rule);
        $arrSchedules = [];

        foreach ($eventDates as $eventDate) { 
            array_push($arrSchedules, array(
                'event_id' => $objEvent->id,
                'started_at' => $eventDate->getStart(),
                'ended_at' => $eventDate->getEnd()
            ));
        } 

        // bulk create schedules
        Schedule::insert($arrSchedules);

        dd($eventDates, $arrSchedules);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Event $event)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function destroy(Event $event)
    {
        //
    }
}
