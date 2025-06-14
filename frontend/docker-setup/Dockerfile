# --- Stage 1: Build the React App ---
FROM node:20.12.2-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Copy frontend/.env.production into the container as .env
RUN cp .env.production .env

RUN npm run build

# --- Stage 2: Nginx + Certbot Support ---
FROM nginx:1.28.0-alpine

# Install certbot and nginx plugin
RUN apk add --no-cache certbot certbot-nginx bash

# Remove default config and copy our production config
RUN rm /etc/nginx/conf.d/default.conf
COPY docker-setup/nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy build from previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose only HTTP (Certbot will upgrade to HTTPS later)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
