# Use a slim Node.js image for production
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies (production only)
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port your Express app listens on
EXPOSE 5000

# Command to run the application
CMD ["node", "server.js"]