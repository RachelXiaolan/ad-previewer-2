FROM node:22-alpine AS frontend
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY index.html vite.config.js ./
COPY public ./public
COPY src ./src
RUN npm run build

FROM node:22-alpine AS backend
WORKDIR /app
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --omit=dev
COPY backend ./backend
COPY --from=frontend /app/dist ./dist
ENV NODE_ENV=production
ENV PORT=3001
ENV CONFIG_FILE=/app/data/config.local.json
EXPOSE 3001
CMD ["node", "backend/index.js"]
