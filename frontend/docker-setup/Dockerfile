# --- Stage 1: Build the React App ---
FROM node:20.12.2-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Inject backend API URL (optional)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

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
