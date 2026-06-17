
# сборка фронтенда 
FROM node:20-alpine AS builder
 
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build && npx tsc --project tsconfig.server.json
 
# продакшн-образ
FROM node:20-alpine
 
WORKDIR /app
 
COPY package*.json ./
RUN npm ci --omit=dev
 
COPY --from=builder /app/dist-server ./src
 
COPY --from=builder /app/dist ./dist
 
COPY public/data.json ./public/data.json

EXPOSE 3000
 
ENV NODE_ENV=production

USER node

CMD ["node", "src/app.js"]