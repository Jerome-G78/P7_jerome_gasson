// Imports
let models = require('../models');
let bcrypt = require('bcrypt');
let jwtUtils = require('../utils/jwt.utils');
let fs = require('fs');

// Promises Users

// ------------------------
// register actions
// ------------------------

// Verifier si le pseudonyme est déjà utilisé
const FindUser = ((username) => {
    return new Promise((resolve, reject) => {
        models.User.findAll({
            attributes: ['username'],
            where: { username }
        })
            .then(Users => {
                for (let User in Users) {
                    if (Users[User].username == username) {
                        reject({ 'status': 409, 'error': 'Username already used' });
                    }
                }

                resolve(username);

            })
            .catch(err => {
                reject({ 'status': 500, 'error': 'Unable to contact database' });
            });
    });
});

// Verifier si l'adresse Email est déjà utilisée 
const FindMail = ((email) => {
    return new Promise((resolve, reject) => {
        models.User.findAll({
            attributes: ['email'],
            where: { email }
        })
            .then(Emails => {
                for (let Email in Emails) {
                    if (Emails[Email].email == email) {
                        reject({ 'status': 409, 'error': 'Email already used' });
                    }
                }
                resolve(email);
            })
            .catch(err => {
                reject({ 'status': 500, 'error': 'Unable to verify user' });
            });
    });
});

// Encryption du mot de passe pour enregistrement en BDD
const PassEncrypt = ((password) => {
    return new Promise(async (resolve, reject) => {
        const hash = await bcrypt.hash(password, 5)

        if (hash != '') {
            resolve(hash);
        } else {
            reject({ 'status': 500, 'error': 'BCFAIL' });
        }
    });
});

// Après vérification, enregistrement du compte de l'utilisateur
const RegisterAccount = ((email, username, BCRYPTED, bio) => {
    return new Promise((resolve, reject) => {
        models.User.create({
            email: email,
            username: username,
            password: BCRYPTED,
            bio: bio,
            isAdmin: 0
        })
            .then(newUser => {
                resolve(newUser);
            })
            .catch(err => {
                console.log(err);
                reject({ 'status': 500, 'error': 'cannot add user' });
            });
    });
});

// ------------------------
// LogIn Actions
// ------------------------

// Verifier si l'utilisateur existe
const UserExist = ((email) => {
    return new Promise((resolve, reject) => {
        models.User.findOne({
            where: { email: email }
        })
            .then(userFound => {
                if (userFound.email == email) {
                    resolve(userFound);
                }
            })
            .catch(err => {
                reject({ 'status': 404, 'error': 'User not exist in database' });
            });
    });
});

// Verifier si le mot de passe correspond
const ComparePassword = ((UserFound, password) => {
    return new Promise(async (resolve, reject) => {
        const Compare = await bcrypt.compare(password, UserFound.password)

        let UF = UserFound;

        if (Compare) {
            resolve({
                'isAdmin': UF.isAdmin,
                'email': UF.email,
                'userName': UF.username,
                'userId': UF.id,
                'token': jwtUtils.generateTokenForUser(UF)
            });
        }

        reject({ 'status': 403, 'error': 'invalid password' });
    });
});

// ------------------------
// Update Profil Actions
// ------------------------

// Mise à jour du profil utilisateur
const UpdateBio = ((UserFound, bio) => {
    return new Promise((resolve, reject) => {
        UserFound.update({
            bio: (bio ? bio : UserFound.bio)
        })
            .then(() => {
                // Opération réussie
                resolve(UserFound);
            })
            .catch(err => {
                reject({ 'status': 500, 'error': 'cannot update user profile' });
            });
    });
});

// ------------------------
// Remove Profil Actions
// ------------------------

// Supression du profil utilisateur

// Vérifications des likes pour suppresion...
const RemoveLikes = ((userId) => {
    return new Promise((resolve, reject) => {
        console.log("Verification des likes liées pour suppression...");
        models.Like.findAll({
            attributes: ['id', 'userId', 'messageId'],
            where: {
                userId,
                isLike: 1
            }
        })
            .then(isLiked => {
                console.log("Décrémentation des compteurs...");
                // Décrémentation du compteur lié...
                for (let likeFound in isLiked) {
                    models.Message.findOne({
                        where: { id: isLiked[likeFound].messageId }
                    })
                        .then(messageFound => {
                            messageFound.update({
                                likes: messageFound.likes - 1
                            })
                        })
                    models.Like.destroy({
                        where: { userId },
                    })
                }
                resolve({ 'message': 'Step 1 - Completed' });
            })
            .catch(err => {
                reject({ 'status': 500, 'error': 'Step 1 - Faillure!' })
            });
    });
});

// Verification des Comment liées pour suppression...
const RemoveComments = ((userId) => {
    return new Promise((resolve, reject) => {
        console.log("Verification des Comment liées pour suppression...");
        models.Comment.destroy({
            where: { userId }
        })
            .then(() => {
                resolve({ 'message': 'Step 2 - Completed' });
            })
            .catch(err => {
                reject({ 'status': 500, 'error': 'Step 2 - Faillure!' });
            });
    });
});

// Récupératon des autres commentaires & likes de l'utilisateur...
const RemoveOthersCommentsLikes = ((userId) => {
    return new Promise((resolve, reject) => {
        console.log("Récupération de tous les messages de l'utilisateur...");
        models.Message.findAll({
            attributes: ['id'],
            where: { userId },
        })
            .then(messages => {
                console.log("Supression des likes & commentaires liés aux autres messages...");
                for (let message in messages) {
                    models.Like.destroy({
                        where: { messageId: messages[message].id }
                    })
                    models.Comment.destroy({
                        where: { messageId: messages[message].id }
                    })
                }
                resolve({ 'message': 'Step 3 - Completed' });
            })
            .catch(err => {
                reject({ 'status': 500, 'error': 'Step 3 - Faillure!' });
            });
    });
});

// Suppression des messages de l'utilisateur...
const RemoveMessages = ((userId) => {
    return new Promise((resolve, reject) => {
        models.Message.findAll({
            where: { userId }
        })
            .then(messages => {
                console.log("Supression des attatchement des messages...");
                for (let message in messages) {
                    let filename = messages[message].attachment.split('/images/')[1];
                    if (filename != null) {
                        fs.unlinkSync(`images/${filename}`);
                    }
                    models.Message.destroy({
                        where: { userId }
                    })
                }
                resolve({ 'message': 'Step 4 - Completed' });
            })
            .catch(err => {
                reject({ 'status': 500, 'error': 'Step 4 - Faillure!' });
            })
    });
});

// Suppression du compte d l'utilisateur...
const RemoveAccount = ((userId) => {
    return new Promise((resolve, reject) => {
        console.log("Suppression du compte de l'utilisateur...");
        // Suppression du compte de l'utilisateur
        models.User.destroy({
            where: { id: userId }
        })
            .then(() => {
                resolve({ 'message': 'Step 5 - Completed' });
            })
            .catch(err => {
                reject({ 'status': 500, 'error': 'Step 5 - Faillure!' });
            });
    });
});

// ------------------------
// MODERATION
// ------------------------

// Vérifier si l'utilisateur dispose des droits admin
const UserIsAdmin = ((userFound) => {
    return new Promise((resolve, reject) => {
        models.User.findOne({
            attributes: ['isAdmin'],
            where: { isAdmin: userFound.isAdmin }
        })
            .then(userFound => {
                if (userFound.isAdmin == true) {
                    console.log(userFound.isAdmin);
                    resolve(userFound);
                } else {
                    reject({ 'status': 403, 'error': 'you do not have sufficient privileges!' });
                }
            })
            .catch(err => {
                reject({ 'status': 500, 'error': err });
            });
    });
});

// Si tout va bien, on fait un appel ORM(sequelize) pour récupérer les informations de l'utilisateur en BDD
const RequestUserInformation = ((Username) => {
    return new Promise((resolve, reject) => {
        models.User.findOne({
            attributes: ['id', 'username', 'isAdmin'],
            where: { username: Username }
        })
            .then(user => {
                if (user) {
                    resolve(user);
                } else {
                    reject({ 'status': 404, 'error': 'user not found' });
                }
            })
            .catch(err => {
                reject({ 'status': 500, 'error': err });
            });
    });
});

// Ajouter les droits a l'utilisateur
const AddRight = ((Username) => {
    return new Promise((resolve, reject) => {
        models.User.findOne({
            attributes: ['id', 'username', 'isAdmin'],
            where: { username: Username }
        })
            .then(userFound => {
                console.log(userFound.isAdmin);
                if (!userFound.isAdmin) {
                    userFound.update({
                        isAdmin: 1,
                    })
                        .then(userFound => {
                            resolve(userFound);
                        })
                        .catch(err => {
                            reject({ 'status': 500, 'error': 'Unable to modify Rights! ' + err });
                        });
                } else {
                    reject({ 'status': 403, 'error': 'user is Already Moderator' });
                }
            })
            .catch(err => {
                reject({ 'status': 500, 'error': 'unable to add Admin Right! ' + err });
            });
    });
});

// Retirer les droits de l'utilisateur
const RemoveRight = ((Username) => {
    return new Promise((resolve, reject) => {
        models.User.findOne({
            attributes: ['id', 'username', 'isAdmin'],
            where: { username: Username }
        })
            .then(userFound => {
                console.log(userFound.isAdmin);
                if (userFound.isAdmin) {
                    userFound.update({
                        isAdmin: 0,
                    })
                        .then(userFound => {
                            resolve(userFound);
                        })
                        .catch(err => {
                            reject({ 'status': 500, 'error': 'Unable to modify Rights! ' + err });
                        });
                } else {
                    reject({ 'status': 403, 'error': 'user is not Moderator' });
                }
            })
            .catch(err => {
                reject({ 'status': 500, 'error': 'unable to Remove Admin Right! ' + err });
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
    // Register
    FindUser, FindMail, PassEncrypt, RegisterAccount,
    // LogIn
    UserExist, ComparePassword,
    // Update Profil
    UpdateBio,
    // Suppression du compte
    RemoveLikes, RemoveComments, RemoveOthersCommentsLikes, RemoveMessages, RemoveAccount,
    // ADMINISTRATION
    UserIsAdmin, RequestUserInformation, AddRight, RemoveRight
};