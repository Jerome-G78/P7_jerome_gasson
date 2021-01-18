<template>
    <header class="bg-light text-center">
        <img class="col-md-6 container" src="../assets/Banner.png">
        <!-- Navigation -->
        <nav id="NavBar" class="navbar navbar-light justify-content-end"> 				<!-- Menu de navigation -->
            <ul class="nav">
                <li @click="Load" v-if="!Connected" class="nav-item"><a class="nav-link" href="#" title="Inscription au site" data-toggle="modal" data-target="#registrationModal"> <i class="far fa-address-card"></i> Inscription </a></li>
                <li @click="Load" v-if="!Connected" class="nav-item"><a class="nav-link" href="#" title="Connexion au site" data-toggle="modal" data-target="#logginModal"> <i class="fas fa-key"></i> Connexion </a></li>
                <li @click="Load" v-if="Connected" class="nav-item"><a class="nav-link" href="#" title="Créer un Message" data-toggle="modal" data-target="#NewMessage"> <i class="far fa-newspaper"></i> Nouveau Message </a></li>
                <li @click="LoadProfil" v-if="Connected" class="nav-item"><a class="nav-link" href="#" title="Mon profil" data-toggle="modal" data-target="#profilModal"> <i class="far fa-user"></i> Mon Compte </a></li>
            </ul>
        </nav>

        <div id="welcome" v-if="Connected" class="alert alert-success">
            Bienvenue {{userName}}!
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
            // Récupération des variables dans vue X
            url:this.$store.state.url,
            Connected: this.$store.state.Connected,
            Token:this.$store.state.Token,
            
            userId:this.$store.state.userId,
            userName: this.$store.state.userName,
            email: this.$store.state.email,
            bio: this.$store.state.email,

            Loading: this.$store.state.Loading,

            // Variables locales

            // Messages
        }
    },
    // Création de la logique du module
    methods:{
        LoadProfil(){
            // Configuration de l'en-tete AXIOS (intégration du token)
                axios.interceptors.request.use(
                    config => {
                        config.headers.authorization = `Bearer ${this.Token}`;
                        return config;
                    },
                    error => {
                        return Promise.reject(error);
                    }
                );
            // Initialisation de la promesse vers l'API via AXIOS
                axios.get(this.url+'/api/users/me')
                .then(res =>{
                    console.log(res)
                    // Sucess
                    this.userId = res.data.id;
                    this.$store.commit('setUserID',this.userId);
                    console.log(this.userId);
                    this.userName = res.data.username;
                    this.$store.commit('setUserName',this.userName);
                    console.log(this.userName);
                    this.email = res.data.email;
                    this.$store.commit('setEmail',this.email);
                    console.log(this.email);
                    this.bio = res.data.bio;
                    this.$store.commit('setBio',this.bio);
                    console.log(this.bio);
                })
                .catch(err =>{
                    console.log(err);
                    this.Loading = false;
                    this.$store.commit('setLoading',this.Loading = false);
                    console.log(this.Loading);
                });

        },
        Load(){
            this.Loading = true;
        }
    }
    
}
</script>