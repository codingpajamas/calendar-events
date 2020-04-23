<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class Schedule extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $objEvent = ['hash'=>null, 'name'=>null, 'start'=>null, 'end'=>null];

        // check if "event" was lazy loaded before using to avoid n+1
        if($this->relationLoaded('event'))
        {
            $objEvent = [
                'hash' => $this->event->hash,
                'name' => $this->event->name,
                'repeat' => $this->event->repeat,
                'start' => $this->event->started_at->format('Y-m-d'),
                'end' => $this->event->ended_at->format('Y-m-d') 
            ];
        }

        return [
            'start' => $this->started_at->format('Y-m-d'),
            'date' => $this->started_at->format('j'),
            'event' => $objEvent
        ];
    }
}
