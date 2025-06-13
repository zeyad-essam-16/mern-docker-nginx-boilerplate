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
2. **Update your domain in:**
   - `frontend/docker-setup/nginx/default.conf`: `server_name yourdomain.com www.yourdomain.com;`
3. Run production build:

```bash
docker compose -f docker-compose.yml --env-file .env.production up --build
```

- Frontend is served by Nginx on port `80`
- API is available at `/api`

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

- API Base Path: `/api`
- Dev: `http://localhost:5000/api`
- Prod: `/api` via Nginx reverse proxy
- All backend routes are prefixed with `/api` (e.g., `/api/auth/login`)

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

## 🔒 HTTPS with Certbot (Production)

This boilerplate includes optional HTTPS support using **Certbot + Nginx** — pre-installed inside the production frontend container.

### 🧪 Quick Manual Test (with a real domain)

> ⚠️ **Certbot does not work with temporary domains like ngrok or localhost** — use a real domain that points to your server’s public IP.

1. **Enter the frontend container**:

```bash
docker exec -it <frontend-container-name> bash
```

2. **Run Certbot to generate an SSL certificate**:

```bash
certbot --nginx -d example.com -d www.example.com --agree-tos --email your@email.com --non-interactive
```

3. **Success!** Nginx will automatically reload with the new certificate.

---

### 💡 Optional: Auto-Renewal

You can schedule automatic renewals with:

```bash
certbot renew --nginx
```

You can set this up using a `cron` job or a systemd timer in production.

✅ Certbot and its Nginx plugin are already pre-installed in the image. No extra setup needed — just run the above commands when you're ready.
