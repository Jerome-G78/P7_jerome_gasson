// Imports
const express = require('express');
const usersCtrl = require('./routes/usersCtrl');
const messagesCtrl = require('./routes/messagesCtrl');
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
    apiRouter.route('/users/me/').get(usersCtrl.getUserProfile);
    apiRouter.route('/users/me/').put(usersCtrl.updateUserProfile);
    
    // Messages routes
    apiRouter.route('/messages/new/').post(messagesCtrl.createMessage);
    apiRouter.route('/messages/').get(messagesCtrl.listMessage);

    // Enfin, on retourne l'objet
    return apiRouter;

})();