<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Registration;
use App\Models\User;

class AdminStatController extends Controller
{
    public function stats()
    {
        try {
            return response()->json([
                'total_events' => Event::count(),
                'total_users' => User::count(),
                'total_inscriptions' => Registration::count(),
                'top_events' => Event::withCount('registrations')
                    ->orderByDesc('registrations_count')
                    ->take(5)
                    ->get(['id', 'titre']) // inclure les colonnes nécessaires
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors du chargement des statistiques.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
