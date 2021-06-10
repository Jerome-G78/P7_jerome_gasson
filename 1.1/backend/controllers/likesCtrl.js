// Activation du mode STRICT de Javascript
"use strict";

// Imports
let jwtUtils = require('../utils/jwt.utils');
let Promises = require('./Promises');

// Routes

module.exports = {
    VotePost: (req, res) => {
        // Récupération de l'en-tête d'autorisation
        let headerAuth = req.headers['authorization'];

        // Vérifier que ce token est valide pour faire une requête en BDD
        let userId = jwtUtils.getUserId(headerAuth);

        //Params
        let messageId = parseInt(req.params.messageId);

        // Vérifier si l'ID du message est valide
        if (messageId <= 0) {
            return res.status(400).json({ 'error': 'invalid parameters' });
        }

        // ---------------------------------- //
        // Promises
        // ---------------------------------- //

        const User = Promises.UserExist(userId);
        const Message = User.then(Completed => Promises.FindMessage(messageId));
        const MessageUser = Message.then((messageFound) => Promises.FindMessageUser(messageFound, messageId, userId));

        Promise.all([User, Message, MessageUser])
            .then(Liked => {
                // Vote Message OK
                return res.status(201).json(Liked[1].likes);
            })
            .catch(err => {
                // Le Like n'est pas passé.
                return res.status(500).json(err);
            });
    }
}