// Imports
const express = require('express');
const usersCtrl = require('./routes/usersCtrl');

// Router

//Création du routeur et Instanciation de celui-ci ()
exports.router = (function(){
    let apiRouter = express.Router();

    // Users routes
    // Assignation des différentes routes
    /*
    Appeler la methode route de apiRouter
    1er Argument la route, Suivi du verbe HTTP
    Depuis usersCtrl, exectuer la fonction register
    Idem pour le login
    */
    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    
    // Enfin, on retourne l'objet
    return apiRouter;

})();