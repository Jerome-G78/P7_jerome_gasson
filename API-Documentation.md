[Documentation]
## Accès aux différentes API
---------------------------
## I - UTILISATEUR

	1.	POST /api/users/register/ ------: Permet de vous inscrire sur le site
	2.	POST /api/users/login/ ---------: Permet de vous authentifier sur le site
    3.	GET /api/users/me/ -------------: Permet d'accéder à votre profil
    4.	PUT /api/users/me/ -------------: Permet de modifier votre profil
    5.	DELETE /api/users/unsubscribe/ -: Permet de vous désinscrire

## II - MESSAGES

	1.	GET /api/messages/ --------------: Permet de récupérer les messages (paramètrage possible)
	2.	POST /api/messages/new/----------: Permet de poster un nouveau message (avec ou sans photo)
    3.	POST /api/messages/new/preview/--: Permet de disposer d'un Preview de l'image choisie.
    4.	PUT /api/messages/:messageId/ ---: Permet de modifier votre message
    5.	DELETE /api/messages/:messageId/ : Permet de supprimer votre message
    6.	DELETE /messages/new/preview/----: Permet de supprimer le Preview.

## III - LIKE/DISLIKE

	1.	POST /api/messages/:messageId/vote/ -------: Permet d'aimer/annuler un message du mur

## IV - COMMENTAIRES

	1.	GET /api/messages/comment/ -------------------------: Permet de récupérer les commentaires liés aux messages
	2.	POST /api/messages/comment/:messageId/new/ ---------: Permet de poster un nouveau commentaire
    3.	DELETE /api/messages/comment/:messageId/:commentId/ : Permet de supprimer votre commentaire

## V - MODERATION (droits modérateur requis, donné par un administrateur)

    1.	PUT /api/messages/:messageId/moderate/ --------------------------: Permet de modifier un post utilisateur
	2.	DELETE /api/messages/:messageId/moderate/ -------------------: Permet de supprimer un post utilisateur
    3.	DELETE /api/messages/comment/:messageId/:commentId/moderate/ : Permet de supprimer un commentaire utilisateur

## VI - ADMINISTRATION

    1.	POST /api/users/ -----: Permet de récupérer les informations d'un profil utilisateur
	2.	PUT /api/users/add/ --: Permet d'accorder les droits administrateur a un utilisateur (via son nom)
    3.	PUT /api/users/remove/: Permet de retirer les droits administrateur a un utilisateur (via son nom)
---------------------------

## [UTILISATEUR]
1.	POST /api/users/register/
> POST http://NomDuSite.com/api/users/register/
- Permet de vous inscrire sur le site

- Attendu : 
    > BODY | x-www-form-urlencoded

    Puis renseignez les propriétés (avec les valeurs) :

    - email - requis
    - username - requis
    - password - requis
    - bio - optionnel

- Réponse JSON : ` | "userId" | `
---------------------------

2.	POST /api/users/register/
> POST http://NomDuSite.com/api/users/login/
- Permet de vous authentifier sur le site

- Attendu : 
    > BODY | x-www-form-urlencoded
    - email - requis
    - password - requis

- Réponse JSON : ` | "isAdmin" | "email" | "userName" | "userId" | "token" | `
---------------------------

3.	GET /api/users/me/
> GET http://NomDuSite.com/api/users/me/
- Permet d'accéder à votre profil

- Attendu : 
    > Headers 
    - Authorization : Bearer TOKEN

- Réponse JSON : ` | "id" | "email" | "userName" | "bio" | `
---------------------------

4.	PUT /api/users/me/
> PUT http://NomDuSite.com/api/users/me/
- Permet de modifier votre profil

- Attendu : 
    > Headers 
    - Authorization : Bearer TOKEN
    ----------------------------
    > Body | x-www-form-urlencoded
    - bio - requis

- Réponse JSON : ` | "id" | "bio" | "updatedAt" | `
---------------------------

5.	DELETE /api/users/unsubscribe/
> DELETE http://NomDuSite.com/api/users/unsubscribe/
- Permet de vous désinscrire

- Attendu : 
    > Headers 
    - Authorization : Bearer TOKEN

- Réponse JSON : ` "Message": "unsubscribe sucess" `
---------------------------

## [MESSAGES]
1.	GET /api/messages/
> GET http://NomDuSite.com/api/messages/
- Permet de récupérer les messages (paramétrage possible)

- Attendu : 
    > BODY | x-www-form-urlencoded

    - limit - optionnel
    - offset - optionnel
    ---------------------------

    > PARAMS | Défaut (cf. messagesCtrl.js l.190 - 196)
    - fields - id,title,content etc... (optionnel)

- Réponse JSON : ` [ Tableau de messages ] `
---------------------------

2.	POST /api/messages/new/
> POST http://NomDuSite.com/api/messages/new/
- Permet de poster un nouveau message (avec ou sans photo)

- Attendu : 
    > Headers 
    - Authorization : Bearer TOKEN
    ----------------------------
    > Body | form-data
    - title - requis
    - content - requis
    - image - optionnel
    - attachment - optionnel [1]

- Réponse JSON : `| "id" | "title" | "content" | "attachment" | "UserId" | "updatedAt" | "createdAt" |`
---------------------------

3.	POST /api/messages/new/preview/
> POST http://NomDuSite.com/api/messages/new/preview/
- Permet de disposer d'un Preview de l'image choisie.

- Attendu : 
    > Headers 
    - Authorization : Bearer TOKEN
    ----------------------------
    > Body | form-data
    - image - requis

- Réponse JSON : `| Adresse de L'image |`
---------------------------

4.	PUT /api/messages/:messageId/ ...WIP
> PUT http://NomDuSite.com/api/messages/:messageId/
- Permet de modifier votre message

- Attendu : 
    > Headers 
    - Authorization : Bearer TOKEN
    ----------------------------
    > Body | form-data
    - title - requis
    - content - requis
    - image - optionnel
    - attachment - optionnel [1]

- Réponse JSON : `| "id" | "title" | "content" | "attachment" | "UserId" | "updatedAt" | "createdAt" |`
---------------------------

5.	DELETE /api/messages/:messageId/
> DELETE http://NomDuSite.com/api/messages/:messageId/
- Permet de supprimer votre message

- Attendu : 
    > Headers 
    - Authorization : Bearer TOKEN

- Réponse JSON : ` "message": "message deleted successfully" `
---------------------------

6.	DELETE /api/messages/new/preview/
> DELETE http://NomDuSite.com/api/messages/new/preview/?image=Adresse de L'image
- Permet de supprimer le Preview.

- Attendu : 
    > Headers 
    - Authorization : Bearer TOKEN
    ----------------------------
    > Params
    - http://NomDuSite.com/api/messages/new/preview/?image=Adresse de L'image

- Réponse JSON : `| Nom de L'image Supprimée |`
---------------------------

## [LIKE/DISLIKE]
1.	POST /api/messages/:messageId/vote/
> POST http://NomDuSite.com/api/messages/:messageId/vote/
- Permet d'aimer/annuler un message du mur

- Attendu : 
    > Headers 
    - Authorization : Bearer TOKEN

- Réponse JSON : `|"likes" |`
---------------------------

## [COMMENTAIRES]
1.	GET /api/messages/comment/
> GET http://NomDuSite.com/api/messages/comment/
- Permet de récupérer les commentaires liés aux messages

- Attendu : 

    > PARAMS | Défaut (cf. commentCtrl.js l.83 - 89)
    - fields - id, username,comment ... (optionnel)

- Réponse JSON : ` | "id" | "username" | "comment" | `
---------------------------

2.	POST /api/messages/comment/:messageId/new/
> POST http://NomDuSite.com/api/messages/:messageId/new/
- Permet de poster un nouveau commentaire

- Attendu : 
    > Headers 
    - Authorization : Bearer TOKEN
    ---------------------------
    > BODY | x-www-form-urlencoded
    - comment - requis

- Réponse JSON : ` | "id" | "UserId" | "messageId" | "username" | "comment" | "createdAt" | "updatedAt" | `
---------------------------

3.	DELETE /api/messages/comment/:messageId/:commentId/
> DELETE http://NomDuSite.com/api/messages/comment/:messageId/:commentId/
- Permet de supprimer votre commentaire

- Attendu : 
    > Headers 
    - Authorization : Bearer TOKEN

- Réponse JSON : ` "message": "comment deleted successfully" `
---------------------------

## [MODERATION]
1.	PUT /api/messages/:messageId/moderate/
> PUT http://NomDuSite.com/api/messages/:messageId/moderate/
- Permet de modifier un post utilisateur

- Attendu : 
    > Headers 
    - Authorization : Bearer TOKEN
    ---------------------------
    > Body | x-www-form-urlencoded
    - title - requis
    - content - requis

- Réponse JSON : ` "Message": "Moderate message number 0" `
---------------------------

2.	DELETE /api/messages/:messageId/moderate/
> DELETE http://NomDuSite.com/api/messages/:messageId/moderate/
- Permet de supprimer un post utilisateur

- Attendu : 
    > Headers 
    - Authorization : Bearer TOKEN

- Réponse JSON : ` "message": "message deleted successfully" `
---------------------------

3.	DELETE /api/messages/comment/:messageId/:commentId/moderate/
> DELETE http://NomDuSite.com/api/messages/comment/:messageId/:commentId/moderate/
- Permet de supprimer un commentaire utilisateur

- Attendu : 
    > Headers 
    - Authorization : Bearer TOKEN

- Réponse JSON : ` "message": "comment deleted successfully" `
---------------------------

## [ADMINISTRATION]
1.	POST /api/users/
> POST http://NomDuSite.com/api/users/
- Permet de récupérer les informations d'un profil utilisateur

- Attendu : 
    > Headers 
    - Authorization : Bearer TOKEN
    ---------------------------
    > Body | x-www-form-urlencoded
    - username - requis

- Réponse JSON : ` | "id" | "username" | "isAdmin" | `
---------------------------

2.	PUT /api/users/add/
> PUT http://NomDuSite.com/api/users/add/
- Permet d'accorder les droits administrateur à un utilisateur (via son nom)

- Attendu : 
    > Headers 
    - Authorization : Bearer TOKEN
    ---------------------------
    > Body | x-www-form-urlencoded
    - username - requis

- Réponse JSON : ` | "id" | "username" | "isAdmin" | "updatedAt" | `
---------------------------

3.	PUT /api/users/remove/
> PUT http://NomDuSite.com/api/users/remove/
- Permet de retirer les droits administrateur à un utilisateur (via son nom)

- Attendu : 
    > Headers 
    - Authorization : Bearer TOKEN
    ---------------------------
    > Body | x-www-form-urlencoded
    - username - requis

- Réponse JSON : ` | "id" | "username" | "isAdmin" | "updatedAt" | `
---------------------------
