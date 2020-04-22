<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hashids\Hashids;

class Event extends Model
{
   	protected $guarded = ['id'];

    protected $casts = [
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
        'repeat' => 'array',
    ];

   	public function schedules()
    {
    	return $this->hasMany(Schedule::class);
    }

    // we will use the hash column for type-hinting
    public function getRouteKeyName()
    {
        return 'hash';
    }

    // when a event was created, update its Hash value
    public static function boot()
    {
        parent::boot();

        self::created(function($model){
            $eventhash = new Hashids('event', 8, 'abcdefghijklmnopqrstuvwxyz1234567890');   
            $model->hash = $eventhash->encode($model->id); 
            $model->save();
        });
    }
}
