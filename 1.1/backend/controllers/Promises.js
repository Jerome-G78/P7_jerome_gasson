
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

const FindMessage = (messageId => {
    return new Promise((resolve, reject) => {
        models.Message.findOne({
            where: { id: messageId }
        })
            .then((messageFound) => {
                // Si oui, continuer
                resolve(messageFound);
            })
            .catch(err => {
                // Sinon retourner une erreur
                reject({ 'status': 500, 'error': 'unable to verify message' + err })
            });
    });
});

const FindMessageUser = ((messageFound, messageId, userId) => {
    return new Promise((resolve, reject) => {
        if (messageFound) {
            // Rechercher si l'on trouve une entrée qui correspond à la fois à l'ID de l'utilisateur qui fait la requête
            // Ainsi qu'au message concerné
            models.Like.findOne({
                where: {
                    userId: userId,
                    messageId: messageId
                }
            })
                .then((isUserAlreadyLiked) => {
                    console.log(isUserAlreadyLiked);
                    if (isUserAlreadyLiked == null) {
                        console.log('FindMessage - OK');
                        resolve(LikeMessage(messageFound, messageId, userId));
                    } else {
                        console.log('FindMessage - AlreadyLiked !');
                        resolve(DislikeMessage(messageFound, messageId, userId));
                    }

                })
                .catch(err => {
                    reject({ 'status': 500, 'error': 'unable to verify is user already liked' + err });
                });

        } else {
            reject({ 'status': 404, 'error': 'Message not found' + err });
        }
    });
});

const LikeMessage = ((messageFound, messageId, userId) => {
    return new Promise((resolve, reject) => {
        // Ajouter la relation qui uni le message et l'utilisateur
        models.Like.create({
            messageId: messageId,
            userId: userId,
            isLike: 1
        })
            .then(Created => {
                // Mise à jour de l'objet (le message), incrémente les likes de 1
                messageFound.update({
                    likes: messageFound.likes + 1,
                })
                    .then(() => {
                        resolve(messageFound);
                    })
                    .catch(err => {
                        console.log(err);
                        reject({ 'status': 500, 'error': 'cannot message like counter' + err });
                    });

            })
            .catch(err => {
                console.log(err);
                reject({ 'status': 500, 'error': 'unable to set user reaction' + err });
            });
    });
});

const DislikeMessage = ((messageFound, messageId, userId) => {
    return new Promise((resolve, reject) => {
        models.Like.destroy({
            where: {
                userId: userId,
                messageId: messageId
            }
        })
            .then(alreadyLikeFound => {
                console.log(alreadyLikeFound);
                // Mise à jour de l'objet (le message), décrémenter les likes de 1
                messageFound.update({
                    likes: messageFound.likes - 1,
                })
                    .then(() => {
                        resolve(messageFound);
                    })
                    .catch(err => {
                        reject({ 'status': 500, 'error': 'cannot mesage dislike counter' + err });
                    });

            })
            .catch(err => {
                console.log(err);
                reject({ 'status': 500, 'error': 'unable to set user reaction' + err });
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
    UserExist, IsOwnMessage, IsAdmin,
    SendComment, DeleteComment, DeleteCommentAdmin,
    FindMessage, FindMessageUser, LikeMessage, DislikeMessage
};