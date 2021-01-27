[Documentation]
## Accès aux différentes API
---------------------------
## I - UTILISATEUR

	1.	POST /api/users/register/ ------: Permet de vous inscrire sur le site
	2.	POST /api/users/login/ ---------: Permet de vous authentifiés sur le site
    3.	GET /api/users/me/ -------------: Permet d'acceder a votre profil
    4.	PUT /api/users/me/ -------------: Permet de modifier votre profil
    5.	DELETE /api/users/unsubscribe/ -: Permet de vous déinscrire

## II - MESSAGES

	1.	GET /api/messages/ --------------: Permet de récupérer les messages (paramètrage possible)
	2.	POST /api/messages/new/----------: Permet de poster un nouveau message (avec ou sans photo)
    3.	PUT /api/messages/:messageId/ ---: permet de modifier votre message
    4.	DELETE /api/messages/:messageId/ : Permet de supprimer votre message

## III - LIKE/DISLIKE

	1.	POST /api/messages/:messageId/vote/like/ -------: Permet d'aimer un message du mur
	2.	POST /api/messages/:messageId/vote/dislike/ ----: Permet d'annuler (dislike) un message du mur

## IV - COMMENTAIRES

	1.	GET /messages/comment/ -------------------------: Permet de récupérer les commentaires liés aux messages
	2.	POST /messages/comment/:messageId/new/ ---------: Permet de poster un nouveau commentaire
    3.	DELETE /messages/comment/:messageId/:commentId/ : Permet de supprimer votre message

## V - MODERATION (droits modérateur requis, donné par un administrateur)

    1.	PUT /messages/:messageId/moderate/ --------------------------: Permet de modifier un post utilisateur
	2.	DELETE /api/messages/:messageId/moderate/ -------------------: Permet de supprimer un post utilisateur
    3.	DELETE /api/messages/comment/:messageId/:commentId/moderate/ : Permet de supprimer un commentaire utilisateur

## VI - ADMINISTRATION

    1.	GET /users/ ----------: Permet de récupérer les informations d'un profil utilisateur
	2.	PUT /api/users/add/ --: Permet d'accorder les droits administrateur a un utilisateur (via son nom)
    3.	PUT /api/users/remove/: Permet de retirer les droits administrateur a un utilisateur (via son nom)
---------------------------

## [UTILISATEUR]
1.	POST /api/users/register/
> POST http://NomDuSite.com/api/users/register/
Permet de vous inscrire sur le site

- Attendu : 
    > BODY - 
    > x-www-form-urlencoded

    Puis renseignez les propriétés (avec les valeurs) :

    - email - requis
    - username - requis
    - password - requis
    - bio - optionnel

- Réponse JSON : `"userId": 1`

## [MESSAGES]

## [LIKE/DISLIKE]

## [COMMENTAIRES]

## [MODERATION]

## [ADMINISTRATION]

WIP ...
