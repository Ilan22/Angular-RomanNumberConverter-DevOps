const express = require("express");
const client = require("prom-client");
const path = require("path");

const app = express();

// Chemin vers le build Angular
const angularAppPath = path.join(__dirname, "dist/roman-numbers/browser");
app.use(express.static(angularAppPath));

// Initialiser les métriques Prometheus
const visitCounter = new client.Counter({
  name: "angular_visits_total",
  help: "Total number of visits to the Angular app",
});

// Middleware pour compter les visites
app.use((req, res, next) => {
  if (req.path !== "/metrics") {
    visitCounter.inc();
  }
  next();
});

// Route pour les métriques
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.send(await client.register.metrics());
});

// Route pour les fichiers Angular (supporte le routage Angular)
app.get("/*", (req, res) => {
  res.sendFile(path.join(angularAppPath, "index.html"));
});

// Démarrer le serveur
const PORT = 4200;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
