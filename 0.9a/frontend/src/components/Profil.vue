<template>
    <div class="modal" id="profilModal">
        <div class="modal-dialog">
            <div class="modal-content">
        
                <div class="modal-header">
                    <h4 class="modal-title"><i class="far fa-user"></i> Mon Profil</h4>
                    <button @click="ResetStats" type="button" title="Fermer" class="close" data-dismiss="modal">&times;</button>
                </div>
        
                <div class="modal-body">
                    <p> 
                        <strong> Nom : </strong>{{Data.userName}}<br/>
                        <strong> E-mail : </strong>{{Data.email}}<br/>
                        <strong> Biographie : </strong>{{Data.bio}}<br/>
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

                    <div v-if="Data.isAdmin" class="form-group">
                        <h5>Options Modérateur</h5>
                        <label for="Search"><i class="fas fa-search"></i> Rechercher un utilisateur</label>
                        <input @keyup="checkNameExist" type="text" class="form-control" id="Search" placeholder="Tapez le nom d'un utilisateur" name="Search">
                        <button @click="addRight" v-if="findUser && !findUserAdmin" type="button" title="Accorder les drois modérateur" class="btn btn-primary" >Accorder</button>
                        <button @click="removeRight" v-if="findUser && findUserAdmin" type="button" title="Supprimer les drois modérateur" class="btn btn-danger" >Retirer</button>

                        <div v-if="RightAdded" class="alert alert-success">
                            <strong><i class="fas fa-check-circle"></i></strong> {{RightAdd}}
                            <button @click="ResetStats" type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div v-if="RightRemoved" class="alert alert-success">
                            <strong><i class="fas fa-check-circle"></i></strong> {{RightRemove}}
                            <button @click="ResetStats" type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>

                    <div v-if="!Data.isAdmin" class="alert alert-info">
                        <strong><i class="fas fa-info-circle"></i></strong> vous n'êtes pas modérateur.
                    </div>
                    
                </div>

                <div class="modal-footer">
                    <button @click="GoOut" type="button" title="Déconnexion" class="btn btn-primary" data-dismiss="modal">Déconnexion</button>
                    <button @click="Unsubscribe" type="button" title="Désinscription" class="btn btn-danger" data-dismiss="modal">Désinscription</button>
                </div>
        
            </div>
        </div>
    </div>
</template>

<script>
import router from '@/router/index.js'
export default {
    name: 'Profil',
    data(){
        return {
            // Variables locales
            urlAPI:this.$store.state.urlAPI,

            BioEdit:false,
            findUser:false,
            findUserAdmin:false,
            findedUser:'',

            RightAdded:false,
            RightRemoved:false,

            subOkay: false,
            subFailure: false,
            subCompleted: false,

            // Messages
            subOK: "Connexion réussi.",
            subFail: "Une erreur est survenue!",
            RightAdd: "Droit accordé à l'utilisateur",
            RightRemove: "Droit supprimé à l'utilisateur"
        }
    },

    computed:{
        Data(){
            return {
                userName: this.$store.state.userName,
                Connected: this.$store.state.Connected,
                email:this.$store.state.email,
                bio:this.$store.state.bio,
                Loading: this.$store.state.Loading,
                isAdmin: this.$store.state.isAdmin,
                Token: this.$store.state.Token,
            }
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
            this.$store.commit('setLoading', true);
            this.$store.commit('setBioEdit', false);

            // Configuration de l'en-tete AXIOS (intégration du token)
            axios.interceptors.request.use(
                config => {
                    config.headers.authorization = `Bearer ${this.Data.Token}`;
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );

            // Initialisation de la promesse vers l'API via AXIOS
            axios.put(this.urlAPI+'/api/users/me/',{
                bio: BioArea,
                })
            .then(res =>{
                // Envoie des données en base
                console.log(res);
                this.bio = BioArea;

                //SubOkay
                this.$store.commit('setBio', BioArea);
                this.subOkay = true;
                this.subCompleted = true;
                this.$store.commit('setLoading', false);
                console.log(this.$store.state.Loading);

                // Completed
                document.getElementById('Bio').value = '';
                this.subCompleted = true;
                this.$store.commit('setLoading', false);
            })
            .catch(err =>{
                //WIP
                console.log(err);
                this.subFailure = true;
                // this.subFail = err.error;
                this.$store.commit('setLoading', false);
                console.log(this.this.Data.Loading);
            });

        },
        checkNameExist(){
            let searchName = document.getElementById("Search").value;

            axios.interceptors.request.use(
                config => {
                    config.headers.authorization = `Bearer ${this.Data.Token}`;
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );

            if(searchName !=''){
                console.log(searchName);
                // Code faire une recherche dans la BDD
                axios.post(this.urlAPI+"/api/users/",{
                        Username: searchName,
                })
                .then(res=>{
                    console.log('finded!');
                    this.findUser = true;
                    this.findUserAdmin = res.data.isAdmin;
                })
                .catch(err=>{
                    console.log('Not Found! ' + err);
                });
            } else {
                // Ne rien faire
                this.findUser = false;
                this.findUserAdmin = false;
                console.log('Not Found!');
            }

        },
        addRight(){
            let searchName = document.getElementById("Search").value;

            axios.interceptors.request.use(
                config => {
                    config.headers.authorization = `Bearer ${this.Data.Token}`;
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );

            axios.put(this.urlAPI+"/api/users/add",{
                Username : searchName,
            })
            .then(res=>{
                console.log(res);
                this.RightAdded = true;
                this.findUser = false;
                document.getElementById('Search').value = '';
            })
            .catch(err=>{
                console.log(err);
            });

        },
        removeRight(){
            let searchName = document.getElementById("Search").value;

            axios.interceptors.request.use(
                config => {
                    config.headers.authorization = `Bearer ${this.Data.Token}`;
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );

            axios.put(this.urlAPI+"/api/users/remove",{
                Username : searchName,                
            })
            .then(res=>{
                console.log(res);
                this.RightRemoved = true;
                this.findUser = false;
                document.getElementById('Search').value = '';
            })
            .catch(err=>{
                console.log(err);
            });

        },
        GoOut(){
            // Réinitialisation des paramètres Vue X...
            // Supression des informations de session utilisateur...
            this.subOkay = false;
            this.subCompleted = false;
            this.$store.commit('setEmail', '');
            localStorage.removeItem('Email');
            console.log(this.$store.state.email);
            this.$store.commit('setUserName', '');
            localStorage.removeItem('userName');
            console.log(this.$store.state.userName);
            this.$store.commit('setUserID', 0);
            localStorage.removeItem('userId');
            console.log(this.$store.state.userId);
            this.$store.commit('setToken', '');
            localStorage.removeItem('Token');
            console.log(this.$store.state.Token);
            this.$store.commit('setIsAdmin', false);
            localStorage.removeItem('isAdmin');
            console.log(this.$store.state.isAdmin);
            this.$store.commit('setConnected', false);
            localStorage.removeItem('Connected');
            console.log("Connected : "+ this.$store.state.Connected);
            this.$store.commit('setLoading', false);
            console.log(this.Data.Loading);

            // Recharger la page internet
            document.location.reload();
        },
        Unsubscribe(){
            // Authentification de l'utilisateur...

            // Configuration de l'en-tete AXIOS (intégration du token)
            axios.interceptors.request.use(
                config => {
                    config.headers.authorization = `Bearer ${this.Data.Token}`;
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );
            // Suppression du compte utilisateur...
            axios.delete(this.urlAPI+"/api/users/unsubscribe/")
            .then(res =>{
                localStorage.clear();
                this.subOkay = false;
                this.subCompleted = false;
                this.$store.commit('setConnected', false);
                localStorage.removeItem('Connected');
                console.log("Connected : "+ this.$store.state.Connected);
                this.$store.commit('setEmail', '');
                localStorage.removeItem('Email');
                console.log(this.$store.state.email);
                this.$store.commit('setUserName', '');
                localStorage.removeItem('userName');
                console.log(this.$store.state.userName);
                this.$store.commit('setUserID', 0);
                localStorage.removeItem('userId');
                console.log(this.$store.state.userId);
                this.$store.commit('setToken', '');
                localStorage.removeItem('Token');
                console.log(this.$store.state.Token);
                this.$store.commit('setIsAdmin', false);
                localStorage.removeItem('isAdmin');
                console.log(this.$store.state.isAdmin);
                this.$store.commit('setLoading', false);
                console.log(this.this.Data.Loading);

                // Recharger la page internet
                this.$store.commit('setWallReload', true);
                console.log(this.Data.WallReload);
            })
            .catch(err =>{
                console.log(err);
            });
        },
        ResetStats(){
            document.getElementById('Search').value = '';
            document.getElementById('Bio').value = '';
            this.BioEdit = false;
            this.findUser = false;
            this.findUserAdmin = false;
            this.findedUser = '';
            this.subOkay = false;
            this.subFailure = false;
            this.subCompleted = false;
            this.RightAdded = false;
            this.RightRemoved = false;
        }
    },
    mounted(){
        if(this.Data.Connected == true){
            // Configuration de l'en-tete AXIOS (intégration du token)
            axios.interceptors.request.use(
                config => {
                    config.headers.authorization = `Bearer ${this.Data.Token}`;
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );

            axios.get(this.urlAPI+"/api/users/me")
            .then(res =>{
                console.log(res);
                this.bio = res.data.bio;
            })
            .catch(err =>{
                console.log(err);
            });
        }

    }
}
</script>