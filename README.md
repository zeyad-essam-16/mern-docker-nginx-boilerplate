# MERN + Nginx Docker Boilerplate

A modern, scalable boilerplate for MERN stack applications with complete Docker support for both development and production environments.

This setup provides:

- ⚡ **Vite + TypeScript frontend** with hot reload
- ⚙️ **Express backend** with:
  - Nodemon hot reload (dev)
  - Compression
  - Helmet
  - CORS
  - Rate limiting
  - Logging
  - Pre-configured MVC architecture
- 🐳 **Dockerized environments** for both development and production
- 🌐 **Nginx reverse proxy** for production with optional HTTPS via Certbot
- 🔁 **Persistent MongoDB volume**
- 🔒 **Secure environment separation**: `.env.development` and `.env.production` per service
- 🧩 **Clear dev/prod separation**
- ▶️ **Single-command startup** for dev and prod environments with full hot reload support

---

## 🔨 Tech Stack

- **Frontend**: React, Vite, TypeScript
- **Backend**: Express
- **Database**: MongoDB, Mongoose
- **Containerization**: Docker + Docker Compose
- **Proxy (prod)**: Nginx
- **Hot Reload**:
  - Frontend: Vite (dev)
  - Backend: Nodemon (dev)

---

## 📁 Project Structure

```
backend/
  ├── src/
  ├── .env.production
  ├── .env.development
  └── docker-setup/
      ├── mongo
      │   └── db-init.js
      ├── Dockerfile
      └── Dockerfile.dev

frontend/
  ├── public/
  ├── src/
  ├── .env.production
  ├── .env.development
  └── docker-setup/
      ├── nginx/
      │   └── default.conf
      ├── Dockerfile
      └── Dockerfile.dev

docker-compose.yml              # Production
docker-compose.dev.yml         # Development
```

---

## 🚀 Quick Start

📝 **Before starting, make sure to create the required `.env.development` or `.env.production` files in `frontend/` and `backend/` directories as described in 📘 Environment Setup.**

### 🔧 Development

Run everything with hot reload:

```
docker compose -f docker-compose.dev.yml up --build
```

Access:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

> Uses **Vite** for frontend hot reload and **Nodemon** for backend.

---

### 🚢 Production

1. Set up your `.env.production` files in each service directory (`frontend/`, `backend/`, and root-level for Mongo).
2. **Update your domain in:**

   - `frontend/docker-setup/nginx/default.conf`: `server_name yourdomain.com www.yourdomain.com;`

3. Run production build:

```
docker compose -f docker-compose.yml up --build
```

- Frontend is served by Nginx on port `80`
- API is available at `/api`

---

## 📘 Environment Setup (Updated)

Each service (`frontend`, `backend`) has its own `.env.production` and `.env.development` file.

### Frontend

- **Development**: `frontend/.env.development` is mounted into the container as `.env`, so Vite can auto-load it without extra configuration.

  > This avoids confusion and mimics production behavior where `.env.production` becomes `.env` during the build.

- **Production**: `frontend/.env.production` is renamed to `.env` inside the Dockerfile before the Vite build step to ensure all `VITE_` prefixed variables are correctly injected.

#### ✅ Example Frontend Environment Files

**.env.development**

```env
VITE_API_URL=http://localhost:5000/api
```

**.env.production**

```env
VITE_API_URL=/api
```

### Backend

- Both development and production use the corresponding `.env.*` files via `env_file:` in Docker Compose or `environment:` blocks.

#### ✅ Example Backend Environment Files

**.env.development**

```env
NODE_ENV=development
PORT=5000

MONGO_INITDB_ROOT_USERNAME=devuser
MONGO_INITDB_ROOT_PASSWORD=devpass
MONGO_INITDB_DATABASE=mern_db

MONGO_INITDB_USER=appuser
MONGO_INITDB_PWD=devapppass123

MONGO_URI=mongodb://appuser:devapppass123@mongo:27017/mern_db?authSource=mern_db

JWT_SECRET=devsecretkey123
```

**.env.production**

```env
NODE_ENV=production
PORT=5000

MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=verystrongadminpassword
MONGO_INITDB_DATABASE=mern_db

MONGO_INITDB_USER=appuser
MONGO_INITDB_PWD=ultraSecureAppPass98324

MONGO_URI=mongodb://appuser:ultraSecureAppPass98324@mongo:27017/mern_db?authSource=mern_db

JWT_SECRET=a_very_secret_key_for_jwt_tokens_change_this_in_production
```

### MongoDB

- All MongoDB-related environment variables are defined in the backend `.env.*` files, since the backend handles DB connections and initialization.

---

## 🌐 Routing

- API Base Path: `/api`
- Dev: `http://localhost:5000/api`
- Prod: `/api` via Nginx reverse proxy
- All backend routes are prefixed with `/api` (e.g., `/api/auth/login`)

---

## 🔒 HTTPS with Certbot (Production)

This boilerplate includes optional HTTPS support using **Certbot + Nginx** — pre-installed inside the production frontend container.

### 🧪 Quick Manual Test (with a real domain)

> ⚠️ **Certbot does not work with temporary domains like ngrok or localhost** — use a real domain that points to your server’s public IP.

1. **Enter the frontend container**:

```
docker exec -it <frontend-container-name> bash
```

2. **Run Certbot to generate an SSL certificate**:

```
certbot --nginx -d example.com -d www.example.com --agree-tos --email your@email.com --non-interactive
```

3. **Success!** Nginx will automatically reload with the new certificate.

---

### 💡 Optional: Auto-Renewal

You can schedule automatic renewals with:

```
certbot renew --nginx
```

You can set this up using a `cron` job or a systemd timer in production.

---

### 📦 Persist SSL Certificates (Recommended)

By default, SSL certificates created inside a Docker container will be **deleted when the container is removed**.

To **persist your Certbot certificates**, add the following volume mappings to the **frontend service in `docker-compose.yml`**:

```
frontend:
  volumes:
    - ./certbot/letsencrypt:/etc/letsencrypt
    - ./certbot/lib:/var/lib/letsencrypt
    - ./certbot/log:/var/log/letsencrypt
```

> 🔒 **Do not commit certificate files to version control.**

✅ Certbot and its Nginx plugin are already pre-installed in the image. No extra setup needed — just run the above commands when you're ready.

```

# Save to a markdown file
file_path = Path("/mnt/data/README_UPDATED.md")
file_path.write_text(readme_content)

file_path
```
