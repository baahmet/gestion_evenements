<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Enregistre un nouvel utilisateur (rôle par défaut : utilisateur).
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed|min:6',
            'role' => 'in:admin,utilisateur' // optionnel pour créer un admin
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'] ?? 'utilisateur'
        ]);

        return response()->json([
            'message' => 'Utilisateur enregistré avec succès.',
            'user' => $user
        ]);
    }

    /**
     * Connecte un utilisateur et génère un token.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Les informations sont incorrectes.']
            ]);
        }

        return response()->json([
            'message' => 'Connexion réussie.',
            'token' => $user->createToken('api-token')->plainTextToken,
            'user' => $user
        ]);
    }

    /**
     * Déconnecte un utilisateur (supprime le token actif).
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnexion réussie.']);
    }
}
