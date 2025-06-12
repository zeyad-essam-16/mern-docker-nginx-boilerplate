# MERN + Nginx Docker Boilerplate

A modern, scalable boilerplate for MERN stack applications with complete Docker support for both development and production environments.

This setup provides:

- ⚡ Vite + TypeScript frontend with hot reload
- ⚙️ Express backend with Nodemon hot reload
- 🐳 Dockerized dev and prod environments
- 🌐 Nginx reverse proxy for production
- 🔁 Persistent MongoDB volume with auth
- 🔒 Secure environment separation: `.env.development` and `.env.production`
- 🧩 Clear dev/prod separation

---

## 📁 Project Structure

```plaintext
backend/
  ├── src/
  ├── Dockerfile
  └── Dockerfile.dev

frontend/
  ├── public/
  ├── src/
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
- **Database**: MongoDB with auth
- **Containerization**: Docker + Docker Compose
- **Proxy (prod)**: Nginx
- **Hot Reload**:
  - Frontend: Vite (dev)
  - Backend: Nodemon (dev)

---

## ⚙️ Environment Variables

### .env.development

```env
NODE_ENV=development
PORT=5000
MONGO_INITDB_ROOT_USERNAME=devuser
MONGO_INITDB_ROOT_PASSWORD=devpass
MONGO_INITDB_DATABASE=mern_db
MONGO_URI=mongodb://devuser:devpass@mongo:27017/mern_db?authSource=admin
JWT_SECRET=devsecret
```

### .env.production

```env
NODE_ENV=production
PORT=5000
MONGO_INITDB_ROOT_USERNAME=your_mongo_user
MONGO_INITDB_ROOT_PASSWORD=your_mongo_password
MONGO_INITDB_DATABASE=mern_db
MONGO_URI=mongodb://your_mongo_user:your_mongo_password@mongo:27017/mern_db?authSource=admin
JWT_SECRET=a_very_secret_key_for_jwt_tokens_change_this_in_production
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

**Nodemon Config:**

```json
{
  "watch": ["src"],
  "ext": "ts,js,json",
  "ignore": ["node_modules"],
  "exec": "node src/server.js",
  "legacyWatch": true
}
```

---

### Frontend

- Dev: `npm run dev`
- Prod: `npm run build`

---

## 🚀 Future Enhancements

- **Enable HTTPS with SSL termination** by integrating **Let's Encrypt with Nginx via Certbot**, leveraging the existing Nginx setup for secure production delivery.
- **Migrate the Express backend to TypeScript** for enhanced type safety, maintainability, and developer experience.
- **Implement GitHub Actions CI/CD** for automated testing, builds, and deployments.
- **Integrate centralized logging and monitoring** using **Loki + Grafana** for scalable and lightweight observability with intuitive dashboards.

---

Built with ❤️ by [Zeyad Essam](https://github.com/zeyad-essam-16).  
Feel free to fork or contribute!
