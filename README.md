
# 🎉 Event Manager – Gestion des Événements

Bienvenue dans **Event Manager**, une application web complète de gestion d’événements avec inscription en ligne, espace admin, animation moderne et notifications.

> 🔐 Backend Laravel 12 — 🌐 Frontend Angular 19 — 🎨 UI stylisée avec animations CSS + mode sombre.

---

## 📌 Fonctionnalités principales

### 👥 Utilisateurs
- 🔐 Authentification (register / login / logout)
- 🔄 Rôles : `admin` et `utilisateur`
- 🧍 Accès personnalisé (dashboard utilisateur et admin)

### 📅 Événements
- 📌 Création, édition et suppression (admin)
- 🌍 Consultation publique des événements (tous)
- 📷 Image dynamique + description, lieu, date, capacité

### 📝 Inscriptions
- ✅ Inscription / désinscription à un événement
- 📋 Liste des événements inscrits
- 🧠 Vérification de la capacité maximale
- 🛑 Pas de doublon d'inscription

### ⚙️ Admin
- 📊 Tableau de bord avec statistiques
- 🧭 Accès rapide : événements, utilisateurs, inscriptions
- 📥 Export PDF des participants
- 📧 Notification email lors d’une inscription

---

## 🚀 Technologies utilisées

### Frontend (Angular)
- Angular 19 + standalone components
- Angular Router & Lazy loading
- Animations CSS (fade, slide, wave background…)
- Mode clair / sombre
- Lottie animations (JSON)

### Backend (Laravel)
- Laravel 12 API RESTful
- Sanctum pour l’authentification
- Middleware par rôle
- Eloquent ORM
- PDF + Email (Mailables)

---

## 📂 Structure du projet

```bash
event-manager/
├── frontend/         # Angular (src/)
├── backend/          # Laravel (app/, routes/, etc.)
├── README.md
```

---

## 📦 Installation locale

### Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### Frontend (Angular)
```bash
cd frontend
npm install
ng serve
```

---

## 📸 Aperçu

![dashboard utilisateur](docs/screens/dashboard-user.png)

![liste événements](docs/screens/event-list.png)

![inscription admin](docs/screens/admin-panel.png)

---

## 🧑‍💻 Développeur

**Nom :** _Mohamet Lamine Ba ET Mouhamadou Al Bachir Ba_  
**Email :** _baahmet126example.com_  
**Université :** Université Iba Der Thiam de Thiès

---

## ⚖️ Licence

Ce projet est open source sous licence MIT.

---

> ✨ Merci d’avoir utilisé **Event Manager**. Si tu l’aimes, ⭐️ ce repo !
