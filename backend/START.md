# Guide de démarrage rapide

## Problème : Backend non démarré

Si vous voyez des erreurs `ERR_CONNECTION_REFUSED`, c'est que le backend n'est pas démarré.

## Étapes pour démarrer le backend

### 1. Créer le fichier `.env`

Créez un fichier `.env` dans le dossier `backend/` avec le contenu suivant :

```env
# Base de données PostgreSQL (Supabase)
DATABASE_URL=postgresql://user:password@host:port/database

# JWT
JWT_SECRET=your-secret-key-change-in-production

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key

# Serveur
PORT=3001
NODE_ENV=development

# Frontend (pour CORS)
CLIENT_URL=http://localhost:5173
```

### 2. Configurer la base de données

**Option A : Utiliser Supabase (recommandé)**
1. Créer un projet sur [Supabase](https://supabase.com)
2. Aller dans Settings > Database
3. Copier la connection string (URI)
4. Remplacer `DATABASE_URL` dans le `.env`

**Option B : PostgreSQL local**
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/shared_ia
```

### 3. Générer une clé JWT secrète

```bash
cd backend
npm run generate-secret
```

Copiez la clé générée dans `JWT_SECRET` du fichier `.env`.

### 4. Ajouter votre clé OpenAI

Remplacer `OPENAI_API_KEY` par votre vraie clé API OpenAI.

### 5. Initialiser la base de données

Exécutez le schéma SQL dans votre base de données :

```bash
# Si vous utilisez Supabase, allez dans SQL Editor et exécutez :
# Le contenu du fichier src/schema.sql
```

### 6. Démarrer le backend

```bash
cd backend
npm install  # Si ce n'est pas déjà fait
npm run dev
```

Vous devriez voir :
```
Serveur demarre sur http://localhost:3001
Documentation disponible sur http://localhost:3001/docs
Socket.io pret a recevoir des connexions
```

### 7. Vérifier que ça fonctionne

Ouvrez dans votre navigateur :
- http://localhost:3001/health (devrait retourner `{"status":"ok"}`)
- http://localhost:3001/docs (documentation Swagger)

## Démarrer le frontend

Dans un autre terminal :

```bash
cd frontend
npm install  # Si ce n'est pas déjà fait
npm run dev
```

Le frontend devrait maintenant se connecter au backend !

