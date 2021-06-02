// Imports
let models = require('../models');
let fs = require('fs');

// Promises Messages

// ------------------------
// Création de message
// ------------------------

// Post d'un nouveau message
const NewMessage = ((title, content, mediaUrl, userFound) => {
    return new Promise((resolve, reject) => {
        models.Message.create({
            title: title,
            content: content,
            attachment: mediaUrl,
            likes: 0,
            UserId: userFound.id
        })
            .then(newMessage => {
                // Si tout s'est bien passé, le message est envoyé.
                resolve(newMessage);
            })
            .catch(err => {
                // En cas d'erreur serveur, un message d'erreur est retourné.
                reject({ 'status': 500, 'error': 'unable to create message in DB' });
            });

    });
});

// Upload du fichier d'aperçu
const UploadPreview = ((mediaUrl) => {
    return new Promise((resolve, reject) => {
        if (mediaUrl) {
            console.log(mediaUrl);
            // Upload OK
            resolve(mediaUrl);
        } else {
            // Le fichier n'est pas passé.
            reject({ 'status': 500, 'error': 'fail to upload Preview' });
        }

    });
});

// Suppression du fichier d'aperçu
const DeletePreview = ((image) => {
    return new Promise((resolve, reject) => {
        if (image) {
            // Suppression du fichier
            console.log(image);
            let filename = image.split('/images/')[1];
            fs.unlinkSync(`images/${filename}`);
            resolve(filename);
        } else {
            // Le Ficher n'est pas supprimé.
            reject({ 'status': 500, 'error': 'fail to Delete Preview' });
        }

    });
});

// ------------------------
// Edition de message
// ------------------------

// Modification du message
const EditMessage = ((messageId, title, content, mediaUrl) => {
    return new Promise((resolve, reject) => {
        models.Message.findOne({
            attributes: ['id', 'title', 'content', 'attachment'],
            where: { id: messageId }
        })
            .then(messageId => {
                // Si le message est trouvé, procéder à la modification

                messageId.update({
                    title: (title ? title : userFound.title),
                    content: (content ? content : userFound.content),
                    attachment: (mediaUrl ? mediaUrl : mediaUrl)
                })
                    .then(putMessage => {
                        // Si tout s'est bien passé, le message est envoyé.
                        resolve(putMessage.id);
                    })
                    .catch(err => {
                        // En cas d'erreur, un message est retourné.
                        reject({ 'status': 404, 'error': 'message not found' });
                    });
            })
            .catch(err => {
                // En d'erreur serveur, un message est retourné.
                reject({ 'status': 500, 'error': 'unable to modify message in DB - ' + err });
            });
    });
});

// ------------------------
// Suppression de message
// ------------------------

// 1 - Suppression des images (si présentes)
const RemovePictures = ((messageId) => {
    return new Promise((resolve, reject) => {
        // Suppression des images uploadées (si présentes)
        models.Message.findOne({
            where: { id: messageId }
        })
            .then(message => {
                if (message != null) {

                    let filename = message.attachment.split('/images/')[1];

                    if (filename != null) {

                        fs.unlinkSync(`images/${filename}`);
                    }
                    resolve();
                }
                resolve();
            })
            .catch(err => {
                reject({ 'status': 500, 'error': 'unable to delete file! - ' + err });
            });
    });
});
// 2 - Suppression des likes (si présents)
const RemoveLikes = ((messageId) => {
    return new Promise((resolve, reject) => {
        models.Like.destroy({
            where: { messageId }
        })
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject({ 'status': 500, 'error': 'unable to remove Likes in DB - ' + err });
            });
    });
});
// 3 - Suppression des Commentaires (si présents)
const RemoveComments = ((messageId) => {
    return new Promise((resolve, reject) => {
        models.Comment.destroy({
            where: { messageId }
        })
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject({ 'status': 500, 'error': 'unable to remove Comments in DB - ' + err });
            });
    });
});
// 4 - Suppression du message
const RemoveMessage = ((messageId) => {
    return new Promise((resolve, reject) => {
        models.Message.destroy({
            where: { id: messageId }
        })
            .then(deleteMessage => {
                if (deleteMessage != 0) {
                    // Si tout s'est bien passé, une information de réussite est envoyée.
                    resolve(deleteMessage);
                }
                // Au cas où, il n'y a pas de correspondance
                reject({ 'status': 404, 'error': 'message not found' });
            })
            .catch(err => {
                // En cas de problème, un message d'erreur est retourné.
                reject({ 'status': 500, 'error': 'unable to delete message in DB - ' + err });
            });
    });
});

/*
const Function = (()=>{
    return new Promise((resolve, reject)=>{
 
    });
});
*/
module.exports = {
    // Creation edition
    NewMessage, UploadPreview, DeletePreview, EditMessage, 

    // Suppression
    RemovePictures, RemoveLikes, RemoveComments, RemoveMessage
};