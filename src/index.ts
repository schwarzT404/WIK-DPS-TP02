import * as http from 'http';

// Configuration des constantes
const PING_ENDPOINT = '/ping';
const PORT = process.env.PING_LISTEN_PORT ? parseInt(process.env.PING_LISTEN_PORT) : 3000;

// Création du serveur HTTP
const server = http.createServer((req, res) => {
  // Vérification de la méthode HTTP (GET uniquement)
  if (req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  // Routage des requêtes
  if (req.url === PING_ENDPOINT) {
    // Endpoint /ping - Renvoie les headers de la requête
    const headers = req.headers;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(headers));
  } else {
    // Toute autre route retourne 404
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

// Démarrage du serveur
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Gestion de l'arrêt propre du serveur (pour les conteneurs)
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});