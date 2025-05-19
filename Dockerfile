# Etapa 1: Construir la app
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos del proyecto
COPY package*.json ./
RUN npm install

COPY . .

# Construir la app con React (tomará .env.production si existe)
RUN npm run build

# Etapa 2: Servir la app con "serve"
FROM node:18-alpine

WORKDIR /app

# Instalar "serve" globalmente
RUN npm install -g serve

# Copiar la carpeta build desde la etapa anterior
COPY --from=builder /app/dist ./build

# Exponer el puerto 4002
EXPOSE 4002

# Servir la aplicación en el puerto 4002
CMD ["serve", "-s", "build", "-l", "4002"]
