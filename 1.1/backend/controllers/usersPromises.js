// Imports
let models = require('../models');
let bcrypt = require('bcrypt');
let jwtUtils = require('../utils/jwt.utils');

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
                resolve(userFound);
            })
            .catch(err => {
                reject({ 'satus': 500, 'error': 'unable to verify user' });
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
    //Update Profil
    UpdateBio
};