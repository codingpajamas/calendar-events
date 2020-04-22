<?php

namespace App\Http\Controllers;

use App\Event;
use App\Schedule;
use Illuminate\Http\Request; 
use Carbon\Carbon;
use App\Http\Resources\Schedule as ScheduleResource;
use App\Http\Resources\ScheduleCollection;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $strStart = $request->start ? Carbon::createFromFormat('Y-m-d', $request->start) : null;
        $strEnd = $request->end ? Carbon::createFromFormat('Y-m-d', $request->end) : $strStart; 

        // basic date checking
        if(($strStart && $strEnd) && $strStart->greaterThan($strEnd)) 
        {
            return response()->json([
                'errors' => [], 
                'message' => 'End date should be greater than start date when filtering by date range.'
            ], 400);
        }

        $schedules = Schedule::ofRange($strStart, $strEnd)->with('event')->get(); 
        return new ScheduleCollection($schedules);
    }
}
