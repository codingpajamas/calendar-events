<?php

namespace App\Http\Controllers;

use App\Event;
use App\Schedule;
use Illuminate\Http\Request; 
use Carbon\Carbon;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $schedules = Schedule::get();
        return $schedules;
    }
}
