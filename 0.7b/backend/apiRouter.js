// Imports
const express = require('express');
const usersCtrl = require('./routes/usersCtrl');
const messagesCtrl = require('./routes/messagesCtrl');
const likesCtrl = require('./routes/likesCtrl');
const multer = require('./middleware/multer-config');

// Router

//Création du routeur et Instanciation de celui-ci ()
exports.router = (function(){
    let apiRouter = express.Router();

    // Assignation des différentes routes
    /*
    Appeler la methode route de apiRouter
    1er Argument la route, Suivi du verbe HTTP
    Depuis le controller concerné, exectuer la fonction voulu [Ex. usersCtrl.register]
    */

    // Users routes
    apiRouter.post('/users/register/', usersCtrl.register);
    apiRouter.post('/users/login/', usersCtrl.login);
    apiRouter.get('/users/me/', usersCtrl.getUserProfile);
    apiRouter.put('/users/me/', usersCtrl.updateUserProfile);
    
    // Messages routes
    apiRouter.post('/messages/new/', multer, messagesCtrl.createMessage);
    apiRouter.get('/messages/', messagesCtrl.listMessage);

    // Likes routes
    apiRouter.post('/messages/:messageId/vote/like', likesCtrl.likePost);
    apiRouter.post('/messages/:messageId/vote/dislike', likesCtrl.dislikePost);

    // Enfin, on retourne l'objet
    return apiRouter;

})();