# HeroStream

Marvel & DC movie discovery built with the MERN stack. Users browse titles, rate movies, and manage watchlists. Every action publishes a Kafka event (`movie.viewed`, `movie.rated`, `watchlist.updated`) that updates trending rankings and live activity in near real time.

## Stack

- **Frontend:** React (Vite), React Router, Axios
- **Backend:** Node.js, Express, JWT auth
- **Database:** MongoDB
- **Events:** Apache Kafka (optional — works inline when disabled)

## Project structure

```
├── client/          React frontend
└── server/          Express API + Kafka consumer
```

## Local setup

### 1. MongoDB

Install MongoDB locally or create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas). Copy the connection string.

### 2. Backend

```bash
cd server
npm install
cp config.env.example config.env   # edit MONGODB_URI and JWT_SECRET
npm run seed                         # load sample Marvel & DC movies
npm run dev
```

API runs at `http://localhost:5000`.

### 3. Frontend

```bash
cd client
npm install
npm run dev
```

App runs at `http://localhost:5173`. Vite proxies `/api` to the backend.

### 4. Kafka (optional)

Set `KAFKA_ENABLED=true` in `server/config.env` and run a local Kafka broker. When disabled, events are processed inline — fine for development and demos.

## API overview

| Route | Description |
|-------|-------------|
| `POST /api/auth/register` | Create account |
| `POST /api/auth/login` | Get JWT |
| `GET /api/movies` | List/search movies |
| `GET /api/movies/trending` | Trending rankings |
| `POST /api/movies/:id/rate` | Rate a movie (auth) |
| `GET /api/watchlist` | User watchlist (auth) |
| `GET /api/activity` | Live activity feed |

## Deployment

Deploy the **frontend** and **backend** separately (standard MERN pattern).

### What the deployment videos cover

The tutorial author’s [MERN setup guide](https://javascript.plainenglish.io/setup-your-mern-stack-app-tutorial-4e81c05da2fe) walks through local dev; companion YouTube videos (e.g. [this deployment walkthrough](https://www.youtube.com/watch?v=eJWXN7pBEkk)) typically cover:

1. **MongoDB Atlas** — cloud database, connection string, IP whitelist
2. **Backend on Render/Railway** — push `server/` to GitHub, connect repo, set env vars (`MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`, `KAFKA_*`)
3. **Frontend on Vercel/Netlify** — deploy `client/`, set `VITE_API_URL` to your live API URL
4. **CORS** — set `CLIENT_URL` on the server to your deployed frontend URL

### Recommended steps for HeroStream

1. Push the repo to GitHub.
2. **MongoDB Atlas:** Create cluster → get URI → add to backend env.
3. **Backend (Render):** Root directory `server`, start command `node server.js`, add all vars from `config.env.example`.
4. **Frontend (Vercel):** Root directory `client`, build `npm run build`, output `dist`, env `VITE_API_URL=https://your-api.onrender.com/api`.
5. Update `CLIENT_URL` on the backend to your Vercel URL.
6. Run `npm run seed` once against Atlas (locally with Atlas URI) to populate movies.

Kafka in production requires a managed broker (e.g. Confluent Cloud). For school demos, keep `KAFKA_ENABLED=false` — trending still works via inline processing.

## Features

- Browse & filter Marvel / DC movies
- JWT authentication
- Ratings, watchlists, and analytics
- Responsive UI with CSS animations
- Event-driven trending & activity feed

---

Built following MERN conventions from [JavaScript in Plain English](https://javascript.plainenglish.io/setup-your-mern-stack-app-tutorial-4e81c05da2fe).
