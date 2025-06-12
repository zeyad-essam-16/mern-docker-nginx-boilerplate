# Stage 1: Build the React app
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Build the app with env variable
ARG VITE_REACT_APP_API_URL
ENV VITE_REACT_APP_API_URL=$VITE_REACT_APP_API_URL
RUN npm run build

# Stage 2: Serve the built app with Nginx
FROM nginx:alpine

# Copy Nginx config from frontend/nginx/default.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy the built React app
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
