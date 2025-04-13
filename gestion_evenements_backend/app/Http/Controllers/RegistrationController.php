<?php

namespace App\Http\Controllers;

use App\Mail\InscriptionConfirmee;
use App\Models\Event;
use App\Models\Registration;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Mail;

class RegistrationController extends Controller
{
    /**
     * Inscrire un utilisateur à un événement.
     */
    public function register(Request $request, $eventId)
    {
        $user = $request->user();
        $event = Event::findOrFail($eventId);

        // Vérifie que l'utilisateur ne s'est pas déjà inscrit
        if (Registration::where('user_id', $user->id)->where('event_id', $event->id)->exists()) {
            return response()->json(['message' => 'Vous êtes déjà inscrit à cet événement.'], 409);
        }

        // Vérifie la capacité de l'événement
        $nombreInscrits = Registration::where('event_id', $event->id)->count();
        if ($nombreInscrits >= $event->capacite) {
            return response()->json(['message' => 'La capacité maximale est atteinte.'], 400);
        }

        // Crée l'inscription
        $inscription = Registration::create([
            'user_id' => $user->id,
            'event_id' => $event->id,
            'statut' => 'valide'
        ]);

        Mail::to($user->email)->send(new InscriptionConfirmee($event));
        return response()->json([
            'message' => 'Inscription réussie.',
            'inscription' => $inscription
        ]);
    }

    public function cancelRegistration(Request $request, $eventId)
    {
        $user = $request->user();

        // Vérifie si l'utilisateur est bien inscrit à l'événement
        $registration = Registration::where('user_id', $user->id)
            ->where('event_id', $eventId)
            ->first();

        if (!$registration) {
            return response()->json([
                'message' => 'Vous n\'êtes pas inscrit à cet événement.'
            ], 404);
        }

        $registration->delete();

        return response()->json([
            'message' => 'Vous vous êtes désinscrit de l\'événement.'
        ]);
    }


    /**
     * Lister les inscriptions d’un événement (admin uniquement).
     */
    public function eventRegistrations($eventId)
    {
        $inscriptions = Registration::with('user')
            ->where('event_id', $eventId)
            ->get();

        return response()->json($inscriptions);
    }

    /**
     * Voir les événements auxquels un utilisateur est inscrit.
     */
    public function mesInscriptions(Request $request)
    {
        return Registration::with('event')
            ->where('user_id', $request->user()->id)
            ->get();
    }


    public function exportPdf($eventId)
    {
        $event = Event::findOrFail($eventId);
        $inscriptions = Registration::with('user')->where('event_id', $eventId)->get();

        $pdf = Pdf::loadView('pdf.inscriptions', [
            'event' => $event,
            'inscriptions' => $inscriptions
        ]);

        return $pdf->download('liste-inscrits-'.$event->id.'.pdf');
    }

}
