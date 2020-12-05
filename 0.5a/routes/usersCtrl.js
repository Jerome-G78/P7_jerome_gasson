// Imports
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');

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
    }
}