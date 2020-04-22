<?php

namespace App;

use Illuminate\Database\Eloquent\Model; 

class Schedule extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'started_at' => 'datetime',
        'ended_at' => 'datetime'
    ];

    public function event()
    {
    	return $this->belongsTo(Event::class);
    } 
}
