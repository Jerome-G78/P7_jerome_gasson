// Activation du mode STRICT de Javascript
"use strict";

// Imports
let models = require('../models');
let jwtUtils = require('../utils/jwt.utils');
// let asyncLib = require('async');
let url = require('url');
// Import du fichier de promises (externe)
let Promises = require('./Promises');

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

        // ---------------------------------- //
        // Promises
        // ---------------------------------- //

        const User = Promises.UserExist(userId);
        const Send = User.then(userFound => Promises.SendComment(userFound, messageId, comment));

        Promise.all([User, Send])
            .then(newComment => {
                // post du commentaire OK
                return res.status(201).json({ 'message': 'Comment Sucessful send!' });
            })
            .catch(err => {
                // Le commentaire n'est pas passé.
                return res.status(err.status).json(err);
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

        // ---------------------------------- //
        // Promises
        // ---------------------------------- //

        const User = Promises.UserExist(userId);
        const IsAdmin = User.then(userFound => Promises.IsAdmin(userFound));
        const DeleteComment = IsAdmin.then(Completed => Promises.DeleteCommentAdmin(commentId, messageId));

        Promise.all([User, IsAdmin, DeleteComment])
            .then(DeleteSucess => {
                // post du commentaire OK
                return res.status(201).json({ 'message': 'comment deleted successfully' });
            })
            .catch(err => {
                // Le commentaire n'est pas passé.
                return res.status(err.status).json(err);
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

        // ---------------------------------- //
        // Promises
        // ---------------------------------- //

        const User = Promises.UserExist(userId);
        const DeleteComment = User.then(UserFound => Promises.DeleteComment(commentId, messageId, UserFound));

        Promise.all([User, DeleteComment])
            .then(DeleteSucess => {
                // post du commentaire OK
                return res.status(201).json({ 'message': 'comment deleted successfully' });
            })
            .catch(err => {
                // Le commentaire n'est pas passé.
                return res.status(err.status).json({ err });
            });
    }
}