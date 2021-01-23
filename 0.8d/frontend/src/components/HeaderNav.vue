<template>
    <header class="bg-light text-center">
        <img class="col-md-6 container" src="../assets/Banner.png">
        <!-- Navigation -->
        <nav id="NavBar" class="navbar navbar-light justify-content-end"> 				<!-- Menu de navigation -->
            <ul class="nav">
                <li @click="Load" v-if="!Data.Connected" class="nav-item"><a class="nav-link" href="#" title="Inscription au site" data-toggle="modal" data-target="#registrationModal"> <i class="far fa-address-card"></i> Inscription </a></li>
                <li @click="Load" v-if="!Data.Connected" class="nav-item"><a class="nav-link" href="#" title="Connexion au site" data-toggle="modal" data-target="#logginModal"> <i class="fas fa-key"></i> Connexion </a></li>
                <li @click="Load" v-if="Data.Connected" class="nav-item"><a class="nav-link" href="#" title="Créer un Message" data-toggle="modal" data-target="#NewMessage"> <i class="far fa-newspaper"></i> Nouveau Message </a></li>
                <li @click="LoadProfil" v-if="Data.Connected" class="nav-item"><a class="nav-link" href="#" title="Mon profil" data-toggle="modal" data-target="#profilModal"> <i class="far fa-user"></i> Mon Compte </a></li>
            </ul>
        </nav>

        <div id="welcome" v-if="Data.Connected" class="alert alert-success">
            Bienvenue {{Data.userName}}!
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </header>
</template>

<script>
export default {
    name: 'HeaderNav',
    // el:'#NavBar',
    data(){
        return {
            // Variables locales
            urlAPI:this.$store.state.urlAPI,
            Connected:this.$store.state.Connected,

            // Messages
        }
    },

    computed:{
        Data(){
            return {
                urlAPI:this.$store.state.urlAPI,
                Loading: this.$store.state.Loading,

                Connected: this.$store.state.Connected,
                userName: this.$store.state.userName,
                userId:this.$store.state.userId,
                email:this.$store.state.email,
                bio:this.$store.state.bio,
                isAdmin: this.$store.state.isAdmin,
                Token: this.$store.state.Token,
            }
        }
    },

    // Création de la logique du module
    methods:{
        LoadProfil(){
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
                axios.get(this.urlAPI+'/api/users/me')
                .then(res =>{
                    console.log(res)
                    // Sucess
                    this.$store.commit('setUserID',res.data.id);
                    console.log(this.Data.userId);
                    this.$store.commit('setUserName',res.data.username);
                    console.log(this.Data.userName);
                    this.$store.commit('setEmail',res.data.email);
                    console.log(this.Data.email);
                    this.$store.commit('setBio',res.data.bio);
                    console.log(this.Data.bio);
                })
                .catch(err =>{
                    console.log(err);
                    this.$store.commit('setLoading', false);
                    console.log(this.Data.Loading);
                });

        },
        Load(){
            // this.$store.commit('setLoading', true);
        }
    }
    
}
</script>