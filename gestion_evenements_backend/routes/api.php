<?php

use App\Http\Controllers\AdminStatController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Routes publiques (non authentifiées)
|--------------------------------------------------------------------------
| Ces routes sont accessibles sans connexion.
*/
Route::post('/register', [AuthController::class, 'register']);  // Inscription d'un utilisateur
Route::post('/login', [AuthController::class, 'login']);        // Connexion d'un utilisateur

/*
|--------------------------------------------------------------------------
| Routes protégées par Sanctum (authentification requise)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Authentification
    |--------------------------------------------------------------------------
    */
    Route::post('/logout', [AuthController::class, 'logout']); // Déconnexion

    /*
    |--------------------------------------------------------------------------
    | Routes de test de rôle
    |--------------------------------------------------------------------------
    */
    Route::get('/admin-only', function () {
        return response()->json(['message' => 'Bienvenue Admin']);
    })->middleware('role:admin');

    Route::get('/user-only', function () {
        return response()->json(['message' => 'Bienvenue Utilisateur']);
    })->middleware('role:utilisateur');

    /*
    |--------------------------------------------------------------------------
    | Gestion des événements
    |--------------------------------------------------------------------------
    */
    Route::get('/events', [EventController::class, 'index']);          // Voir tous les événements
    Route::get('/events/{id}', [EventController::class, 'show']);      // Détail d'un événement

    Route::post('/events', [EventController::class, 'store'])          // Créer un événement
    ->middleware('role:admin');

    Route::put('/events/{id}', [EventController::class, 'update'])     // Modifier un événement
    ->middleware('role:admin');

    Route::delete('/events/{id}', [EventController::class, 'destroy']) // Supprimer un événement
    ->middleware('role:admin');

    Route::get('/events/{id}/registrations/pdf', [RegistrationController::class, 'exportPdf'])
        ->middleware(['auth:sanctum', 'role:admin']);

    Route::get('/admin/stats',[AdminStatController::class, 'stats'])
        ->middleware(['auth:sanctum', 'role:admin']);

    Route::get('/admin/users', [UserController::class, 'index'])
        ->middleware(['auth:sanctum', 'role:admin']);

    Route::put('/admin/users/{id}/role', [UserController::class, 'updateRole'])
        ->middleware(['auth:sanctum', 'role:admin']);

    Route::delete('/admin/users/{id}', [UserController::class, 'destroy'])
        ->middleware(['auth:sanctum', 'role:admin']);


    /*
    |--------------------------------------------------------------------------
    | Inscriptions aux événements
    |--------------------------------------------------------------------------
    */
    Route::post('/events/{id}/register', [RegistrationController::class, 'register']) // S'inscrire
    ->middleware('role:utilisateur');

    Route::get('/events/{id}/registrations', [RegistrationController::class, 'eventRegistrations']) // Voir les inscrits (admin)
    ->middleware('role:admin');

    Route::get('/mes-inscriptions', [RegistrationController::class, 'mesInscriptions']) // Voir mes inscriptions (utilisateur)
    ->middleware('role:utilisateur');

    Route::delete('/events/{id}/cancel', [RegistrationController::class, 'cancelRegistration'])
        ->middleware(['auth:sanctum', 'role:utilisateur']);

});
