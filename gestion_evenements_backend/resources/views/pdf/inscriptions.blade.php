
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Liste des inscrits</title>
    <style>
body { font-family: DejaVu Sans, sans-serif; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #999; padding: 8px; text-align: left; }
    th { background-color: #f5f5f5; }
    </style>
</head>
<body>
    <h2>Événement : {{ $event->titre }}</h2>
<p>Date : {{ $event->date_debut }} → {{ $event->date_fin }}</p>
<p>Lieu : {{ $event->lieu }}</p>
<h3>Liste des participants :</h3>
<table>
    <thead>
    <tr>
        <th>#</th>
        <th>Nom</th>
        <th>Email</th>
        <th>Statut</th>
    </tr>
    </thead>
    <tbody>
    @foreach($inscriptions as $i => $inscrit)
        <tr>
            <td>{{ $i + 1 }}</td>
            <td>{{ $inscrit->user->name }}</td>
            <td>{{ $inscrit->user->email }}</td>
            <td>{{ $inscrit->statut }}</td>
        </tr>
    @endforeach
    </tbody>
</table>
</body>
</html>

