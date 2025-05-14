# Etapa 1: build
FROM node:18 AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etapa 2: producción con Nginx
FROM nginx:alpine

# Copiar build a Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Reemplazar configuración por defecto de Nginx si lo necesitas
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
