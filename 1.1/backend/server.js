//Imports

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Intégration de la couche SSL
/*
const fs = require('fs');
const https = require('https');
const privateKey  = fs.readFileSync('/etc/ssl/private/File.key', 'utf8');
const certificate = fs.readFileSync('/etc/ssl/certs/File.crt', 'utf8');
let credentials = {key: privateKey, cert: certificate};
*/

// On importe l'API routeur, on précise aussi qu'on veut l'objet .router
const apiRouter = require('./routes/apiRouter').router;

// Instantiate Server
const server = express();
server.use(cors());

// Cette partie configure et autorise les requêtes Multi-Origin; définit les Headers & les Méthodes
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Body Parser Configuration
/* 
    Initialisation de bodyParser; 
    celui-ci permet de récupérer les arguments & paramètres fournis dans le BODY d'une requête HTTP  
    On lui indique que l'on souhaite "parser" du JSON 
*/
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Configure Routes (with callBack functions)
server.get('/', function (req, res, next) {
    res.setHeader('Content-Type', 'text/html');                          // Entête de ma réponse HTTP
    res.status(200).send('<h1> Vous êtes connecté au serveur </h1>');   // Message de réponse avec le code 200
});

// Upload des images
server.use('/images', express.static(path.join(__dirname, 'images')));

// Enregistrement du routeur pour toutes les demandes effectuées vers /api/
server.use('/api/', apiRouter);

// Launch Server
server.listen(3000, () => {
    console.log('Server HTTP online - 3000');
});

// HTTPS access
/*
let httpsServer = https.createServer(credentials, server);
httpsServer.listen(3443, () => {
    console.log('Server HTTPS online - 3443');
});
*/
