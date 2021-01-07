<template>
    <div class="modal" id="profilModal">
        <div class="modal-dialog">
            <div class="modal-content">
        
                <div class="modal-header">
                    <h4 class="modal-title"><i class="far fa-user"></i> Mon Profil</h4>
                    <button type="button" title="Fermer" class="close" data-dismiss="modal">&times;</button>
                </div>
        
                <div class="modal-body">
                    <p> 
                        <strong> Nom : </strong>{{userName}}<br/>
                        <strong> E-mail : </strong>{{email}}<br/>
                        <strong> Biographie : </strong>{{bio}}<br/>
                    </p>

                    <div @keyup="checkBio" class="form-group">
                        <label for="Bio"><i class="fas fa-pen"></i> Modifier ma Biographie:</label>
                        <textarea  class="form-control" id="Bio" placeholder="Renseignez ce champ si vous souhiatez changer votre biographie." rows="3"></textarea>
                        <button @click="updateBio" v-if="BioEdit" type="button" title="Mettre à jour" class="btn btn-primary">Mettre à jour</button>

                        <div v-if="subOkay" class="alert alert-success">
                            <strong><i class="fas fa-check-circle"></i></strong> votre profil est à jour.
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <hr/>
                    </div>

                    <div v-if="isAdmin" class="form-group">
                        <h5>Options Modérateur</h5>
                        <label for="Search"><i class="fas fa-search"></i> Rechercher un utilisateur</label>
                        <input @keyup="checkNameExist" type="text" class="form-control" id="Search" placeholder="Tapez le nom d'un utilisateur" name="Search">
                        <button v-if="findUser && !findUserAdmin" type="button" title="Accorder les drois modérateur" class="btn btn-primary" >Accorder</button>
                        <button v-if="findUser && findUserAdmin" type="button" title="Supprimer les drois modérateur" class="btn btn-primary" >Retirer</button>
                    </div>

                    <div v-if="!isAdmin" class="alert alert-info">
                        <strong><i class="fas fa-info-circle"></i></strong> vous n'êtes pas modérateur.
                    </div>
                    
                </div>

                <div class="modal-footer">
                    <button type="button" title="Désinscription" class="btn btn-danger" data-dismiss="modal">Désinscription</button>
                </div>
        
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Profil',
    data(){
        return {
            // Récupération des variables globales dans vue X
            userName: this.$store.state.userName,
            Connected: this.$store.state.Connected,
            email:this.$store.state.email,
            bio:this.$store.state.bio,
            Loading: this.$store.state.Loading,
            isAdmin: this.$store.state.isAdmin,
            BioEdit: this.$store.state.BioEdit,

            // Variables locales
            findUser:false,
            findUserAdmin:false,
            findedUser:'',

            subOkay: false,
            subFailure: false,
            subCompleted: false,

            // Messages
            subOK: "Connexion réussi.",
            subFail: "Une erreur est survenue!"

        }
    },
    // Création de la logique du module
    methods:{
        checkBio(){            
            let BioArea = document.getElementById("Bio").value;

            if(BioArea != ''){
                this.$store.commit('setBioEdit',this.BioEdit = true);
            } else {
                this.$store.commit('setBioEdit',this.BioEdit = false);
            }
        },
        updateBio(){
            let BioArea = document.getElementById("Bio").value;
            this.$store.commit('setLoading',this.Loading = true);
            this.$store.commit('setBioEdit',this.BioEdit = false);
            // code

            // Faillure
            /*
            this.subFailure = true;
            this.$store.commit('setLoading',this.Loading = false);
            console.log(this.Loading);
            */

           //SubOkay
           this.bio = BioArea;
           this.$store.commit('setBio', BioArea);
           this.subOkay = true;

           // Completed
            document.getElementById('Bio').value = '';
            this.subCompleted = true;
            this.$store.commit('setLoading',this.Loading = false);
        },
        checkNameExist(){
            //WIP
            let searchName = document.getElementById("Search").value;

            if(searchName !='' && searchName == this.userName){
                // Code faire une recherche dans la BDD
                console.log('finded!');
                this.findUser = true;
                this.findUserAdmin = this.$store.state.isAdmin;

            } else {
                // Ne rien faire
                this.findUser = false;
                this.findUserAdmin = false;
                console.log('Not Found!');
            }

        },
        addRight(){
            //WIP
        },
        removeRight(){
            //WIP
        }
    },
}
</script>