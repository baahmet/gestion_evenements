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
        Schema::create('events', function (Blueprint $table) {
            $table->id();

            // Informations principales de l'événement
            $table->string('titre');               // Titre de l'événement
            $table->text('description')->nullable(); // Description optionnelle
            $table->dateTime('date_debut');// Date et heure de debut de l'événement
            $table->dateTime('date_fin'); // Date et heure de fin de l'événement
            $table->string('lieu');                // Lieu de l'événement
            $table->string('categorie')->nullable(); // Catégorie (conférence, formation...)
            $table->string('image')->nullable();
            $table->Integer('capacite')->nullable();
            // Créateur de l'événement
            $table->foreignId('created_by')
                ->constrained('users')->onDelete('cascade');

            $table->timestamps(); // created_at / updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');

    }
};
