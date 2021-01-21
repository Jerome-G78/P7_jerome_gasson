// Imports
let models = require('../models')
let jwtUtils = require('../utils/jwt.utils');
let asyncLib = require('async');

// Routes

module.exports = {
    createComment: function(req, res, next){
        // Récupération de l'en-tête d'authorisation
        let headerAuth = req.headers['authorization'];

        // Verifier que ce token est valide pour faire une requête en BDD
        let userId = jwtUtils.getUserId(headerAuth);
        let messageId = parseInt(req.params.messageId);

        // Params (recupération du commentaire)
        let comment = req.body.comment;

        if(comment.length == 0){
            return res.status(400).json({'error':'invalid parameters'})
        }
        
        asyncLib.waterfall([
            // Récupérer l'utilisateur dans la base de données (correspondant au token)
            // Function (callback)
            function(done){
                models.User.findOne({
                    where: {id: userId}
                })
                .then(function(userFound){
                    // Si l'utilisateur est trouvé, on continue (premier paramètre null)
                    done(null, userFound);
                })
                .catch(function(err){
                    // Sinon, on retourne une erreur
                    return res.status(500).json({'error':'unable to verify user'});
                });
            },
            function(userFound, done){
                if(userFound){
                    models.Comment.create({
                        userId : userFound.id,
                        messageId : messageId,
                        username : userFound.username,
                        comment : comment
                    })
                    .then(function(newComment){
                        // Si tout c'est bien passé, le message est envoyé.
                        done(newComment);
                    })
                    .catch(function(err){
                        // En d'erreur serveur, un message d'erreur est retourné.
                        return res.status(500).json({'error':'unable to create comment in DB - ' + err});
                    });
                } else {
                    // En cas de problème, un message d'erreur est retourné.
                    res.status(404).json({'error':'user not found'});
                }
            },
        ],
        function(newComment){
            if(newComment){
                // post du commentaire OK
                return res.status(201).json(newComment);
            } else {
                // Le commentaire n'est pas passé.
                return res.status(500).json({'error':'cannot post message'});
            }
        });
    },

    listComment: function(req, res, next){
        // Récupération des paramètres dans l'Url
        // fields, permet de selectionner les collones a afficher
        // limit & offset, permet de récupérer les messages par ségmentation (pour limiter la qté)
        // Order, sert a sortir les messages via un ordre particulier
        let fields = req.query.fields;
        let limit = parseInt(req.query.limit);
        let offset = parseInt(req.query.offset);
        let order = req.query.order;

        // Récupération de tous les messages via findAll
        models.Comment.findAll({
            // Verification des entrées utilisateurs, si vide mettre des données par défaut.
            order: [(order != null) ? order.split(':'):['comment','ASC']],
            attributes : (fields !== '*' && fields != null) ? fields.split(',') :null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
        })
        .then(function(messages){
            // Verification non null
            if(messages){
                // retour des données en json
                res.status(200).json(messages);
            } else {
                res.status(404).json({'error':'no messages found'});
            }
        })
        .catch(function(err){
            console.log(err);
            res.status(500).json({'error':'invalid fields'});
        });
    },

    deleteComment: function(req, res, next){
        // Récupération de l'en-tête d'authorisation
        let headerAuth = req.headers['authorization'];

        // Verifier que ce token est valide pour faire une requête en BDD
        let userId = jwtUtils.getUserId(headerAuth);

        // Récupération des paramètres
        let messageId = parseInt(req.params.messageId);
        let commentId = parseInt(req.params.commentId);

        asyncLib.waterfall([
            // Récupérer l'utilisateur dans la base de données (correspondant au token)
            function(done){
                models.User.findOne({
                    where: {id: userId}
                })
                .then(function(userFound){
                    // Si l'utilisateur est trouvé, on continue (premier paramètre null)
                    done(null, userFound);
                })
                .catch(function(err){
                    // Sinon, on retourne une erreur
                    return res.status(500).json({'error':'unable to verify user'});
                });
            },

            function(userFound, done){
                // Verifier si l'utilisateur dispose des droits admin
                models.User.findOne({
                    attributes : ['isAdmin'],
                    where : {isAdmin: userFound.isAdmin}
                })
                .then(function(userFound){
                    if(userFound.isAdmin == true){
                        done(null, commentId);
                    } else {
                        return res.status(403).json({'error':'you do not have sufficient privileges'});
                    }
                })
                .catch(function(err){
                    return res.status(500).json({err});
                });
            },

            function(commentFound, done){
                // Récupérer l'id du commentaire concerné
                if(commentFound){
                    models.Comment.destroy({
                        where : {
                            id : commentId,
                            messageId
                        }
                    })
                    .then(function(deleteComment){
                        // Si tout c'est bien passé, un information de réussite est envoyée.
                        done(deleteComment);
                    })
                    .catch(function(err){
                        // En cas de problème, un message d'erreur est retourné.
                        res.status(500).json({'error':'unable to delete comment in DB' + err});
                    });
                } else {
                    // En cas de problème, un message d'erreur est retourné.
                    res.status(404).json({'error':'comment not found'});
                }
            },

        ], function(deleteComment){
            if(deleteComment){
                // delete du message OK
                return res.status(201).json({'message':'comment deleted successfully'});
            } else {
                // Le message n'est pas présent.
                return res.status(500).json({'error':'comment not found'});
            }
        });
    },

    deleteMyComment: function(req, res, next){
        // Récupération de l'en-tête d'authorisation
        let headerAuth = req.headers['authorization'];

        // Verifier que ce token est valide pour faire une requête en BDD
        let userId = jwtUtils.getUserId(headerAuth);

        // Récupération des paramètres
        let messageId = parseInt(req.params.messageId);
        let commentId = parseInt(req.params.commentId);

        asyncLib.waterfall([
            // Récupérer l'utilisateur dans la base de données (correspondant au token)
            function(done){
                models.User.findOne({
                    where: {id: userId}
                })
                .then(function(userFound){
                    // Si l'utilisateur est trouvé, on continue (premier paramètre null)
                    done(null, userFound);
                })
                .catch(function(err){
                    // Sinon, on retourne une erreur
                    return res.status(500).json({'error':'unable to verify user'});
                });
            },

            function(userFound, done){
                // suppression du commentaire concerné
                models.Comment.destroy({
                    where : {
                        id : commentId,
                        messageId,
                        username : userFound.username
                    }
                })
                .then(function(deleteComment){
                    // Si tout c'est bien passé, un information de réussite est envoyée.
                    done(deleteComment);
                })
                .catch(function(err){
                    // En cas de problème, un message d'erreur est retourné.
                    res.status(500).json({'error':'unable to delete comment in DB' + err});
                });
            },

        ], function(deleteComment){
            if(deleteComment){
                // delete du message OK
                return res.status(201).json({'message':'comment deleted successfully'});
            } else {
                // Le message n'est pas présent.
                return res.status(404).json({'error':'comment not found'});
            }
        });
    }
}
