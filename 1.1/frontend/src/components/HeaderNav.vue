<template>
    <header class="bg-light text-center">
        <img class="col-md-6 container" src="../assets/Banner.png">
        <!-- Navigation -->
        <nav id="NavBar" class="navbar navbar-light justify-content-end"> 				<!-- Menu de navigation -->
            <ul class="nav">
                <li @click="ResetStats" v-if="!Connected" class="nav-item"><a class="nav-link" href="#" title="Inscription au site" data-toggle="modal" data-target="#registrationModal"> <i class="far fa-address-card"></i> Inscription </a></li>
                <li @click="LogInVerify" v-if="!Connected" class="nav-item"><a class="nav-link" href="#" title="Connexion au site" data-toggle="modal" data-target="#logginModal"> <i class="fas fa-key"></i> Connexion </a></li>
                <li v-if="Connected" class="nav-item"><a class="nav-link" href="#" title="Créer un Message" data-toggle="modal" data-target="#NewMessage"> <i class="far fa-newspaper"></i> Nouveau Message </a></li>
                <li @click="LoadProfil" v-if="Connected" class="nav-item"><a class="nav-link" href="#" title="Mon profil" data-toggle="modal" data-target="#profilModal"> <i class="far fa-user"></i> Mon Compte </a></li>
            </ul>
        </nav>

        <div id="welcome" v-if="Connected" class="alert alert-success">
            Bienvenue {{userName}}!
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div id="Warning" v-if="TokenExpired" class="alert alert-danger">
            Bonjour {{userName}}, votre session a expirer, veuillez vous reconnecter.
        </div>
    </header>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'HeaderNav',

        computed:{
            // Récupération de l'état des "Getters" pour actualiser la page (render)
            ...mapGetters([
                'userName',
                'Connected',
                'TokenExpired',
            ]),
        },
        // Création de la logique du module
        methods:{

            ResetStats(){
                this.$store.dispatch("ResetSignInStats");
            },

            LogInVerify(){
                this.$store.dispatch("LogInVerify");
            },

            LoadProfil(){
                this.$store.dispatch("GetProfil");
            },
        }
    }
</script>

<style scoped>
    /* Ajustement du Design Mobile 320px */
    @media screen and (min-width:320px) and (max-width:359px) and (orientation: portrait)       /* 20em - Mobiles           */
    {
        .nav-link{
            font-size: 0.924em;
        }
    }
</style>