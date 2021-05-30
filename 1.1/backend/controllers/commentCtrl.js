// Activation du mode STRICT de Javascript
"use strict";

// Imports
let models = require('../models');
let jwtUtils = require('../utils/jwt.utils');
let asyncLib = require('async');
let url = require('url');

// Routes

module.exports = {
    createComment: (req, res) => {
        // Récupération de l'en-tête d'autorisation
        let headerAuth = req.headers['authorization'];

        // Vérifier que ce token soit valide pour faire une requête en BDD
        let userId = jwtUtils.getUserId(headerAuth);
        let messageId = parseInt(req.params.messageId);

        // Params (récupération du commentaire)
        const queryObject = url.parse(req.url, true).query;
        let comment = queryObject.comment;
        console.log('Commentaire : ' + comment);

        if (comment.length == 0) {
            return res.status(400).json({ 'error': 'invalid parameters' })
        }

        asyncLib.waterfall([
            // Récupérer l'utilisateur dans la base de données (correspondant au token)
            // Function (callback)
            done => {
                models.User.findOne({
                    where: { id: userId }
                })
                    .then(userFound => {
                        // Si l'utilisateur est trouvé, on continue (premier paramètre null)
                        done(null, userFound);
                    })
                    .catch(err => {
                        // Sinon, on retourne une erreur
                        return res.status(500).json({ 'error': 'unable to verify user' });
                    });
            },
            (userFound, done) => {
                if (userFound) {
                    models.Comment.create({
                        userId: userFound.id,
                        messageId: messageId,
                        username: userFound.username,
                        comment: comment
                    })
                        .then(newComment => {
                            // Si tout s'est bien passé, le message est envoyé.
                            done(newComment);
                        })
                        .catch((err) => {
                            // En d'erreur serveur, un message d'erreur est retourné.
                            return res.status(500).json({ 'error': 'unable to create comment in DB - ' + err });
                        });
                } else {
                    // En cas de problème, un message d'erreur est retourné.
                    res.status(404).json({ 'error': 'user not found' });
                }
            },
        ],
            newComment => {
                if (newComment) {
                    // post du commentaire OK
                    return res.status(201).json(newComment);
                } else {
                    // Le commentaire n'est pas passé.
                    return res.status(500).json({ 'error': 'cannot post message' });
                }
            });
    },

    listComment: (req, res) => {
        // Récupération des paramètres dans l'Url
        // fields, permet de sélectionner les colonnes à afficher
        // limit & offset, permet de récupérer les messages par ségmentation (pour limiter la qté)
        // Order, permet de sortir les messages via un ordre particulier
        let fields = req.query.fields;
        let limit = parseInt(req.query.limit);
        let offset = parseInt(req.query.offset);
        let order = req.query.order;

        // Récupération de tous les messages via findAll
        models.Comment.findAll({
            // Vérification des entrées utilisateurs, si vide mettre des données par défaut.
            order: [(order != null) ? order.split(':') : ['comment', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
        })
            .then(messages => {
                // Vérification non null
                if (messages) {
                    // retour des données en JSON
                    res.status(200).json(messages);
                } else {
                    res.status(404).json({ 'error': 'no messages found' });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ 'error': 'invalid fields' });
            });
    },

    deleteComment: (req, res) => {
        // Récupération de l'en-tête d'autorisation
        let headerAuth = req.headers['authorization'];

        // Vérifier que ce token est valide pour faire une requête en BDD
        let userId = jwtUtils.getUserId(headerAuth);

        // Récupération des paramètres
        let messageId = parseInt(req.params.messageId);
        let commentId = parseInt(req.params.commentId);

        asyncLib.waterfall([
            // Récupérer l'utilisateur dans la base de données (correspondant au token)
            done => {
                models.User.findOne({
                    where: { id: userId }
                })
                    .then(userFound => {
                        // Si l'utilisateur est trouvé, on continue (premier paramètre null)
                        done(null, userFound);
                    })
                    .catch(err => {
                        // Sinon, on retourne une erreur
                        return res.status(500).json({ 'error': 'unable to verify user' });
                    });
            },

            userFound, done => {
                // Vérifier si l'utilisateur dispose des droits admin
                models.User.findOne({
                    attributes: ['isAdmin'],
                    where: { isAdmin: userFound.isAdmin }
                })
                    .then(userFound => {
                        if (userFound.isAdmin == true) {
                            done(null, commentId);
                        } else {
                            return res.status(403).json({ 'error': 'you do not have sufficient privileges' });
                        }
                    })
                    .catch(err => {
                        return res.status(500).json({ err });
                    });
            },

            (commentFound, done) => {
                // Récupérer l'id du commentaire concerné
                if (commentFound) {
                    models.Comment.destroy({
                        where: {
                            id: commentId,
                            messageId
                        }
                    })
                        .then(deleteComment => {
                            // Si tout s'est bien passé, un information de réussite est envoyée.
                            done(deleteComment);
                        })
                        .catch(err => {
                            // En cas de problème, un message d'erreur est retourné.
                            res.status(500).json({ 'error': 'unable to delete comment in DB' + err });
                        });
                } else {
                    // En cas de problème, un message d'erreur est retourné.
                    res.status(404).json({ 'error': 'comment not found' });
                }
            },

        ], deleteComment => {
            if (deleteComment) {
                // delete du message OK
                return res.status(201).json({ 'message': 'comment deleted successfully' });
            } else {
                // Le message n'est pas présent.
                return res.status(500).json({ 'error': 'comment not found' });
            }
        });
    },

    deleteMyComment: (req, res) => {
        // Récupération de l'en-tête d'autorisation
        let headerAuth = req.headers['authorization'];

        // Vérifier que ce token est valide pour faire une requête en BDD
        let userId = jwtUtils.getUserId(headerAuth);

        // Récupération des paramètres
        let messageId = parseInt(req.params.messageId);
        let commentId = parseInt(req.params.commentId);

        asyncLib.waterfall([
            // Récupérer l'utilisateur dans la base de données (correspondant au token)
            done => {
                models.User.findOne({
                    where: { id: userId }
                })
                    .then(userFound => {
                        // Si l'utilisateur est trouvé, on continue (premier paramètre null)
                        done(null, userFound);
                    })
                    .catch(err => {
                        // Sinon, on retourne une erreur
                        return res.status(500).json({ 'error': 'unable to verify user' });
                    });
            },

            (userFound, done) => {
                // suppression du commentaire concerné
                models.Comment.destroy({
                    where: {
                        id: commentId,
                        messageId,
                        username: userFound.username
                    }
                })
                    .then(deleteComment => {
                        // Si tout s'est bien passé, un information de réussite est envoyée.
                        done(deleteComment);
                    })
                    .catch(err => {
                        // En cas de problème, un message d'erreur est retourné.
                        res.status(500).json({ 'error': 'unable to delete comment in DB' + err });
                    });
            },

        ], deleteComment => {
            if (deleteComment) {
                // delete du message OK
                return res.status(201).json({ 'message': 'comment deleted successfully' });
            } else {
                // Le message n'est pas présent.
                return res.status(404).json({ 'error': 'comment not found' });
            }
        });
    }
}