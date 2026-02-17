# Portfolio - React + Vite + Laravel

Ce depot contient:
- `src/`: frontend portfolio (React + Vite + Tailwind)
- `backend/`: backend Laravel (base API / socle serveur)

## Frontend

### Installation
```bash
npm install
```

### Developpement
```bash
npm run dev
```

### Qualite / build
```bash
npm run lint
npm run build
```

## Auth dashboard (mode local)
Le dashboard frontend utilise un service local mocke dans `src/services/index.js`.
- Connexion admin: utiliser un email contenant `admin` (ex: `admin@demo.com`)
- Mot de passe: au moins 4 caracteres

Le token/profil/services sont stockes dans `localStorage`.

## Backend Laravel

### Installation
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

### Lancer les tests
```bash
php artisan test
```

## Etat actuel
- Lint frontend: OK
- Build frontend: OK
- Tests backend: OK
