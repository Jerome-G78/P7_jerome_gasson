// Imports
const express = require('express');
const usersCtrl = require('../controllers/usersCtrl');
const messagesCtrl = require('../controllers/messagesCtrl');
const likesCtrl = require('../controllers/likesCtrl');
const commentCtrl = require('../controllers/commentCtrl');
const multer = require('../middleware/multer-config');

// Router

//Création du routeur et Instanciation de celui-ci ()
exports.router = (function(){
    let apiRouter = express.Router();

    // Assignation des différentes routes
    /*
    Appeler la methode route de apiRouter.suivi du verbe HTTP,
    Renseigner la route, Depuis le controller concerné, exectuer la fonction voulu [Ex. usersCtrl.register]
    */

    // Users routes
    apiRouter.post('/users/register/', usersCtrl.register);
    apiRouter.post('/users/login/', usersCtrl.login);
    apiRouter.get('/users/me/', usersCtrl.getUserProfile);
    apiRouter.put('/users/me/', usersCtrl.updateUserProfile);
    apiRouter.delete('/users/unsubscribe/', usersCtrl.deleteProfile);
    
    // Messages routes
    apiRouter.get('/messages/', messagesCtrl.listMessage);
    apiRouter.post('/messages/new/', multer, messagesCtrl.createMessage);
    apiRouter.put('/messages/:messageId/', multer, messagesCtrl.putMyMessage);
    apiRouter.delete('/messages/:messageId/', multer, messagesCtrl.deleteMyMessage);

    // Comments routes
    apiRouter.get('/messages/comment/', commentCtrl.listComment);
    apiRouter.post('/messages/comment/:messageId/new/', commentCtrl.createComment);
    apiRouter.delete('/messages/comment/:messageId/:commentId/', commentCtrl.deleteMyComment); // BUG MSG Err. unable to delete comment in DB

    // Moderation
    apiRouter.put('/messages/:messageId/moderate/', messagesCtrl.moderateMessage);
    apiRouter.delete('/messages/:messageId/moderate/', multer, messagesCtrl.deleteMessage);
    apiRouter.delete('/messages/:commentId/moderate/', commentCtrl.deleteComment); // BUG MSG Err.

    // Likes routes
    apiRouter.post('/messages/:messageId/vote/like', likesCtrl.likePost); // BUG Tables Push
    apiRouter.post('/messages/:messageId/vote/dislike', likesCtrl.dislikePost); // BUG Tables Push

    // Enfin, on retourne l'objet
    return apiRouter;

})();