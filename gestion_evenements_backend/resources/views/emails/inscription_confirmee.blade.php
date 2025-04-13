@component('mail::message')
    # Bonjour !

    Vous êtes bien inscrit à l'événement **{{ $event->titre }}**.

    - 📍 Lieu : {{ $event->lieu }}
    - 📅 Date : {{ $event->date_debut }} → {{ $event->date_fin }}
    - 🧾 Catégorie : {{ $event->categorie ?? 'Non précisée' }}

    Merci pour votre inscription.

    @component('mail::button', ['url' => 'http://localhost:8000'])
        Voir le site
    @endcomponent

    Cordialement,
    Event Manager
@endcomponent
