# Build stage
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
# Debug: Afficher le contenu du dossier dist
RUN ls -la dist/

# Production stage
FROM nginx:alpine
# Copier les fichiers
COPY --from=build /app/dist/* /usr/share/nginx/html/
# Debug: Vérifier le contenu du dossier nginx
RUN ls -la /usr/share/nginx/html/

# Ajouter une configuration nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
