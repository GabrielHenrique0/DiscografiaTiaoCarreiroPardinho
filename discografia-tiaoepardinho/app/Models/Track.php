<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// app/Models/Track.php
class Track extends Model
{
    protected $fillable = ['name', 'album_id'];

    public function album()
    {
        return $this->belongsTo(Album::class);
    }
}