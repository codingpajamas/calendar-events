<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/events', 'EventController@store')->name('events.store');
Route::put('/events/{event}', 'EventController@update')->name('events.update');
Route::delete('/events/{event}', 'EventController@destroy')->name('events.destroy');

Route::get('/schedules', 'ScheduleController@index')->name('schedules.index');
