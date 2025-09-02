FROM node:20-alpine

WORKDIR /app

# Install only backend dependencies
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund

# Copy backend source
COPY backend/src ./src

ENV NODE_ENV=production

# Railway provides PORT; default to 3000 for local
ENV PORT=3000
EXPOSE 3000

CMD ["node", "src/app.js"]
HEALTHCHECK --interval=15s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:${PORT:-3000}/api/health || exit 1
