<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->onDelete('cascade');   // Utilisateur inscrit
            $table->foreignId('event_id')->constrained()->onDelete('cascade');  // Événement concerné

            $table->enum('statut', ['en_attente', 'valide'])->default('en_attente'); // Statut de l'inscription

            $table->timestamps();

            // Empêche un utilisateur de s’inscrire deux fois au même événement
            $table->unique(['user_id', 'event_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
