# Этап 1 — компиляция TypeScript
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Этап 2 — продакшн-образ
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY data.json ./data.json

EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "dist/app.js"]