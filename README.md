# P7_jerome_gasson
P7_Créez un réseau social d’entreprise

[présentation]

Il s'agit d'un projet de création d'un réseau social d'entreprise, pour l'entreprise Groupomania.

Il contient :
- Un système d'inscription/ d'authentification
- Un module pour gérer son profil (et les droits de modération)
- Un module pour poster des messages (incluant la possibilité d'ajouter des photos/images)
- Un module pour commenter les messages
- Un module pour éditer/modérer les messages
- Un système de "Like/Dislike"
- Un système de Suppression des Messages/Commentaires (inclus la suppression par modération)
- Un "Mur" qui liste l'ensemble des messages & commentaires de façon Ascendante

[prérequis]

- Pour le faire fonctionner vous devez disposer d'un Navigateur récent (Firefox 80+/Chrome 86+/ Safari 14+...)

[Serveur]
- Production : https://jerome-g78.github.io/P7_jerome_gasson/dist/
- Production : https://shadsoft.fr/projets/P7/

[Local]
- Pour faire fonctionner ce projet en local (frontend & Backend), il vous faut :
    > Node.js 14+ & NPM (yarn ou d'autres outils fonctionnent aussi) avec les modules suivants : 
- > Backend : express, body-parser, jsonwebtoken, cors, bcrypt, sequelize-cli (ORM), mysql2, async, multer, fs
- > Frontend : installez Vue.js 3+ (intégrez VueX)
- Une base de données MySQL (WAMP ou autres)

- i- Le fichier : \backend\config.json, doit être modifié pour correspondre à vos bases
- i- La base de données doit exister avant d'intégrer le projet via sequelize

- Depuis le dossier \backend\ Intégrez la base de données sur le serveur via :
    > sequelize db:migrate

[Execution]
- Pour démarrer le backend, vous devez vous trouver dans le dossier : \backend\ puis executer la commande :
    > node server.js
- Le serveur sera activé sur le port 3000 par défaut (vous pouvez le modifier dans le fichier : server.js)

- Pour le frontend, vous devez vous trouver dans le dossier : \frontend\

- Option 1 : Vérifiez dans le fichier frontend\src\store\index.js ligne 5 : 
    > urlAPI: 'http://localhost:3000/'

    exécuter la commande :
    > npm run serve
    - Le serveur est en ecoute par défaut sur le port 8080. (http://localhost:8080)

- Option 2 : Vous disposez d'un serveur apache (ou WAMP) :
    - Vérifiez dans le fichier frontend\src\store\index.js ligne 5 : 
    > urlAPI: 'http://adresseDubackend:3000/'
    - Vérifiez le fichier frontend\vue.config.js ligne 3 :
    > ? '/Chemin/DuServeur/Vers/LeDossier/dist' : '/'

    exécuter la commande :
    > npm run build
    - Copiez l'ensemble du dossier "\dist\" créé localement "frontend\dist" sur votre serveur.

[Utilisation]
- Une fois les backend & frontend chargés et disponibles
    > Depuis votre navigateur internet veuillez vous rendre sur le site suivant : 
   - Option 1 : http://localhost:8080/
   - Option 2 : http://Chemin/DuServeur/Vers/LeDossier/dist

- Arrivé sur le site, vous devez avoir une barre de navigation avec un lien d'inscription & de connexion.
- (i - les Messages & commentaires sont accessibles sans vous inscrire)
