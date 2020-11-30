// import des packages
const express = require('express');
const userCtrl = require('../controllers/message');

// Initialisation du routeur
const router = express.Router();

// Définition des routes
router.post('/send', userCtrl.signup);

module.exports = router;