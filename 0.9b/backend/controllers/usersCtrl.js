// Activation du mode STRICT de Javascript
"use strict";

// Imports
let bcrypt = require('bcrypt');
let jwtUtils = require('../utils/jwt.utils');
let models = require('../models');
let asyncLib = require('async');
let fs = require('fs');
const { where } = require('sequelize');
const { DataTypes } = require('sequelize');
const { isDate } = require('util');


// Regex
const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
// Minimum height characters, at least one uppercase letter, one lowercase letter and one number.

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

    // Si le pseudo est égal ou plus grand que 16, ou inferrieur ou égal à 4 on rejette la demande
    if (username.length >= 16 || username.length <= 4){
      return res.status(400).json({'error':'username must be length 5 - 15'});
    }

    // Verification de l'adresse E-Mail via le Regex
    if (!EMAIL_REGEX.test(email)){
        return res.status(400).json({'error':'email is not valid'});
    }

    // Verification du mot de passe via le Regex
    if (!PASSWORD_REGEX.test(password)){
        return res.status(400).json({'error':'Password must be minimum 8 digits at least one uppercase letter, one lowercase letter and one number.'});
    }

    // Après verifications, Ajout de l'utilisateur dans la base de données

    // L'utilisateur existe-t-il dans la base ? (promesse)
       
    asyncLib.waterfall([
      function(done) {
        models.User.findOne({
          attributes: ['email'],
          where: { email: email }
        })
        .then(function(userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(userFound, done) {
        if (!userFound) {
          bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
            done(null, userFound, bcryptedPassword);
          });
        } else {
          return res.status(409).json({ 'error': 'user already exist' });
        }
      },
      function(userFound, bcryptedPassword, done) {
        let newUser = models.User.create({
          email: email,
          username: username,
          password: bcryptedPassword,
          bio: bio,
          isAdmin: 0
        })
        .then(function(newUser) {
          done(newUser);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'cannot add user' });
        });
      }
    ], 
    function(newUser) {
      if (newUser) {
        return res.status(201).json({
          'userId': newUser.id
        });
      } else {
        return res.status(500).json({ 'error': 'cannot add user' });
      }
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

    asyncLib.waterfall([
      function(done) {
        models.User.findOne({
          where: { email: email }
        })
        .then(function(userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(userFound, done) {
        if (userFound) {
          bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
            done(null, userFound, resBycrypt);
          });
        } else {
          return res.status(404).json({ 'error': 'user not exist in DB' });
        }
      },
      function(userFound, resBycrypt, done) {
        if(resBycrypt) {
          done(userFound);
        } else {
          return res.status(403).json({ 'error': 'invalid password' });
        }
      }
    ], 
    function(userFound) {
      if (userFound) {
        return res.status(201).json({
          'isAdmin': userFound.isAdmin,
          'email': userFound.email,
          'userName': userFound.username,
          'userId': userFound.id,
          'token': jwtUtils.generateTokenForUser(userFound)
        });
      } else {
        return res.status(500).json({ 'error': 'cannot log on user' });
      }
    });
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
            res.status(200).json(user);
        } else {
            res.status(404).json({'error':'user not found'});
        }
    })
    .catch(function(err){
        res.status(500).json({'error':'cannot fetch user'});
    });
  },

  updateUserProfile: function(req, res, next){
    // Récupération de l'en-tête d'authorisation
    let headerAuth = req.headers['authorization'];

    // Verifier que ce token est valide pour faire une requête en BDD
    let userId = jwtUtils.getUserId(headerAuth);

    // Params : Récupération des données du Frontend.
    let bio = req.body.bio;

    asyncLib.waterfall([
      function(done){
        // Récupérer l'utilisateur dans la base de données
        models.User.findOne({
            attributes: ['id', 'bio'],
            where: {id: userId}
        })
        .then(function(userFound){
            // Si l'utilisateur est trouvé, le retourner
            done(null,userFound);
        })
        .catch(function(err){
            // Sinon envoyer une erreur
            return res.status(500).json({'error':'unable to verify user'});
        });
      },
      function(userFound, done){
        // Verifier si l'utilisateur est valide
        if(userFound) {
          // Après verification, mise à jour des données concernés
          userFound.update({
              bio: (bio? bio : userFound.bio)
          })
          .then(function(){
              // Opération reussi
              done(userFound);
          })
          .catch(function(err){
              res.status(500).json({'error':'cannot update user'});
          });
        } else {
          // si celui-ci n'existe pas, retourner une erreur
          res.status(404).json({'error':'user not found'});
        }
      },
    ],
    function(userFound){
      if(userFound){
          // Mise a jour effectuée
          return res.status(201).json(userFound);
      } else {
          // Une erreur est survenue
          return res.status(500).json({'error':'cannot update user profile'});
      }
    });
  }, 

  deleteProfile: function(req, res, next){
    // delete cascade : true

    // Récupération de l'en-tête d'authorisation
    let headerAuth = req.headers['authorization'];

    // Verifier que ce token est valide pour faire une requête en BDD
    let userId = jwtUtils.getUserId(headerAuth);

    asyncLib.waterfall([
      function(done){
        console.log(1 + ": Récupérer l'utilisateur dans la base de données");
      
        // Récupérer l'utilisateur dans la base de données
        models.User.findOne({
          attributes : ['id','email','username'],
          where: {id: userId},
          include: [{
            model: models.Comment,
            model: models.like,
            model: models.Message
          }]
        })
        .then(userFound => {
          console.log(2 + ": Verification des likes liées pour suppression...");
          // Verification des likes liées pour suppression
          models.Like.findAll({
            attributes: ['id','userId', 'messageId'],
            where: {
              userId,
              isLike : 1
            }
          })
          .then(function(isLiked){
            console.log(2-1 + ": Décrémentation des compteurs...");
            // Décrémentation du compteur liée...
            for(let likeFound in isLiked){
              models.Message.findOne({
                where: {id:isLiked[likeFound].messageId}
              })
              .then(function(messageFound){
                messageFound.update({
                  likes : messageFound.likes -1
                })
              })
              models.Like.destroy({
                where: { userId },
                cascade : true,
                include: [{
                  model: models.Comment,
                  model: models.like,
                  model: models.Message
                }]
              })
            }
          })
        })
        .then(likeFound => {
          console.log(3 + ": Verification des Comment liées pour suppression...");
          // Verification des Comment liées pour suppression
          models.Comment.destroy({
            where: { userId },
            cascade : true,
            include: [{
              model: models.Comment,
              model: models.like,
              model: models.Message
            }]
          })
          done(null);
        })
      },

      function(done){
        console.log(4 + ": Récupératon des messages de l'utilisateur...");
        // Récuperation de tous les messages de l'utilisateur...
        models.Message.findAll({
          attributes:['id'],
          where: { userId },
        })
        .then(function(messages){
          console.log(5 + ": Supression des likes & commentaires liés aux messages...");
          for(message in messages){
            models.Like.destroy({
              where: { messageId : messages[message].id }
            })
            models.Comment.destroy({
              where: { messageId : messages[message].id }
            })
          }
          done(null);
        })
        .catch(function(err){
          return res.status(500).json({'error':'faillure to delete Like, Comment or Mesage!' + err});
        })
      },

      function(done){
        models.Message.findAll({
          where: { userId }
        })
        .then(function(messages){
          console.log(6 + ": Supression des attatchement des messages...");
          for(message in messages){
            let filename = messages[message].attachment.split('/images/')[1];
            if(filename !=null){
                fs.unlinkSync(`images/${filename}`);
            }
            models.Message.destroy({
              where: {userId}
            })
          }
          done(null);
        })
        .catch(function(err){
          return res.status(500).json({'error':'faillure to delete Like, Comment or Mesage!' + err});
        })
      },

      function(completed, done){
        console.log(8 + ": Supression du compte de l'utilisateur");
        // Supression du compte de l'utilisateur
        models.User.destroy({
          where: { id : userId }
        })
        .then(function(){
          return res.status(201).json({'message':'unsubscribe sucess'});
        })
        .catch(function(err){
          return res.status(500).json({'error':'faillure to unsubscribe!' + err});
        });
      }
    ])
  },

  getOneUserProfile: function(req, res, next){
    // Récupération de l'en-tête d'authorisation
    let headerAuth = req.headers['authorization'];
    let Username = req.body.Username;
    console.log(Username);

    // Verifier que ce token est valide pour faire une requête en BDD
    let userId = jwtUtils.getUserId(headerAuth);

    // Vérifier que userId n'est pas négatif (par sécurité)
    if (userId <0)
        return res.status(400).json({'error':'wrong token'});
    
    asyncLib.waterfall([
      function(done){
        // Récupérer l'utilisateur dans la base de données
        models.User.findOne({
            where: {id: userId}
        })
        .then(function(userFound){
            // Si l'utilisateur est rouvé, le retourner
            done(null,userFound);
        })
        .catch(function(err){
            // Sinon envoyer une erreur
            return res.status(500).json({'error':'unable to verify user'});
        });
      },

      function(userFound, done){
        // Verifier si l'utilisateur dispose des droits admin
        models.User.findOne({
            attributes : ['isAdmin'],
            where : {isAdmin: userFound.isAdmin}
        })
        .then(function(userFound){
            if(userFound.isAdmin == true){
            console.log(userFound.isAdmin);
            done(null, userFound);
            } else {
                return res.status(403).json({'error':'you do not have sufficient privileges'});
            }
        })
        .catch(function(err){
            return res.status(500).json({err});
        });
      },

      function(done){
        // Si tout va bien, on fait un appel ORM(sequelize) pour récupérer les informations de l'utilisateur en BDD
        models.User.findOne({
          attributes: ['id', 'username', 'isAdmin'],
          where: {username: Username}
        })
        .then(function(user){
            if(user){
                res.status(200).json(user);
            } else {
                res.status(404).json({'error':'user not found'});
            }
        })
        .catch(function(err){
            res.status(500).json({'error':'cannot fetch user'});
        });
      }
    ], function(done){
        if(done){
          // OK
          return res.status(201).json({'message':'user found' + done});
        } else {
          // Erreur.
          return res.status(500).json({'error':'cannot find user'});
        }
    })
  },

  updateUserAddRights: function(req, res, next){
    // Récupération de l'en-tête d'authorisation
    let headerAuth = req.headers['authorization'];
    let Username = req.body.Username;

    // Verifier que ce token est valide pour faire une requête en BDD
    let userId = jwtUtils.getUserId(headerAuth);

    // Vérifier que userId n'est pas négatif (par sécurité)
    if (userId <0)
        return res.status(400).json({'error':'wrong token'});

    asyncLib.waterfall([
      function(done){
        // Récupérer l'utilisateur dans la base de données
        models.User.findOne({
          where: {id: userId}
        })
        .then(function(userFound){
          // Si l'utilisateur est rouvé, le retourner
          done(null,userFound);
        })
        .catch(function(err){
          // Sinon envoyer une erreur
          return res.status(500).json({'error':'unable to verify user'});
        });
      },

      function(userFound, done){
        // Verifier si l'utilisateur dispose des droits admin
        models.User.findOne({
          attributes : ['isAdmin'],
          where : {isAdmin: userFound.isAdmin}
        })
        .then(function(userFound){
            if(userFound.isAdmin == true){
            console.log(userFound.isAdmin);
            done(null, userFound);
            } else {
              return res.status(403).json({'error':'you do not have sufficient privileges'});
            }
        })
        .catch(function(err){
            return res.status(500).json({err});
        });
      },

      function(userFound, done){
        // Si tout va bien, on fait un appel ORM(sequelize) pour récupérer les informations de l'utilisateur en BDD
        models.User.findOne({
          attributes: ['id', 'username', 'isAdmin'],
          where: {username: Username}
        })
        .then(function(userFound){
          console.log(userFound.isAdmin);
          if(!userFound.isAdmin){
            userFound.update({
              isAdmin : 1,
            })
            .then(function(userFound){
              done(userFound);
            })
            .catch(function(err){
              return res.status(500).json({'error':'Unable to modify Rights! ' + err});
            });
          } else {
            res.status(403).json({'error':'user is Already Moderator'});
          }
            // res.status(200).json(user);
        })
        .catch(function(err){
            return res.status(500).json({'error':'unable to set Admin Right!'});
        });
      }

    ], function(userFound){
      if(userFound){
          // Mise a jour effectuée
          return res.status(201).json(userFound);
      } else {
          // Une erreur est survenue
          return res.status(500).json({'error':'Unable to modify Rights!'});
      }
    });
  },

  updateUserRemoveRights: function(req, res, next){
    // Récupération de l'en-tête d'authorisation
    let headerAuth = req.headers['authorization'];
    let Username = req.body.Username;

    // Verifier que ce token est valide pour faire une requête en BDD
    let userId = jwtUtils.getUserId(headerAuth);

    // Vérifier que userId n'est pas négatif (par sécurité)
    if (userId <0)
        return res.status(400).json({'error':'wrong token'});
    
    asyncLib.waterfall([
      function(done){
        // Récupérer l'utilisateur dans la base de données
        models.User.findOne({
            where: {id: userId}
        })
        .then(function(userFound){
          // Si l'utilisateur est rouvé, le retourner
          done(null,userFound);
        })
        .catch(function(err){
          // Sinon envoyer une erreur
          return res.status(500).json({'error':'unable to verify user'});
        });
      },

      function(userFound, done){
        // Verifier si l'utilisateur dispose des droits admin
        models.User.findOne({
            attributes : ['isAdmin'],
            where : {isAdmin: userFound.isAdmin}
        })
        .then(function(userFound){
            if(userFound.isAdmin == true){
            console.log(userFound.isAdmin);
            done(null, userFound);
            } else {
              return res.status(403).json({'error':'you do not have sufficient privileges'});
            }
        })
        .catch(function(err){
          return res.status(500).json({err});
        });
      },

      function(userFound, done){
        // Si tout va bien, on fait un appel ORM(sequelize) pour récupérer les informations de l'utilisateur en BDD
        models.User.findOne({
          attributes: ['id', 'username', 'isAdmin'],
          where: {username: Username}
        })
        .then(function(userFound){
          console.log(userFound.isAdmin);
          if(userFound.isAdmin){
            userFound.update({
              isAdmin : 0,
            })
            .then(function(userFound){
              done(userFound);
            })
            .catch(function(err){
              return res.status(500).json({'error':'Unable to modify Rights! ' + err});
            });
          } else {
            res.status(403).json({'error':'user is not Moderator'});
          }
            // res.status(200).json(user);
        })
        .catch(function(err){
            return res.status(500).json({'error':'unable to remove Admin Right!'});
        });
      }

    ], function(userFound){
      if(userFound){
        // Mise a jour effectuée
        return res.status(201).json(userFound);
      } else {
        // Une erreur est survenue
        return res.status(500).json({'error':'Unable to modify Rights!'});
      }
    });
  }
}