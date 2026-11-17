# Shared IA

Collaborative AI chat where up to four users validate messages before the model replies.

## Overview

Full-stack app with a Node.js/Express API, Socket.io realtime layer, PostgreSQL, OpenAI, and a React/TypeScript SPA. Collective validation gates each user message before the AI responds.

## Features

- Multi-user rooms (max 4) with JWT auth
- Collective message validation before AI replies
- Realtime updates via Socket.io
- Swagger API docs
- React SPA with Zustand and Tailwind / shadcn/ui

## Stack

- Node.js, Express, Socket.io, PostgreSQL, JWT, Swagger
- React, TypeScript, Vite, Zustand, Tailwind CSS, shadcn/ui
- OpenAI API

## Layout

```
shared-ia/
├── backend/     → Express API, Socket.io, OpenAI, PostgreSQL
└── frontend/    → React + Vite SPA
```

## Run

```bash
# API
cd backend
cp env.example .env
npm install
npm run generate-secret
npm run dev

# SPA (other terminal)
cd frontend
cp env.example .env
npm install
npm run dev
```

API: `http://localhost:3001` (Swagger at `/docs`). SPA: `http://localhost:5173`.
