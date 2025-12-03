# Backend - Application de Chat IA Collaboratif

Backend Node.js/Express avec Socket.io pour l'application de chat IA collaboratif.

## Prérequis

- Node.js 18+
- PostgreSQL (via Supabase)
- Clé API OpenAI

## Installation

1. Installer les dépendances :
```bash
npm install
```

2. Créer un fichier `.env` à la racine du dossier `backend` :
```env
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-secret-key-change-in-production
OPENAI_API_KEY=sk-your-openai-api-key
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:5173
USE_HTTPS=false
```

3. Configurer Supabase :
   - Créer un projet sur [Supabase](https://supabase.com)
   - Récupérer l'URL de connexion PostgreSQL depuis les paramètres du projet
   - L'URL ressemble à : `postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres`
   - Copier cette URL dans `DATABASE_URL` du fichier `.env`

4. Générer une clé JWT secrète :
```bash
npm run generate-secret
```

5. Lancer le serveur :
```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3001`

## Documentation API

Une fois le serveur démarré, la documentation Swagger est disponible sur :
- http://localhost:3001/docs

## Structure du projet

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js      # Configuration PostgreSQL
│   │   ├── socket.js         # Configuration Socket.io
│   │   └── swagger.js        # Configuration Swagger/OpenAPI
│   ├── middleware/
│   │   └── auth.js           # Middleware d'authentification JWT
│   ├── routes/
│   │   ├── auth.js           # Routes d'authentification
│   │   ├── rooms.js          # Routes des rooms
│   │   └── invitations.js   # Routes des invitations
│   ├── schema.sql            # Schéma de base de données
│   └── server.js             # Point d'entrée du serveur
├── scripts/
│   ├── generate-secret.js    # Script pour générer une clé JWT
│   └── test-db.js            # Script pour tester la connexion DB
├── .env                      # Variables d'environnement (à créer)
├── env.example              # Exemple de configuration
└── package.json
```

## API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

### Rooms
- `POST /api/rooms` - Créer une room
- `GET /api/rooms` - Lister les rooms de l'utilisateur
- `GET /api/rooms/:roomId` - Récupérer une room
- `DELETE /api/rooms/:roomId` - Supprimer une room

### Invitations
- `POST /api/invitations` - Créer une invitation
- `GET /api/invitations/pending` - Lister les invitations en attente
- `POST /api/invitations/:id/accept` - Accepter une invitation
- `POST /api/invitations/:id/reject` - Refuser une invitation

## Socket.io Events

### Client → Serveur
- `join-room` - Rejoindre une room
- `leave-room` - Quitter une room
- `send-message` - Envoyer un message (à implémenter)

### Serveur → Client
- `authenticated` - Confirmation d'authentification
- `room-joined` - Confirmation de jointure à une room
- `error` - Erreur

## Base de données

Le schéma SQL est automatiquement créé au démarrage du serveur. Les tables créées sont :
- `users` - Utilisateurs
- `rooms` - Rooms de conversation
- `room_members` - Membres des rooms
- `messages` - Messages
- `message_validations` - Validations de messages
- `message_conflicts` - Conflits de messages
- `conflict_messages` - Liaison messages/conflits
- `votes` - Votes pour résoudre les conflits
- `invitations` - Invitations

## Scripts disponibles

- `npm run dev` - Démarrer le serveur en mode développement (avec watch)
- `npm start` - Démarrer le serveur en mode production
- `npm run test-db` - Tester la connexion à la base de données
- `npm run generate-secret` - Générer une clé JWT secrète


## Notes

- Le backend utilise JWT pour l'authentification
- Les tokens expirent après 7 jours
- Rate limiting : 100 requêtes/minute par IP
- Socket.io nécessite un token JWT dans `auth.token` lors de la connexion
- La documentation Swagger est disponible sur `/docs`
