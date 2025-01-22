 # Étape 1 : Construire l'application Angular
FROM node:18 as build-stage
WORKDIR /app
COPY . /app
RUN npm install -g @angular/cli && npm install
RUN ng build

# Étape 2 : Préparer l'image finale avec le backend
FROM node:18
WORKDIR /app
COPY --from=build-stage /app/dist /app/dist
COPY . /app
RUN npm install

# Commande pour démarrer le serveur Angular et lancer le backend
CMD ["node", "/app/server.js"]
