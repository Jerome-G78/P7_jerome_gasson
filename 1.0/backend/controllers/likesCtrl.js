// Activation du mode STRICT de Javascript
"use strict";

// Imports
let models = require('../models')
let jwtUtils = require('../utils/jwt.utils');
let asyncLib = require('async');

// Constants

// Routes

module.exports = {
    likePost: function(req, res, next){
        // Récupération de l'en-tête d'autorisation
        let headerAuth = req.headers['authorization'];

        // Vérifier que ce token est valide pour faire une requête en BDD
        let userId = jwtUtils.getUserId(headerAuth);

        //Params
        let messageId = parseInt(req.params.messageId);

        // Vérifier si l'ID du message est valide
        if(messageId <= 0){
            return res.status(400).json({'error':'invalid parameters'});
        }

        asyncLib.waterfall([
            function(done){
                // Vérifier dans la BDD si le message existe (id du msg)
                models.Message.findOne({
                    where: {id:messageId}
                })
                .then(function(messageFound){
                    // Si oui, continuer
                    done(null, messageFound);
                })
                .catch(function(err){
                    // Sinon retourner une erreur
                    return res.status(500).json({'error':'unable to verify message'});
                });
            },
            function(messageFound, done){
                if(messageFound){
                    // Récupérer l'objet utilisateur
                    models.User.findOne({
                        where: {id: userId}
                    })
                    .then(function(userFound){
                        done(null, messageFound, userFound);
                    })
                    .catch(function(err){
                        return res.status(500).json({'error':'unable to verify user'});
                    });
                } else {
                    res.status(404).json({'error':'post already liked'});
                }
            },
            function(messageFound, userFound, done){
                if(userFound){
                    // Rechercher si l'on trouve une entrée qui correspond à la fois à l'ID de l'utilisateur qui fait la requête
                    // Ainsi qu'au message concerné
                    models.Like.findOne({
                        where: {
                            userId: userId,
                            messageId: messageId
                        }
                    })
                    .then(function(isUserAlreadyLiked){
                        done(null,messageFound, userFound, isUserAlreadyLiked);
                    })
                    .catch(function(err){
                        return res.status(500).json({'error':'unable to verify is user already liked'});
                    });

                } else {
                    res.status(404).json({'error':'user not exist'});
                }
            },
            function(messageFound, userFound, isUserAlreadyLiked, done) {
                console.log("Inf:" + isUserAlreadyLiked);
                    // S'assurer que l'utilisateur n'as pas déjà Like le message
                    if(!isUserAlreadyLiked){
                        // Ajouter la relation qui uni le message et l'utilisateur
                        models.Like.create({
                            messageId : messageId,
                            userId : userId,
                            isLike : 1
                        })
                        .then(function(alreadyLikeFound) {
                            done(null,messageFound, userFound);
                        })
                        .catch(function(err){
                            return res.status(500).json({'error':'unable to set user reaction'});
                        });
                    } else {
                        // Retourner un message de conflit (409)
                        res.status(409).json({'error':'message already liked'});
                    }
            },
            function (messageFound, userFound, done) {
                // Mise à jour de l'objet (le message), incrémente les likes de 1
                messageFound.update({
                    likes: messageFound.likes + 1,
                })
                .then(function(){
                    done(messageFound);
                })
                .catch(function(err) {
                    console.log(err);
                    res.status(500).json({'error':'cannot message like counter' + err});
                });
            }
        ], function(messageFound){
            if(messageFound){
                // Affichage de la propriété like qui sera incrémentée
                return res.status(201).json(messageFound);
            } else {
                return res.status(500).json({'error':'cannot update message'});
            }
        });
    },

    dislikePost: function(req, res, next){
        // Récupération de l'en-tête d'autorisation
        let headerAuth = req.headers['authorization'];

        // Vérifier que ce token est valide pour faire une requête en BDD
        let userId = jwtUtils.getUserId(headerAuth);

        //Params
        let messageId = parseInt(req.params.messageId);

        // Vérifier que l'ID du message est valide
        if(messageId <= 0){
            return res.status(400).json({'error':'invalid parameters'});
        }

        asyncLib.waterfall([
            function(done){
                // Vérifier dans la BDD si le message existe (id du msg)
                models.Message.findOne({
                    where: {id:messageId}
                })
                .then(function(messageFound){
                    // Si oui, continuer
                    done(null, messageFound);
                })
                .catch(function(err){
                    // Sinon retourner une erreur
                    return res.status(500).json({'error':'unable to verify message'});
                });
            },
            function(messageFound, done){
                if(messageFound){
                    // Récupérer l'objet utilisateur
                    models.User.findOne({
                        where: {id: userId}
                    })
                    .then(function(userFound){
                        done(null, messageFound, userFound);
                    })
                    .catch(function(err){
                        return res.status(500).json({'error':'unable to verify user'});
                    });
                } else {
                    res.status(404).json({'error':'post already disliked'});
                }
            },
            function(messageFound, userFound, done){
                if(userFound){
                    // Rechercher si l'on trouve une entrée qui correspond à la fois à l'ID de l'utilisateur qui fait la requête
                    // Ainsi qu'au message concerné
                    models.Like.findOne({
                        where: {
                            userId: userId,
                            messageId: messageId
                        }
                    })
                    .then(function(isUserAlreadyLiked){
                        done(null,messageFound, userFound, isUserAlreadyLiked);
                    })
                    .catch(function(err){
                        return res.status(500).json({'error':'unable to verify is user already disliked'});
                    });

                } else {
                    res.status(404).json({'error':'user not exist'});
                }
            },
            function(messageFound, userFound, isUserAlreadyLiked, done) {
                    // S'assurer que l'utilisateur a déjà Like le message
                    if(isUserAlreadyLiked){
                        // Supprimer la relation qui uni le message et l'utilisateur
                        isUserAlreadyLiked.destroy()
                        .then(function() {
                            done(null,messageFound, userFound);
                        })
                        .catch(function(err){
                            return res.status(500).json({'error':'cannot remove already disliked post'});
                        });
                    } else {
                        // Retourner un message de conflit (409)
                        res.status(409).json({'error':'message already disliked'});
                    }
            },
            function (messageFound, userFound, done) {
                // Mise à jour de l'objet (le message), décrémenter les likes de 1
                messageFound.update({
                    likes: messageFound.likes - 1,
                })
                .then(function(){
                    done(messageFound);
                })
                .catch(function(err) {
                    res.status(500).json({'error':'cannot mesage dislike counter'});
                });
            }
        ], function(messageFound){
            if(messageFound){
                // Modification de la propriété like qui sera décrémenter
                return res.status(201).json(messageFound);
            } else {
                return res.status(500).json({'error':'cannot update message'});
            }
        });        
    }
}