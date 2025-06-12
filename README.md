# MERN + Nginx Docker Boilerplate

A modern, scalable boilerplate for MERN stack applications with complete Docker support for both development and production environments.

This setup provides:

- ⚡ Vite + TypeScript frontend with hot reload
- ⚙️ Express backend with Nodemon hot reload
- 🐳 Dockerized dev and prod environments
- 🌐 Nginx reverse proxy for production
- 🔁 Persistent MongoDB volume
- 🔒 Secure environment separation: `.env.development` and `.env.production`
- 🧩 Clear dev/prod separation

---

## 📁 Project Structure

```plaintext
backend/
  ├── src/
  └── docker-setup/
      ├── Dockerfile
      └── Dockerfile.dev

frontend/
  ├── public/
  ├── src/
  └── docker-setup/
      ├── nginx/
      │   └── default.conf
      ├── Dockerfile
      └── Dockerfile.dev

docker-compose.yml              # Production
docker-compose.dev.yml         # Development
.env.production
.env.development

```

---

## 🚀 Quick Start

### 🔧 Development

Run everything with hot reload:

```bash
docker compose -f docker-compose.dev.yml --env-file .env.development up --build
```

Access:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

> Uses **Vite** for frontend hot reload and **Nodemon** for backend.

---

### 🚢 Production

1. Set up your `.env.production` file.
2. Run production build:

```bash
docker compose -f docker-compose.yml --env-file .env.production up --build
```

- Frontend is served by Nginx on port `80`
- API is available at `/api`

---

## 🔨 Tech Stack

- **Frontend**: React, Vite, TypeScript
- **Backend**: Express, Mongoose
- **Database**: MongoDB
- **Containerization**: Docker + Docker Compose
- **Proxy (prod)**: Nginx
- **Hot Reload**:
  - Frontend: Vite (dev)
  - Backend: Nodemon (dev)

---

## ⚙️ Environment Variables

### .env.example

```env
NODE_ENV=development
PORT=5000

MONGO_INITDB_ROOT_USERNAME=devuser
MONGO_INITDB_ROOT_PASSWORD=devpass
MONGO_INITDB_DATABASE=mern_db

MONGO_INITDB_USER=appuser
MONGO_INITDB_PWD=devapppass123

MONGO_URI=mongodb://appuser:devapppass123@mongo:27017/mern_db?authSource=mern_db

# JWT secret used for token signing
JWT_SECRET=devsecretkey123

```

---

## 🌐 Routing

- `http://localhost:5000/api` (dev)
- `/api` in production via Nginx
- Vite serves dev frontend at `:3000`, Nginx serves prod frontend at `:80`

---

## 🛠 Scripts & Config

### Backend

- Dev: `npm run dev`
- Prod: `npm start`

---

### Frontend

- Dev: `npm run dev`
- Prod: `npm run build`

---

Built with ❤️ by [Zeyad Essam](https://github.com/zeyad-essam-16).  
Feel free to fork or contribute!
