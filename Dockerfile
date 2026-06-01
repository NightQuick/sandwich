
# сборка фронтенда 
FROM node:20-alpine AS frontend-builder
 
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
 
# компиляция бэкенда
FROM node:20-alpine AS backend-builder
 
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx tsc --project tsconfig.server.json
 
# продакшн-образ
FROM node:20-alpine
 
WORKDIR /app
 
COPY package*.json ./
RUN npm ci --omit=dev
 
COPY --from=backend-builder /app/dist-server ./src
 
COPY --from=frontend-builder /app/dist ./dist
 
COPY public/data.json ./public/data.json

EXPOSE 3000
 
ENV NODE_ENV=production

CMD ["node", "src/app.js"]