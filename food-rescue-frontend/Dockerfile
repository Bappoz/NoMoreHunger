# Multi-stage build for React application
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine

# Install Node.js for serving the app (we'll use a simple Node server instead of nginx for SPA routing)
FROM node:18-alpine AS production

# Create app user
RUN addgroup -g 1001 -S nodejs && adduser -S reactuser -u 1001

# Set working directory
WORKDIR /app

# Copy built application from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json

# Install serve to serve the built app
RUN npm install -g serve

# Change ownership
RUN chown -R reactuser:nodejs /app

# Switch to non-root user
USER reactuser

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

# Serve the application
CMD ["serve", "-s", "dist", "-l", "3000"]
