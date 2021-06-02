// Activation du mode STRICT de Javascript
"use strict";

// Imports
// let bcrypt = require('bcrypt');
let jwtUtils = require('../utils/jwt.utils');
let models = require('../models');
// let asyncLib = require('async');
let Promises = require('./Promises');
let UserPromises = require('./usersPromises');
// let fs = require('fs');
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
        console.log(err);
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
      .catch(err => {
        console.log(err);
        return res.status(err.status).json({ 'error': err.error });
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
        console.log(err);
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
        return res.status(201).json({ 'message': 'Profil Successful Updated' });
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

    // --------------------------
    // Promises
    // --------------------------

    const UserExist = Promises.UserExist(userId);
    const RemoveLikes = UserExist.then(Completed => UserPromises.RemoveLikes(userId));
    const RemoveComments = RemoveLikes.then(Completed => UserPromises.RemoveComments(userId));
    const RemoveOthersCommentsLikes = RemoveComments.then(Completed => UserPromises.RemoveOthersCommentsLikes(userId));
    const RemoveMessages = RemoveOthersCommentsLikes.then(Completed => UserPromises.RemoveMessages(userId));
    const RemoveAccount = RemoveMessages.then(Completed => UserPromises.RemoveAccount(userId));

    Promise.all([UserExist, RemoveLikes, RemoveComments, RemoveOthersCommentsLikes, RemoveMessages, RemoveAccount])
      .then((userFound) => {
        console.log(userFound);
        return res.status(201).json({ 'message': 'unsubscribe sucess' });
      })
      .catch(err => {
        console.log(err);
        return res.status(err.status).json({ 'error': err.error });
      });
  },

  getOneUserProfile: (req, res) => {
    // Récupération de l'en-tête d'autorisation
    let headerAuth = req.headers['authorization'];
    let Username = req.body.Username;

    // Vérifier que ce token est valide pour faire une requête en BDD
    let userId = jwtUtils.getUserId(headerAuth);

    // Vérifier que userId n'est pas négatif (par sécurité)
    if (userId < 0)
      return res.status(400).json({ 'error': 'wrong token' });

    // --------------------------
    // Promises
    // --------------------------

    const UserExist = Promises.UserExist(userId);
    const UserIsAdmin = UserExist.then(UserFound => UserPromises.UserIsAdmin(UserFound));
    const RequestUserInformation = UserIsAdmin.then(Complete => UserPromises.RequestUserInformation(Username));

    Promise.all([UserExist, UserIsAdmin, RequestUserInformation])
      .then(userFound => {
        return res.status(201).json(userFound[2]);
      })
      .catch(err => {
        console.log(err);
        return res.status(err.status).json({ 'error': err.error });
      });
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

    // --------------------------
    // Promises
    // --------------------------

    const UserExist = Promises.UserExist(userId);
    const UserIsAdmin = UserExist.then(UserFound => UserPromises.UserIsAdmin(UserFound));
    const AddRight = UserIsAdmin.then(Complete => UserPromises.AddRight(Username));

    Promise.all([UserExist, UserIsAdmin, AddRight])
      .then(userFound => {
        return res.status(201).json({ 'message': 'Right Added -' + userFound[2] });
      })
      .catch(err => {
        console.log(err);
        return res.status(err.status).json({ 'error': err.error });
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

    // --------------------------
    // Promises
    // --------------------------

    const UserExist = Promises.UserExist(userId);
    const UserIsAdmin = UserExist.then(UserFound => UserPromises.UserIsAdmin(UserFound));
    const RemoveRight = UserIsAdmin.then(Complete => UserPromises.RemoveRight(Username));

    Promise.all([UserExist, UserIsAdmin, RemoveRight])
      .then(userFound => {
        return res.status(201).json({ 'message': 'Right Removed -' + userFound[2] });
      })
      .catch(err => {
        console.log(err);
        return res.status(err.status).json({ 'error': err.error });
      });
  }
}
