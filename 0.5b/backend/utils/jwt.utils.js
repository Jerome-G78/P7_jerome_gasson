// Imports
const jwt = require('jsonwebtoken');

// Initialiser la clé de signature JWT (64)
const JWT_SIGN_SECRET = '3^3GWE6_!2jWD&kk?ad3-6Hp9=g6xsR/4)3+eFUk/Q/kUc/9Yh5E(xX4eD8]48W!';

// Exported function
module.exports = {
    generateTokenForUser: function(userData){
        // Signer le token
        return jwt.sign({
            // Dans ce 'Payload' on renseigne les éléments :
            userId: userData.id,
            isAdmin : userData.isAdmin 
        },
        // génération & paramètrage du TOKEN
        JWT_SIGN_SECRET,
        {
            // Durée de validité
            expiresIn: '1h'
        })
    }
}