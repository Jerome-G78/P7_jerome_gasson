// Imports
let bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
let jwtUtils = require('../utils/jwt.utils');
let models = require('../models');
let asyncLib = require('async');

// Regex
const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

// Routes

module.exports = {
    register: function(req, res, next){
        // Params
        /* 
            Récupération des paramètres envoyés dans la requête
        */
       let email = req.body.email;
       let username = req.body.username;
       let password = req.body.password;
       let bio = req.body.bio;

       // Vérification si les données obligatoires sont bien récupérés
       if(email == null || username == null || password == null){
           return res.status(400).json({'error':'missing parameters'});
       }

       // Vérification des variables envoyés

       // Si le pseudo est égal ou plus grand que 13, ou inferrieur ou égal à 4 on rejette la demande
       if (username.length >= 16 || username.length <= 4){
           return res.status(400).json({'error':'username must be length 5 - 15'});
       }

       // Verification de l'adresse E-Mail via le Regex
       if (!EMAIL_REGEX.test(email)){
           return res.status(400).json({'error':'email is not valid'});
       }

       // Verification du mot de passe via le Regex
       if (!PASSWORD_REGEX.test(password)){
           return res.status(400).json({'error':'Password must be between 4 and 8 digits long and include at least one numeric digit.'});
       }

       // Après verifications, Ajout de l'utilisateur dans la base de données

       // L'utilisateur existe-t-il dans la base ? (promesse)
       
       models.User.findOne({
           attributes: ['email'],
           where: {email: email}
       })
       .then(function(userFound){
           // Si l'utilisateur n'existe pas
           if (!userFound){
               // hashage et Salage (5fois) du mot de passe
               bcrypt.hash(password, 5, function(err,bcryptedPassword){
                   // Création de l'utilisateur dans la base de données
                   let newUser = models.User.create({
                       email: email,
                       username: username,
                       password: bcryptedPassword,
                       bio: bio,
                       isAdmin: 0
                   })
                   .then(function(newUser){
                       return res.status(201).json({
                           // Renvoie l'identifiant utilisateur
                           'userId':newUser.id
                       })
                   })
                   .catch(function(err){
                       // Sinon, une erreur est retourné
                       return res.status(500).json({'error':'cannot add user'});
                   });
               })
           } else {
               // Si l'utilisateur existe
            return res.status(409).json({'error':'user already exist'})
           }
       })
       .catch(function(err){
           // En cas d'erreur, retourner un message
           return res.status(500).json({'error':'unable to verify user'})
       });
    },

    login: function(req, res, next){
        // Récupération des paramètres de connexion (User & Mdp)

        let email = req.body.email;
        let password = req.body.password;

        // Vérification des variables envoyés

        if (email == null || password == null) {
            return res.status(400).json({'error':'missing parameters'});
        }

        // TODO verify mail regex & password length

        // L'utilisateur existe-t-il dans la base ? (promesse)

        models.User.findOne({
            where: {email: email}
        })
        .then(function(userFound){
            if (userFound){
                // Verification de la correspondance du mot de passe avec les informations de la BDD
                bcrypt.compare(password, userFound.password, function(errBcrypt, resBcrypt){
                    if(resBcrypt){
                        // Si le résultat est positif, envoyer le Token.
                        return res.status(200).json({
                            'userId':userFound.id,
                        //  'token':'THE TOKEN'
                            'token': jwtUtils.generateTokenForUser(userFound)
                        });
                    } else {
                        // Sinon, retourner une erreur, qui indique a l'utilisateur que son mot de passe est non valide
                        return res.status(403).json({'error':'invalid password'});
                    }
                });
            } else {
                // Si l'utilisateur n'existe pas
                return res.status(404).json({'error':'user not exist in DB'});
            }
        })
        .catch(function(err){
            // En cas d'erreur de verification, envoyer une erreur
            return res.status(500).json({'error':'unable to verify user'});
        })
    },

    getUserProfile: function(req, res, next){
        // Récupération de l'en-tête d'authorisation
        let headerAuth = req.headers['authorization'];

        // Verifier que ce token est valide pour faire une requête en BDD
        let userId = jwtUtils.getUserId(headerAuth);

        // Vérifier que userId n'est pas négatif (par sécurité)
        if (userId <0)
            return res.status(400).json({'error':'wrong token'});

        // Si tout va bien, on fait un appel ORM(sequelize) pour récupérer les informations de l'utilisateur en BDD
        models.User.findOne({
            attributes: ['id', 'email', 'username', 'bio'],
            where: {id: userId}
        })
        .then(function(user){
            if(user){
                res.status(201).json(user);
            } else {
                res.status(404).json({'error':'user not found'});
            }
        })
        .catch(function(err){
            res.status(500).json({'error':'cannot fetch user'});
        });
    }
}