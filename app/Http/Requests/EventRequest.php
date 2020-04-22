<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EventRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'start' => 'required|date|date_format:Y-m-d|before:end',
            'end' => 'nullable|date|date_format:Y-m-d|after:start',
            // 'required|date|date_format:Y-m-d|before:end_at', 
        ];
    }
}