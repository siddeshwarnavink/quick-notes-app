<?php

namespace Siddeshrocks\Models;

use Illuminate\Database\Eloquent\Model;

class Notes extends Model
{
    protected $table = 'notes';

    protected $fillable = [
        'title',
        'content',
        'user',
    ];
}
