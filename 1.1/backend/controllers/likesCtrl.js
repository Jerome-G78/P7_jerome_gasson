// Activation du mode STRICT de Javascript
"use strict";

// Imports
let models = require('../models')
let jwtUtils = require('../utils/jwt.utils');
let asyncLib = require('async');
let Promises = require('./Promises');

// Routes

module.exports = {
    likePost: (req, res) => {
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
        /*
        const User = Promises.UserExist(userId);
        const Message = User.then(() => Promises.FindMessage(messageId));
        const MessageUser = Message.then((messageFound)=> Promises.FindMessageUser(messageFound, messageId, userId));
        const Compare = MessageUser.then((messageFound)=> Promises.CompareMessage(messageFound, userId));

        Promise.all([User, Message, MessageUser, Compare ])
            .then(newComment => {
                // Like Message OK
                return res.status(201).json(newComment);
            })
            .catch(err => {
                // Le Like n'est pas passé.
                return res.status(500).json(err);
            });
        
        */
        asyncLib.waterfall([
            (done) => {
                // Vérifier dans la BDD si le message existe (id du msg)
                models.Message.findOne({
                    where: { id: messageId }
                })
                    .then((messageFound) => {
                        // Si oui, continuer
                        done(null, messageFound);
                    })
                    .catch(err => {
                        // Sinon retourner une erreur
                        return res.status(500).json({ 'error': 'unable to verify message' });
                    });
            },
            (messageFound, done) => {
                if (messageFound) {
                    // Récupérer l'objet utilisateur
                    models.User.findOne({
                        where: { id: userId }
                    })
                        .then((userFound) => {
                            done(null, messageFound, userFound);
                        })
                        .catch(err => {
                            return res.status(500).json({ 'error': 'unable to verify user' });
                        });
                } else {
                    res.status(404).json({ 'error': 'post already liked' });
                }
            },
            (messageFound, userFound, done) => {
                if (userFound) {
                    // Rechercher si l'on trouve une entrée qui correspond à la fois à l'ID de l'utilisateur qui fait la requête
                    // Ainsi qu'au message concerné
                    models.Like.findOne({
                        where: {
                            userId: userId,
                            messageId: messageId
                        }
                    })
                        .then((isUserAlreadyLiked) => {
                            done(null, messageFound, userFound, isUserAlreadyLiked);
                        })
                        .catch(err => {
                            return res.status(500).json({ 'error': 'unable to verify is user already liked' });
                        });

                } else {
                    res.status(404).json({ 'error': 'user not exist' });
                }
            },
            (messageFound, userFound, isUserAlreadyLiked, done) => {
                console.log("Inf:" + isUserAlreadyLiked);
                // S'assurer que l'utilisateur n'as pas déjà Like le message
                if (!isUserAlreadyLiked) {
                    // Ajouter la relation qui uni le message et l'utilisateur
                    models.Like.create({
                        messageId: messageId,
                        userId: userId,
                        isLike: 1
                    })
                        .then(alreadyLikeFound => {
                            done(null, messageFound, userFound);
                        })
                        .catch(err => {
                            return res.status(500).json({ 'error': 'unable to set user reaction' });
                        });
                } else {
                    // Retourner un message de conflit (409)
                    res.status(409).json({ 'error': 'message already liked' });
                }
            },
            (messageFound, userFound, done) => {
                // Mise à jour de l'objet (le message), incrémente les likes de 1
                messageFound.update({
                    likes: messageFound.likes + 1,
                })
                    .then(() => {
                        done(messageFound);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ 'error': 'cannot message like counter' + err });
                    });
            }
        ], (messageFound) => {
            if (messageFound) {
                // Affichage de la propriété like qui sera incrémentée
                return res.status(201).json(messageFound);
            } else {
                return res.status(500).json({ 'error': 'cannot update message' });
            }
        });
    },

    dislikePost: (req, res) => {
        // Récupération de l'en-tête d'autorisation
        let headerAuth = req.headers['authorization'];

        // Vérifier que ce token est valide pour faire une requête en BDD
        let userId = jwtUtils.getUserId(headerAuth);

        //Params
        let messageId = parseInt(req.params.messageId);

        // Vérifier que l'ID du message est valide
        if (messageId <= 0) {
            return res.status(400).json({ 'error': 'invalid parameters' });
        }

        
        // ---------------------------------- //
        // Promises
        // ---------------------------------- //
        /*
        const User = Promises.UserExist(userId);
        const Message = User.then(() => Promises.FindMessage(messageId));
        const MessageUser = Message.then((messageFound)=> Promises.FindMessageUser(messageFound, messageId, userId));
        const Compare = MessageUser.then((messageFound)=> Promises.CompareMessage(messageFound, userId));

        Promise.all([User, Message, MessageUser, Compare ])
            .then(newComment => {
                // Dislike Message OK
                return res.status(201).json(newComment);
            })
            .catch(err => {
                // Le Dislike n'est pas passé.
                return res.status(500).json(err);
            });
        */
        asyncLib.waterfall([
            (done) => {
                // Vérifier dans la BDD si le message existe (id du msg)
                models.Message.findOne({
                    where: { id: messageId }
                })
                    .then(messageFound => {
                        // Si oui, continuer
                        done(null, messageFound);
                    })
                    .catch(err => {
                        // Sinon retourner une erreur
                        return res.status(500).json({ 'error': 'unable to verify message' });
                    });
            },
            (messageFound, done) => {
                if (messageFound) {
                    // Récupérer l'objet utilisateur
                    models.User.findOne({
                        where: { id: userId }
                    })
                        .then(userFound => {
                            done(null, messageFound, userFound);
                        })
                        .catch(err => {
                            return res.status(500).json({ 'error': 'unable to verify user' });
                        });
                } else {
                    res.status(404).json({ 'error': 'post already disliked' });
                }
            },
            (messageFound, userFound, done) => {
                if (userFound) {
                    // Rechercher si l'on trouve une entrée qui correspond à la fois à l'ID de l'utilisateur qui fait la requête
                    // Ainsi qu'au message concerné
                    models.Like.findOne({
                        where: {
                            userId: userId,
                            messageId: messageId
                        }
                    })
                        .then(isUserAlreadyLiked => {
                            done(null, messageFound, userFound, isUserAlreadyLiked);
                        })
                        .catch(err => {
                            return res.status(500).json({ 'error': 'unable to verify is user already disliked' });
                        });

                } else {
                    res.status(404).json({ 'error': 'user not exist' });
                }
            },
            (messageFound, userFound, isUserAlreadyLiked, done) => {
                // S'assurer que l'utilisateur a déjà Like le message
                if (isUserAlreadyLiked) {
                    // Supprimer la relation qui uni le message et l'utilisateur
                    isUserAlreadyLiked.destroy()
                        .then(() => {
                            done(null, messageFound, userFound);
                        })
                        .catch((err) => {
                            return res.status(500).json({ 'error': 'cannot remove already disliked post' });
                        });
                } else {
                    // Retourner un message de conflit (409)
                    res.status(409).json({ 'error': 'message already disliked' });
                }
            },
            (messageFound, userFound, done) => {
                // Mise à jour de l'objet (le message), décrémenter les likes de 1
                messageFound.update({
                    likes: messageFound.likes - 1,
                })
                    .then(() => {
                        done(messageFound);
                    })
                    .catch(err => {
                        res.status(500).json({ 'error': 'cannot mesage dislike counter' });
                    });
            }
        ], messageFound => {
            if (messageFound) {
                // Modification de la propriété like qui sera décrémenter
                return res.status(201).json(messageFound);
            } else {
                return res.status(500).json({ 'error': 'cannot update message' });
            }
        });
    }
}