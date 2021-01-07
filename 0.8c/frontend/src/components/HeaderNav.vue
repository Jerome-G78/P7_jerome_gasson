<template>
    <header class="bg-light text-center">
        <img class="col-md-6 container" src="../assets/Banner.png">
        <!-- Navigation -->
        <nav id="NavBar" class="navbar navbar-light justify-content-end"> 				<!-- Menu de navigation -->
            <ul class="nav">
                <li v-if="!Connected" class="nav-item"><a class="nav-link" href="#" title="Inscription au site" data-toggle="modal" data-target="#registrationModal"> <i class="far fa-address-card"></i> Inscription </a></li>
                <li v-if="!Connected" class="nav-item"><a class="nav-link" href="#" title="Connexion au site" data-toggle="modal" data-target="#logginModal"> <i class="fas fa-key"></i> Connexion </a></li>
                <li v-if="Connected" class="nav-item"><a class="nav-link" href="#" title="Créer un Message" data-toggle="modal" data-target="#NewMessage"> <i class="far fa-newspaper"></i> Nouveau Message </a></li>
                <li v-if="Connected" class="nav-item"><a class="nav-link" href="#" title="Mon profil" data-toggle="modal" data-target="#profilModal"> <i class="far fa-user"></i> Mon Compte </a></li>
            </ul>
        </nav>

        <div id="welcome" v-if="Connected" class="alert alert-success">
            Bienvenue {{userName}}!
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </header>
    <!-- Modals Navigation START -->

    <div class="modal" id="NewMessage">
        <div class="modal-dialog">
            <div class="modal-content">
        
                <div class="modal-header">
                    <h4 class="modal-title"><i class="far fa-newspaper"></i> Poster un message </h4>
                    <button type="button" title="Fermer" class="close" data-dismiss="modal">&times;</button>
                </div>
        
                <div class="modal-body">

                    <div class="form-group">
                        <label for="name">Titre <span class ="text-danger"> * </span>:</label>
                        <input type="text" class="form-control" id="name" placeholder="Un Titre" name="name">
                    </div>

                    <div class="form-group">
                        <label for="Content"> Contenue du message <span class ="text-danger"> * </span> :</label>
                        <textarea class="form-control" id="Content" placeholder="Contenue de votre message" rows="3"></textarea>
                    </div>
                    <p> 
                        Joindre une image :
                        <input id="uploadFile" type="file">
                    </p>

                    <p class ="text-danger"><small><i>* : Champs obligatoires</i></small></p>

                </div>

                <div class="modal-footer">
                    <button type="button" title="Envoyer" class="btn btn-primary" data-dismiss="modal">Envoyer...</button>
                </div>
        
            </div>
        </div>
    </div>

    <div class="modal" id="profilModal">
        <div class="modal-dialog">
            <div class="modal-content">
        
                <div class="modal-header">
                    <h4 class="modal-title"><i class="far fa-user"></i> Mon Profil</h4>
                    <button type="button" title="Fermer" class="close" data-dismiss="modal">&times;</button>
                </div>
        
                <div class="modal-body">
                    <p> 
                        <strong> Nom : </strong>[Recupérer le nom] ...<br/>
                        <strong> E-mail : </strong>[Recupérer l'adresse Email] ...<br/>
                        <strong> Biographie : </strong>[Recupérer la Biographie] ...<br/>
                    </p>

                    <div class="form-group">
                        <label for="bio"><i class="fas fa-pen"></i> Modifier ma Biographie:</label>
                        <textarea class="form-control" id="Bio" placeholder="Renseignez ce champ si vous souhiatez changer votre biographie." rows="3"></textarea>
                        <button type="button" title="Mettre à jour" class="btn btn-primary">Mettre à jour</button>

                        <div class="alert alert-success">
                            <strong><i class="fas fa-check-circle"></i></strong> votre profil est à jour.
                        </div>
                        <hr/>
                    </div>

                    <div class="form-group">
                        <h5>Options Modérateur</h5>
                        <label for="Search"><i class="fas fa-search"></i> Rechercher</label>
                        <input type="text" class="form-control" id="Search" placeholder="Tapez le nom d'un utilisateur" name="Search">
                        <button type="button" title="Accorder les drois modérateur" class="btn btn-primary" >Accorder / Retirer</button>
                    </div>

                    <div class="alert alert-info">
                        <strong><i class="fas fa-info-circle"></i></strong> vous n'êtes pas modérateur.
                    </div>
                    
                </div>

                <div class="modal-footer">
                    <button type="button" title="Désinscription" class="btn btn-danger" data-dismiss="modal">Désinscription</button>
                </div>
        
            </div>
        </div>
    </div>
    <!-- Modals Navigation END -->
</template>

<script>
export default {
    name: 'HeaderNav',
    data(){
        return {
            // Récupération des variables dans vue X
            userName: this.$store.state.userName,
            Connected: this.$store.state.Connected,
            Loading: this.$store.state.Loading,

            // Variables locales
            subOkay: false,
            subFailure: false,
            subCompleted: false,

            // Messages
        }
    },
    // Création de la logique du module
    methods:{
        
    }
    
}
</script>