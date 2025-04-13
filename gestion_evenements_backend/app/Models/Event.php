<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    //
    use HasFactory;
    protected $fillable = [
        'titre',
        'description',
        'date_debut',
        'date_fin',
        'lieu',
        'categorie',
        'image',
        'capacite',
        'created_by'
    ];

    //Plusieur evenement peut appartenier à un utilisateur
    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }



}
