FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .

ARG API_BASE_URL=http://localhost:8000
ENV API_BASE_URL=${API_BASE_URL}

RUN npm run build


FROM node:20-alpine AS runtime

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund

COPY --from=builder /app/dist ./dist
COPY server.js ./server.js

EXPOSE 3000

CMD ["node", "server.js"]
