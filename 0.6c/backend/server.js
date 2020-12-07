//Imports

const express = require('express');
const bodyParser = require('body-parser');

// On importe l'API routeur, on précise aussi qu'on veut l'objet .router
const apiRouter = require('./apiRouter').router;

// Instantiate Server
let server = express();

// Body Parser Configuration
/* 
    Initialisation de bodyParser; 
    celui-ci permet de récupérer les arguments & paramètres fournis dans le BODY d'une requête HTTP  
    On lui indique que l'on souhaite "parser" du JSON 
*/
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());

// Configure Routes (with callBack functions)
server.get ('/', function(req, res, next){
    res.setHeader('Content-Type','text/html');                          // Entête de ma réponse HTTP
    res.status(200).send('<h1> Vous êtes connecté au serveur </h1>');   // Message de réponse avec le code 200
});

server.use('/api/', apiRouter);

// Launch Server
server.listen(8080, function(){
    console.log('Server online - 8080');
});