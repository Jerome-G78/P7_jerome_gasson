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
    <div class="modal" id="registrationModal">
        <div class="modal-dialog">
            <div class="modal-content">
        
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title"> <i class="far fa-address-card"></i> Formulaire d'inscription</h4>
                    <button type="button" title="Fermer" class="close" data-dismiss="modal">&times;</button>
                </div>
        
                <!-- Modal body -->
                <div class="modal-body">
                    <form action="/action_page.php">
                        <div @click="SingInVerify" class="form-group">
                            <label for="Semail">Email <span class ="text-danger"> * </span>:</label>
                            <input type="email" class="form-control" id="Semail" placeholder="Tom@centuryFlop.com" name="email"><br/>
                            <span class="alert alert-info" v-if="!CHKeMail"><strong><i class="fas fa-info-circle"></i></strong> {{email}}</span>
                        </div>

                        <div @click="SingInVerify" class="form-group">
                            <label for="Sname">Nom d'utilisateur <span class ="text-danger"> * </span>:</label>
                            <input type="text" class="form-control" id="Sname" placeholder="Ex. Lewis" name="name"><br/>
                            <span class="alert alert-info" v-if="!CHKuserName"><strong><i class="fas fa-info-circle"></i></strong> {{username}}</span>
                        </div>

                        <div @click="SingInVerify" class="form-group">
                            <label for="Spwd">Mot de Passe <span class ="text-danger"> * </span>:</label>
                            <input type="password" class="form-control" id="Spwd" placeholder="Renseignez un mot de passe" name="pswd"><br/>
                            <span class="alert alert-info" v-if="!CHKpassword"><strong><i class="fas fa-info-circle"></i></strong> {{Mdp}}</span>
                        </div>

                        <div @click="SingInVerify" class="form-group">
                            <label for="SpwdC">Confirmez le Mot de Passe <span class ="text-danger"> * </span>:</label>
                            <input type="password" class="form-control" id="SpwdC" placeholder="Confirmez le mot de passe" name="pswdC"><br/>
                            <span class="alert alert-warning" v-if="ComparePwds"><strong><i class="fas fa-info-circle"></i></strong> {{MDPFail}}</span>
                        </div>
                        
                        <div @click="SingInVerify" class="form-group">
                            <label for="Sbio">Ma biographie:</label>
                            <textarea class="form-control" id="SBio" placeholder="Racontez-nous! Qui êtes vous? (facultatif)" rows="3"></textarea>
                            <p class ="text-danger"><small><i>* : Champs obligatoires</i></small></p>
                        </div>

                    </form>
                </div>
        
                <!-- Modal footer -->
                <div class="modal-footer">
                    <button @click="Subscribe" v-if="CHKeMail && CHKuserName && CHKpassword && !subOkay && !subFailure" type="submit" title="M'inscrire" class="btn btn-primary">M'inscrire...</button>
                </div>
                <div v-if="subOkay" class="alert alert-success">
                    {{subOK}}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div v-if="subFailure" class="alert alert-danger">
                    {{subFail}}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
        
            </div>
        </div>
    </div>

    <div class="modal" id="logginModal">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <h4 class="modal-title"><i class="fas fa-key"></i> Connexion</h4>
                    <button type="button" title="Fermer" class="close" data-dismiss="modal">&times;</button>
                </div>

                <div class="modal-body">
                    <form action="/action_page.php">

                        <div class="form-group">
                            <label for="email">Email <span class ="text-danger"> * </span>:</label>
                            <input type="email" class="form-control" id="email" placeholder="Entrez une adresse e-mail" name="email">
                        </div>

                        <div class="form-group">
                            <label for="pwd">Mot de Passe <span class ="text-danger"> * </span>:</label>
                            <input type="password" class="form-control" id="pwd" placeholder="Entrez un mot de passe" name="pswd">
                            <p class ="text-danger"><small><i>* : Champs obligatoires</i></small></p>
                        </div>

                        <div class="alert alert-info">
                            <strong><i class="fas fa-info-circle"></i><i class="fas fa-exclamation-triangle"></i></strong> ...
                        </div>

                    </form>
                </div>
        
                <div class="modal-footer">
                    <button type="submit" title="M'identifier" class="btn btn-primary">M'identifer...</button>
                </div>
        
            </div>
        </div>
    </div>

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
            CHKeMail: this.$store.state.CHKeMail,
            CHKpassword: this.$store.state.CHKpassword,
            ComparePwds: this.$store.state.ComparePwds,
            CHKuserName: this.$store.state.CHKuserName,
            Loading: this.$store.state.Loading,

            // Variables locales
            subOkay: false,
            subFailure: false,
            subCompleted: false,

            // Messages
            email: "Veuillez renseigner un e-mail",
            username: "Veuillez renseigner un nom d'utilisateur",
            Mdp: "Veuillez renseigner un mot de passe",
            MDPFail: "Les mots de passes ne sont pas identiques",
            subOK: "Votre inscription a bien été prise en compte",
            subFail: "Une erreur est survenue lors de l'inscription!"

        }
    },
    // Création de la logique du module
    methods:{
        SingInVerify(){
            let Email = document.getElementById('Semail').value;
            let Pwd = document.getElementById('Spwd').value;
            let PwdC = document.getElementById('SpwdC').value;
            let Name = document.getElementById('Sname').value;
            console.log(Email, Pwd, PwdC, Name);


            if(Email !=''){
                this.$store.commit('setCHKeMail',this.CHKeMail = true);

            } else {
                this.$store.commit('setCHKeMail',this.CHKeMail = false);
            }

            if(Name !=''){
                this.$store.commit('setCHKuserName', this.CHKuserName = true);
            } else {
                this.$store.commit('setCHKuserName', this.CHKuserName = false);
            }

            if(Pwd !='' && PwdC !='' && (Pwd == PwdC)){
                this.$store.commit('setComparePwds', this.ComparePwds = false);
                this.$store.commit('setCHKpassword', this.CHKpassword = true);
            }
            if(Pwd !='' && PwdC !='' && (Pwd != PwdC)){
                this.$store.commit('setComparePwds', this.ComparePwds = true);
            }
            if(Pwd=='' || PwdC=='') {
                this.$store.commit('setCHKpassword', this.CHKpassword = false);
            }
        },
        Subscribe(){
            this.$store.commit('setLoading',this.Loading = true);
            console.log(this.Loading);
            let Email = document.getElementById('Semail').value;
            let Pwd = document.getElementById('Spwd').value;
            let PwdC = document.getElementById('SpwdC').value;
            let Name = document.getElementById('Sname').value;

            // Faillure
            /*
            this.subFailure = true;
            this.$store.commit('setLoading',this.Loading = false);
            console.log(this.Loading);
            */

            // Registering
            this.subOkay = true;

            // Cleaning
            document.getElementById('Semail').value = '';
            document.getElementById('Spwd').value = '';
            document.getElementById('SpwdC').value = '';
            document.getElementById('Sname').value = '';
            

            // Completed
            this.subCompleted = true;
            this.$store.commit('setLoading',this.Loading = false);
            console.log(this.Loading);
        }
    },
    
}
</script>