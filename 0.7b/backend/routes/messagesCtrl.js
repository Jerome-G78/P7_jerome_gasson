// Imports
let models = require('../models');
let asyncLib = require('async');
let jwtUtils = require('../utils/jwt.utils');

// Constants
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;
// Routes

module.exports = {
    createMessage: function(req, res, next){
        // Récupération de l'en-tête d'authorisation
        let headerAuth = req.headers['authorization'];

        // Verifier que ce token est valide pour faire une requête en BDD
        let userId = jwtUtils.getUserId(headerAuth);

        // Params (recupération du title & du contenue)
        let title = req.body.title;
        let content = req.body.content;
        let image = req.body.image;
        let attachment = req.body.attachment;
        console.log(attachment);
        let mediaUrl = "";
        
        if(attachment == 1){
            mediaUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        }

        // Verification de données non null & cohérente
        if (title == null || content == null){
            return res.status(400).json({'error':'invalid parameters'})
        }

        if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT){
            return res.status(400).json({'error':'invalid parameters'})
        }

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
                if(userFound){
                    models.Message.create({
                        title : title,
                        content : content,
                        attachment : mediaUrl,
                        like : 0,
                        UserId : userFound.id
                    })
                    .then(function(newMessage){
                        // Si tout c'est bien passé, le message est envoyé.
                        done(newMessage);
                    });
                } else {
                    // En cas de problème, un message d'erreur est retourné.
                    res.status(404).json({'error':'user not found'});
                }
            },
        ],
        function(newMessage){
            if(newMessage){
                // post du message OK
                return res.status(201).json(newMessage);
            } else {
                // Le message n'est pas passé.
                return res.status(500).json({'error':'cannot post message'});
            }
        });
    },
    listMessage: function(req, res, next){
        // Récupération des paramètres dans l'Url
        // fields, permet de selectionner les collones a afficher
        // limit & offset, permet de récupérer les messages par ségmentation (pour limiter la qté)
        // Order, sert a sortir les messages via un ordre particulier
        let fields = req.query.fields;
        let limit = parseInt(req.query.limit);
        let offset = parseInt(req.query.offset);
        let order = req.query.order;

        // Récupération de tous les messages via findAll
        models.Message.findAll({
            // Verification des entrées utilisateurs, si vide mettre des données par défaut.
            order: [(order != null) ? order.split(':'):['title','ASC']],
            attributes : (fields !== '*' && fields != null) ? fields.split(',') :null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,

            // Inclusion de la table User
            include: [{
                model: models.User,
                attributes: ['username']
            }]
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
    }
}