
let models = require('../models');

// ------------------------
// Générales
// ------------------------

// Récupérer l'utilisateur dans la base de données (correspondant au token)
const UserExist = ((userId) => {
    return new Promise((resolve, reject) => {
        models.User.findOne({
            where: { id: userId }
        })
            .then(userFound => {
                // Si l'utilisateur est trouvé, on continue
                resolve(userFound);
            })
            .catch(err => {
                // Sinon, on retourne une erreur
                reject({ 'status': 500, 'error': 'unable to verify user' });
            });
    });
});

// Verification des droits d'administration
const IsAdmin = ((userFound) => {
    return new Promise((resolve, reject) => {
        if (userFound.isAdmin) {
            resolve(userFound);
        } else {
            reject({ 'status': 403, 'error': 'you do not have sufficient privileges' });
        }
    });
});

// Verification de propriété
const IsOwnMessage = ((userFound, messageId) => {
    return new Promise((resolve, reject) => {
        models.Message.findOne({
            where: { id: messageId }
        })
            .then(messageFound => {
                if (messageFound != null) {
                    // Si trouvé, il est comparé a l'UserId
                    if (messageFound.UserId == userFound.id) {
                        resolve(messageFound.id);
                    }
                    // Echec, on retourne une erreur d'accès
                    reject({ 'status': 403, 'error': 'this is not your message.' });

                } else {
                    // Sinon, le message l'existe pas
                    reject({ 'status': 404, 'error': 'Message not found' });
                }
            })
            .catch(err => {
                // En cas d'erreur, on retourne une erreur serveur
                reject({ 'status': 500, 'error': 'faillure - ' + err });
            });
    })
});

// ------------------------
// Gestion des Commentaires
// ------------------------

// Envoyer un commentaire en base
const SendComment = ((userFound, messageId, comment) => {
    return new Promise((resolve, reject) => {
        if (userFound) {
            models.Comment.create({
                userId: userFound.id,
                messageId: messageId,
                username: userFound.username,
                comment: comment
            })
                .then(newComment => {
                    // Si tout s'est bien passé, le message est envoyé.
                    resolve(newComment);
                })
                .catch((err) => {
                    // En d'erreur serveur, un message d'erreur est retourné.
                    reject({ 'status': 500, 'error': 'unable to create comment in DB - ' + err });
                });
        } else {
            // En cas de problème, un message d'erreur est retourné.
            return ({ 'status': 404, 'error': 'user not found' });
        }
    });
});

// Supprimer un commentaire en base
const DeleteComment = ((commentId, messageId, userFound) => {
    return new Promise((resolve, reject) => {
        // Récupérer l'id du commentaire concerné
        models.Comment.destroy({
            where: {
                id: commentId,
                messageId,
                username: userFound.username
            }
        })
            .then(deleteComment => {
                // Si tout s'est bien passé, un information de réussite est envoyée.
                resolve(deleteComment);
            })
            .catch(err => {
                // En cas de problème, un message d'erreur est retourné.
                reject({ 'status': 500, 'error': 'unable to delete comment in DB' + err });
            });
    });
});

// Supprimer un commentaire en base (admin)
const DeleteCommentAdmin = ((commentId, messageId) => {
    return new Promise((resolve, reject) => {
        models.Comment.destroy({
            where: {
                id: commentId,
                messageId
            }
        })
            .then(deleteComment => {
                // Si tout s'est bien passé, un information de réussite est envoyée.
                resolve(deleteComment);
            })
            .catch(err => {
                // En cas de problème, un message d'erreur est retourné.
                reject({ 'status': 500, 'error': 'unable to delete comment in DB' + err });
            });
    });
});

// --------------------------
// Gestion des Like / Dislike
// --------------------------


/*
const Function = (()=>{
    return new Promise((resolve, reject)=>{

    });
});
*/

module.exports = {
    UserExist, IsOwnMessage, IsAdmin,
    SendComment, DeleteComment, DeleteCommentAdmin
};