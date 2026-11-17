# Backend

Node.js/Express API with Socket.io for the collaborative AI chat.

## Overview

JWT auth, PostgreSQL (Supabase-compatible), OpenAI completion, and Swagger docs. Serves the realtime room and validation flow used by the SPA.

## Stack

- Node.js 18+, Express, Socket.io
- PostgreSQL, JWT, bcrypt, Zod
- OpenAI API, Swagger UI

## Layout

```
backend/
├── scripts/     → helpers (DB test, JWT secret)
├── src/
│   ├── config/  → database, socket, swagger
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   └── server.js
├── env.example
└── package.json
```

## Run

```bash
cp env.example .env
npm install
npm run generate-secret
npm run dev
```

Set `DATABASE_URL`, `JWT_SECRET`, `OPENAI_API_KEY`, and `CLIENT_URL` in `.env`. Default port: `3001`. Docs: `http://localhost:3001/docs`.
