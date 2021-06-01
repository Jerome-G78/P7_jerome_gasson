// Activation du mode STRICT de Javascript
"use strict";

// Imports
// let bcrypt = require('bcrypt');
let jwtUtils = require('../utils/jwt.utils');
let models = require('../models');
let asyncLib = require('async');
let Promises = require('./Promises');
let UserPromises = require('./usersPromises');
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
  register: (req, res) => {
    // Params 

    //  Récupération des paramètres envoyés dans la requête
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let bio = req.body.bio;

    // Vérifier que les données obligatoires ont bien été récupérées
    if (email == null || username == null || password == null) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    // Vérification des variables envoyés

    // Si le pseudo est égal ou plus grand que 16, ou infèrieur ou égal à 4 on rejette la demande
    if (username.length >= 16 || username.length <= 4) {
      return res.status(400).json({ 'error': 'username must be length 5 - 15' });
    }

    // Vérification de l'adresse E-Mail via le Regex
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ 'error': 'email is not valid ' });
    }

    // Vérification du mot de passe via le Regex
    if (!PASSWORD_REGEX.test(password)) {
      return res.status(400).json({ 'error': 'Password must be minimum 8 digits at least one uppercase letter, one lowercase letter and one number.' });
    }

    // Après vérifications, Ajout de l'utilisateur dans la base de données
    // --------------------------
    // Promises
    // --------------------------

    const verifyUser = UserPromises.FindUser(username);
    const verifyMail = UserPromises.FindMail(email);
    const passCrypt = verifyMail.then(() => UserPromises.PassEncrypt(password));
    const regAccount = passCrypt.then(BCRYPTED => UserPromises.RegisterAccount(email, username, BCRYPTED, bio));

    Promise.all([verifyUser, verifyMail, passCrypt, regAccount])
      .then(() => {
        return res.status(201).json({ 'message': 'Registration Completed' });
      })
      .catch(err => {
        return res.status(err.status).json({ 'error': err.error });
      });
  },

  login: (req, res) => {
    // Récupération des paramètres de connexion (User & Mdp)

    let email = req.body.email;
    let password = req.body.password;

    // Vérification des variables envoyés

    if (email == null || password == null) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    // TODO verify mail regex & password length

    // --------------------------
    // Promises
    // --------------------------

    const UserExist = UserPromises.UserExist(email);
    const ComparePassword = UserExist.then(UserFound => UserPromises.ComparePassword(UserFound, password));

    Promise.all([UserExist, ComparePassword])
      .then(userFound => {
        return res.status(201).json(userFound[1]);
      })
      .catch(Error => {
        console.log(Error);
        return res.status(Error.status).json({ 'error': 'cannot log on user' + Error });
      });
  },

  getUserProfile: (req, res) => {
    // Récupération de l'en-tête d'autorisation
    let headerAuth = req.headers['authorization'];

    // Vérifier que ce token est valide pour faire une requête en BDD
    let userId = jwtUtils.getUserId(headerAuth);

    // Vérifier que userId n'est pas négatif (par sécurité)
    if (userId < 0)
      return res.status(400).json({ 'error': 'wrong token' });

    // Si tout va bien, on fait un appel ORM(sequelize) pour récupérer les informations de l'utilisateur en BDD
    models.User.findOne({
      attributes: ['id', 'email', 'username', 'bio', 'isAdmin'],
      where: { id: userId }
    })
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      })
      .catch(err => {
        res.status(500).json({ 'error': 'cannot fetch user' });
      });
  },

  updateUserProfile: (req, res) => {
    // Récupération de l'en-tête d'autorisation
    let headerAuth = req.headers['authorization'];

    // Vérifier que ce token est valide pour faire une requête en BDD
    let userId = jwtUtils.getUserId(headerAuth);

    // Params : Récupération des données du Frontend.
    let bio = req.body.bio;

    // --------------------------
    // Promises
    // --------------------------

    const UserExist = Promises.UserExist(userId);
    const UpdateBio = UserExist.then((userFound) => UserPromises.UpdateBio(userFound, bio));

    Promise.all([UserExist, UpdateBio])
      .then((userFound) => {
        return res.status(201).json({ 'message': 'Registration Completed' });
      })
      .catch(err => {
        return res.status(err.status).json({ 'error': err.error });
      });
  },

  deleteProfile: (req, res) => {

    // Récupération de l'en-tête d'autorisation
    let headerAuth = req.headers['authorization'];

    // Vérifier que ce token est valide pour faire une requête en BDD
    let userId = jwtUtils.getUserId(headerAuth);

    asyncLib.waterfall([
      done => {
        console.log(1 + ": Récupérer l'utilisateur dans la base de données");
        // Récupérer l'utilisateur dans la base de données
        models.User.findOne({
          attributes: ['id', 'email', 'username'],
          where: { id: userId },
          include: [{
            model: models.Comment,
            model: models.like,
            model: models.Message
          }]
        })
          .then(userFound => {
            console.log(2 + ": Verification des likes liées pour suppression...");
            // Vérification des likes liés pour suppression
            models.Like.findAll({
              attributes: ['id', 'userId', 'messageId'],
              where: {
                userId,
                isLike: 1
              }
            })
              .then(isLiked => {
                console.log(2 - 1 + ": Décrémentation des compteurs...");
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
                    cascade: true,
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
            // Vérification des Comment liés pour suppression
            models.Comment.destroy({
              where: { userId },
              cascade: true,
              include: [{
                model: models.Comment,
                model: models.like,
                model: models.Message
              }]
            })
            done(null);
          })
      },

      done => {
        console.log(4 + ": Récupératon des messages de l'utilisateur...");
        // Récupération de tous les messages de l'utilisateur...
        models.Message.findAll({
          attributes: ['id'],
          where: { userId },
        })
          .then(messages => {
            console.log(5 + ": Supression des likes & commentaires liés aux messages...");
            for (let message in messages) {
              models.Like.destroy({
                where: { messageId: messages[message].id }
              })
              models.Comment.destroy({
                where: { messageId: messages[message].id }
              })
            }
            done(null);
          })
          .catch(err => {
            return res.status(500).json({ 'error': 'faillure to delete Like, Comment or Mesage!' + err });
          })
      },

      done => {
        models.Message.findAll({
          where: { userId }
        })
          .then(messages => {
            console.log(6 + ": Supression des attatchement des messages...");
            for (let message in messages) {
              let filename = messages[message].attachment.split('/images/')[1];
              if (filename != null) {
                fs.unlinkSync(`images/${filename}`);
              }
              models.Message.destroy({
                where: { userId }
              })
            }
            done(null);
          })
          .catch(err => {
            return res.status(500).json({ 'error': 'faillure to delete Like, Comment or Mesage!' + err });
          })
      },

      (completed, done) => {
        console.log(8 + ": Suppression du compte de l'utilisateur");
        // Suppression du compte de l'utilisateur
        models.User.destroy({
          where: { id: userId }
        })
          .then(() => {
            return res.status(201).json({ 'message': 'unsubscribe sucess' });
          })
          .catch(err => {
            return res.status(500).json({ 'error': 'faillure to unsubscribe!' + err });
          });
      }
    ])
  },

  getOneUserProfile: (req, res) => {
    // Récupération de l'en-tête d'autorisation
    let headerAuth = req.headers['authorization'];
    let Username = req.body.Username;
    console.log(Username);

    // Vérifier que ce token est valide pour faire une requête en BDD
    let userId = jwtUtils.getUserId(headerAuth);

    // Vérifier que userId n'est pas négatif (par sécurité)
    if (userId < 0)
      return res.status(400).json({ 'error': 'wrong token' });

    asyncLib.waterfall([
      done => {
        // Récupérer l'utilisateur dans la base de données
        models.User.findOne({
          where: { id: userId }
        })
          .then(userFound => {
            // Si l'utilisateur est rouvé, le retourner
            done(null, userFound);
          })
          .catch(err => {
            // Sinon envoyer une erreur
            return res.status(500).json({ 'error': 'unable to verify user' });
          });
      },

      (userFound, done) => {
        // Vérifier si l'utilisateur dispose des droits admin
        models.User.findOne({
          attributes: ['isAdmin'],
          where: { isAdmin: userFound.isAdmin }
        })
          .then(userFound => {
            if (userFound.isAdmin == true) {
              console.log(userFound.isAdmin);
              done(null, userFound);
            } else {
              return res.status(403).json({ 'error': 'you do not have sufficient privileges' });
            }
          })
          .catch(err => {
            return res.status(500).json({ err });
          });
      },

      done => {
        // Si tout va bien, on fait un appel ORM(sequelize) pour récupérer les informations de l'utilisateur en BDD
        models.User.findOne({
          attributes: ['id', 'username', 'isAdmin'],
          where: { username: Username }
        })
          .then(user => {
            if (user) {
              res.status(200).json(user);
            } else {
              res.status(404).json({ 'error': 'user not found' });
            }
          })
          .catch(err => {
            res.status(500).json({ 'error': 'cannot fetch user' });
          });
      }
    ], done => {
      if (done) {
        // OK
        return res.status(201).json({ 'message': 'user found' + done });
      } else {
        // Erreur.
        return res.status(500).json({ 'error': 'cannot find user' });
      }
    })
  },

  updateUserAddRights: (req, res) => {
    // Récupération de l'en-tête d'autorisation
    let headerAuth = req.headers['authorization'];
    let Username = req.body.Username;

    // Vérifier que ce token est valide pour faire une requête en BDD
    let userId = jwtUtils.getUserId(headerAuth);

    // Vérifier que userId n'est pas négatif (par sécurité)
    if (userId < 0)
      return res.status(400).json({ 'error': 'wrong token' });

    asyncLib.waterfall([
      done => {
        // Récupérer l'utilisateur dans la base de données
        models.User.findOne({
          where: { id: userId }
        })
          .then(userFound => {
            // Si l'utilisateur est rouvé, le retourner
            done(null, userFound);
          })
          .catch(err => {
            // Sinon envoyer une erreur
            return res.status(500).json({ 'error': 'unable to verify user' });
          });
      },

      (userFound, done) => {
        // Vérifier que l'utilisateur dispose des droits admin
        models.User.findOne({
          attributes: ['isAdmin'],
          where: { isAdmin: userFound.isAdmin }
        })
          .then(userFound => {
            if (userFound.isAdmin == true) {
              console.log(userFound.isAdmin);
              done(null, userFound);
            } else {
              return res.status(403).json({ 'error': 'you do not have sufficient privileges' });
            }
          })
          .catch(err => {
            return res.status(500).json({ err });
          });
      },

      (userFound, done) => {
        // Si tout va bien, on fait un appel ORM(sequelize) pour récupérer les informations de l'utilisateur en BDD
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
                  done(userFound);
                })
                .catch(err => {
                  return res.status(500).json({ 'error': 'Unable to modify Rights! ' + err });
                });
            } else {
              res.status(403).json({ 'error': 'user is Already Moderator' });
            }
          })
          .catch(err => {
            return res.status(500).json({ 'error': 'unable to set Admin Right!' });
          });
      }

    ], userFound => {
      if (userFound) {
        // Mise à jour effectuée
        return res.status(201).json(userFound);
      } else {
        // Une erreur est survenue
        return res.status(500).json({ 'error': 'Unable to modify Rights!' });
      }
    });
  },

  updateUserRemoveRights: (req, res) => {
    // Récupération de l'en-tête d'autorisation
    let headerAuth = req.headers['authorization'];
    let Username = req.body.Username;

    // Vérifier que ce token est valide pour faire une requête en BDD
    let userId = jwtUtils.getUserId(headerAuth);

    // Vérifier que userId n'est pas négatif (par sécurité)
    if (userId < 0)
      return res.status(400).json({ 'error': 'wrong token' });

    asyncLib.waterfall([
      done => {
        // Récupérer l'utilisateur dans la base de données
        models.User.findOne({
          where: { id: userId }
        })
          .then(userFound => {
            // Si l'utilisateur est rouvé, le retourner
            done(null, userFound);
          })
          .catch(err => {
            // Sinon envoyer une erreur
            return res.status(500).json({ 'error': 'unable to verify user' });
          });
      },

      (userFound, done) => {
        // Vérifier si l'utilisateur dispose des droits admin
        models.User.findOne({
          attributes: ['isAdmin'],
          where: { isAdmin: userFound.isAdmin }
        })
          .then(userFound => {
            if (userFound.isAdmin == true) {
              console.log(userFound.isAdmin);
              done(null, userFound);
            } else {
              return res.status(403).json({ 'error': 'you do not have sufficient privileges' });
            }
          })
          .catch(err => {
            return res.status(500).json({ err });
          });
      },

      (userFound, done) => {
        // Si tout va bien, on fait un appel ORM(sequelize) pour récupérer les informations de l'utilisateur en BDD
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
                  done(userFound);
                })
                .catch(err => {
                  return res.status(500).json({ 'error': 'Unable to modify Rights! ' + err });
                });
            } else {
              res.status(403).json({ 'error': 'user is not Moderator' });
            }
          })
          .catch(err => {
            return res.status(500).json({ 'error': 'unable to remove Admin Right!' });
          });
      }

    ], userFound => {
      if (userFound) {
        // Mise à jour effectuée
        return res.status(201).json(userFound);
      } else {
        // Une erreur est survenue
        return res.status(500).json({ 'error': 'Unable to modify Rights!' });
      }
    });
  }
}
