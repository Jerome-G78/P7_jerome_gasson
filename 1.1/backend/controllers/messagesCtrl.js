// Activation du mode STRICT de Javascript
"use strict";

// Imports
let models = require('../models');
let jwtUtils = require('../utils/jwt.utils');
let fs = require('fs');
let url = require('url');

// Fichiers de promises (externe)
let Promises = require('./Promises');
let MessagesPromises = require('./messagesPromises');

// Constants
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;
// Routes

module.exports = {

    listMessage: (req, res) => {
        // Récupération des paramètres dans l'Url
        // fields, permet de sélectionner les colonnes à afficher
        // limit & offset, permet de récupérer les messages par ségmentation (pour limiter la qté)
        // Order, sert à sortir les messages via un ordre particulier
        let fields = req.query.fields;
        let limit = parseInt(req.query.limit);
        let offset = parseInt(req.query.offset);
        let order = req.query.order;

        // Récupération de tous les messages via findAll
        models.Message.findAll({
            // Vérification des entrées utilisateurs, si vide mettre des données par défaut.
            order: [(order != null) ? order.split(':') : ['title', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,

            // Inclusion de la table User
            include: [{
                model: models.User,
                attributes: ['username']
            }]
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

    createMessage: (req, res) => {
        // Récupération de l'en-tête d'autorisation
        let headerAuth = req.headers['authorization'];

        // Vérifier que ce token est valide pour faire une requête en BDD
        let userId = jwtUtils.getUserId(headerAuth);

        // Params (récupération du title & du contenue) et de l'image si existante
        let title = req.body.title;
        let content = req.body.content;
        let image = req.body.image;
        let attachment = JSON.parse(req.body.attachment);
        let mediaUrl = "";

        if (attachment) {
            // Renseigner le chemin du stockage de l'image
            mediaUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        }

        // Vérification de données non null & cohérente
        if (title == null || content == null) {
            return res.status(400).json({ 'error': 'invalid parameters' })
        }

        if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
            return res.status(400).json({ 'error': 'invalid parameters' })
        }

        // --------------------------
        // Promises
        // --------------------------

        const UserExist = Promises.UserExist(userId);
        const CreateMessage = UserExist.then((UserFound) => MessagesPromises.NewMessage(title, content, mediaUrl, UserFound));

        Promise.all([UserExist, CreateMessage])
            .then((NewMessage) => {
                return res.status(201).json(NewMessage);
            })
            .catch(err => {
                console.log(err);
                return res.status(err.status).json({ 'error': err.error });
            });
    },

    Preview: (req, res) => {
        // Récupération de l'en-tête d'autorisation
        let headerAuth = req.headers['authorization'];

        // Vérifier que ce token est valide pour faire une requête en BDD
        let userId = jwtUtils.getUserId(headerAuth);

        // Params récupération de l'image
        let image = req.body.image;
        let mediaUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

        // --------------------------
        // Promises
        // --------------------------

        const UserExist = Promises.UserExist(userId);
        const UploadPreview = UserExist.then(Completed => MessagesPromises.UploadPreview(mediaUrl));

        Promise.all([UserExist, UploadPreview])
            .then((mediaUrl) => {
                return res.status(201).json(mediaUrl[1]);
            })
            .catch(err => {
                console.log(err);
                return res.status(err.status).json({ 'error': err.error });
            });
    },

    DeletePreview: (req, res) => {
        // Récupération de l'en-tête d'autorisation
        let headerAuth = req.headers['authorization'];

        // Vérifier que ce token est valide pour faire une requête en BDD
        let userId = jwtUtils.getUserId(headerAuth);

        // Params récupération de l'image
        const queryObject = url.parse(req.url, true).query;
        let image = queryObject.image;

        // --------------------------
        // Promises
        // --------------------------

        const UserExist = Promises.UserExist(userId);
        const DeletePreview = UserExist.then(Completed => MessagesPromises.DeletePreview(image));

        Promise.all([UserExist, DeletePreview])
            .then((image) => {
                return res.status(201).json(image[1]);
            })
            .catch(err => {
                console.log(err);
                return res.status(err.status).json({ 'error': err.error });
            });
    },

    putMyMessage: (req, res) => {
        // Récupération de l'en-tête d'autorisation
        let headerAuth = req.headers['authorization'];

        // Vérifier que ce token est valide pour faire une requête en BDD
        let userId = jwtUtils.getUserId(headerAuth);

        // Params (recupération du title & du contenue) et de l'image si existante
        let messageId = parseInt(req.params.messageId);
        let title = req.body.title;
        let content = req.body.content;
        let attachment = req.body.attachment;
        let deleted = JSON.parse(req.body.deleted);
        let mediaUrl = "";

        if (deleted) {
            console.log('data: ' + attachment);
            // Supprimer l'image
            let filename = attachment.split('/images/')[1];
            if (filename != null) {
                fs.unlinkSync(`images/${filename}`);
                console.log('deleted File!');
            }
            mediaUrl = "";
        }
        else {
            mediaUrl = attachment;
        }

        // Vérification de données non null & cohérente
        if (title == null || content == null) {
            return res.status(400).json({ 'error': 'invalid parameters' })
        }

        if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
            return res.status(400).json({ 'error': 'invalid parameters' })
        }

        // --------------------------
        // Promises
        // --------------------------

        const UserExist = Promises.UserExist(userId);
        const IsOwnMessage = UserExist.then(UserFound => Promises.IsOwnMessage(UserFound, messageId));
        const EditMessage = IsOwnMessage.then(Completed => MessagesPromises.EditMessage(messageId, title, content, mediaUrl))
        Promise.all([UserExist, IsOwnMessage, EditMessage])
            .then((moderateMessage) => {
                return res.status(201).json({ 'message': 'Edited message number ' + moderateMessage[2] });
            })
            .catch(err => {
                console.log(err);
                return res.status(err.status).json({ 'error': err.error });
            });
    },

    deleteMyMessage: (req, res) => {
        // Récupération de l'en-tête d'autorisation
        let headerAuth = req.headers['authorization'];

        // Vérifier que ce token est valide pour faire une requête en BDD
        let userId = jwtUtils.getUserId(headerAuth);

        // Récupération des paramètres
        let messageId = parseInt(req.params.messageId);

        // --------------------------
        // Promises
        // --------------------------

        const UserExist = Promises.UserExist(userId);
        const IsOwnMessage = UserExist.then(UserFound => Promises.IsOwnMessage(UserFound, messageId));
        const RemovePictures = IsOwnMessage.then(Completed => MessagesPromises.RemovePictures(messageId));
        const RemoveComments = RemovePictures.then(Completed => MessagesPromises.RemoveComments(messageId));
        const RemoveLikes = RemoveComments.then(Completed => MessagesPromises.RemoveLikes(messageId));
        const RemoveMessage = RemoveLikes.then(Completed => MessagesPromises.RemoveMessage(messageId));
        Promise.all([UserExist, IsOwnMessage, RemovePictures, RemoveComments, RemoveLikes, RemoveMessage])
            .then((DeletedMessage) => {
                return res.status(201).json({ 'message': 'Edited message number ' + DeletedMessage[5] });
            })
            .catch(err => {
                console.log(err);
                return res.status(err.status).json({ 'error': err.error });
            });
    },

    moderateMessage: (req, res) => {
        // Récupération de l'en-tête d'autorisation
        let headerAuth = req.headers['authorization'];

        // Vérifier que ce token est valide pour faire une requête en BDD
        let userId = jwtUtils.getUserId(headerAuth);

        // Params (recupération du title & du contenue) & de l'état Admin - et de l'image si existante
        let messageId = parseInt(req.params.messageId);
        let title = req.body.title;
        let content = req.body.content;
        let attachment = req.body.attachment;
        let deleted = JSON.parse(req.body.deleted);
        let mediaUrl = "";

        if (deleted) {
            console.log('data: ' + attachment);
            // Supprimer l'immage
            let filename = attachment.split('/images/')[1];
            if (filename != null) {
                fs.unlinkSync(`images/${filename}`);
                console.log('deleted File!');
            }
            mediaUrl = "";
        }
        else {
            mediaUrl = attachment;
        }

        // --------------------------
        // Promises
        // --------------------------

        const UserExist = Promises.UserExist(userId);
        const UserIsAdmin = UserExist.then(UserFound => Promises.IsAdmin(UserFound));
        const EditMessage = UserIsAdmin.then(Completed => MessagesPromises.EditMessage(messageId, title, content, mediaUrl))
        Promise.all([UserExist, UserIsAdmin, EditMessage])
            .then((moderateMessage) => {
                return res.status(201).json({ 'message': 'moderate message number ' + moderateMessage[2] });
            })
            .catch(err => {
                console.log(err);
                return res.status(err.status).json({ 'error': err.error });
            });
    },

    deleteMessage: (req, res) => {
        // Récupération de l'en-tête d'autorisation
        let headerAuth = req.headers['authorization'];

        // Vérifier que ce token est valide pour faire une requête en BDD
        let userId = jwtUtils.getUserId(headerAuth);

        // Récupération des paramètres
        let messageId = parseInt(req.params.messageId);

        // --------------------------
        // Promises
        // --------------------------

        const UserExist = Promises.UserExist(userId);
        const UserIsAdmin = UserExist.then(UserFound => Promises.IsAdmin(UserFound));
        const RemovePictures = UserIsAdmin.then(Completed => MessagesPromises.RemovePictures(messageId));
        const RemoveComments = RemovePictures.then(Completed => MessagesPromises.RemoveComments(messageId));
        const RemoveLikes = RemoveComments.then(Completed => MessagesPromises.RemoveLikes(messageId));
        const RemoveMessage = RemoveLikes.then(Completed => MessagesPromises.RemoveMessage(messageId));
        Promise.all([UserExist, UserIsAdmin, RemovePictures, RemoveLikes, RemoveComments, RemoveMessage])
            .then((DeletedMessage) => {
                return res.status(201).json({ 'message': 'Deleted message number ' + DeletedMessage[5] });
            })
            .catch(err => {
                console.log(err);
                return res.status(err.status).json({ 'error': err.error });
            });
    }

}