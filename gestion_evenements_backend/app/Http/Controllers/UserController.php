<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return User::select('id', 'name', 'email', 'role', 'created_at')->get();
    }

    public function updateRole(Request $request, $id)
    {
        $request->validate(['role' => 'required|in:admin,utilisateur']);
        $user = User::findOrFail($id);
        $user->role = $request->role;
        $user->save();

        return response()->json(['message' => 'Rôle mis à jour.']);
    }

    public function destroy($id)
    {
        $admin = auth()->user();

        if ($admin->id == $id) {
            return response()->json(['message' => 'Vous ne pouvez pas vous supprimer vous-même.'], 403);
        }

        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé.']);
    }
}
