# Etapa base con Node.js
FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm@10.17.0

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["pnpm", "start"]
