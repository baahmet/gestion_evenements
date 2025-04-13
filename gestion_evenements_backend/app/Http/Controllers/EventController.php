<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Affiche tous les événements.
     */
    public function index()
    {
        return Event::with('user')->get();
    }

    /**
     * Crée un nouvel événement (admin uniquement).
     */
    public function store(Request $request)
    {
        $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after:date_debut',
            'lieu' => 'required|string',
            'categorie' => 'nullable|string',
            'image' => 'nullable|string',
            'capacite' => 'required|integer|min:1'
        ]);

        $event = Event::create([
            'titre' => $request->titre,
            'description' => $request->description,
            'date_debut' => $request->date_debut,
            'date_fin' => $request->date_fin,
            'lieu' => $request->lieu,
            'categorie' => $request->categorie,
            'image'=> $request->image,
            'capacite' => $request->capacite,
            'created_by' => $request->user()->id,
        ]);


        return response()->json([
            'message' => 'Événement créé avec succès.',
            'event' => $event
        ]);
    }

    /**
     * Affiche les détails d’un événement.
     */
    public function show($id)
    {
        $event = Event::with('user')->findOrFail($id);
        return $event;
    }

    /**
     * Modifie un événement (admin uniquement).
     */
    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        $request->validate([
            'titre' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'date_debut' => 'sometimes|required|date',
            'date_fin' => 'sometimes|required|date|after:date_debut',
            'lieu' => 'sometimes|required|string',
            'categorie' => 'nullable|string',
            'image' => 'nullable|string',
            'capacite' => 'sometimes|required|integer|min:1'
        ]);


        $event->update($request->all());

        return response()->json([
            'message' => 'Événement mis à jour avec succès.',
            'event' => $event
        ]);
    }

    /**
     * Supprime un événement (admin uniquement).
     */
    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();

        return response()->json(['message' => 'Événement supprimé avec succès.']);
    }
}
