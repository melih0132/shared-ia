# Frontend

React + Vite SPA for the collaborative AI chat.

## Overview

Auth screens, room UI, and realtime Socket.io client. Talks to the backend API for JWT sessions and validated AI replies.

## Stack

- React, TypeScript, Vite
- Zustand, React Hook Form, Axios
- Tailwind CSS, shadcn/ui (Radix)

## Layout

```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── lib/
│   ├── store/
│   └── ...
├── env.example
└── package.json
```

## Run

Requires the backend on `http://localhost:3001`.

```bash
cp env.example .env
npm install
npm run dev
```

App: `http://localhost:5173`. Env keys: `VITE_API_URL`, `VITE_SOCKET_URL`.
