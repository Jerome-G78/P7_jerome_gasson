<template>
    <div>
        <div class="modal" id="registrationModal">
            <div class="modal-dialog">
                <div class="modal-content">
            
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title"> <i class="far fa-address-card"></i> Formulaire d'inscription</h4>
                        <button @click="ResetStats" type="button" title="Fermer" class="close" data-dismiss="modal">&times;</button>
                    </div>
            
                    <!-- Modal body -->
                    <div class="modal-body">
                        <form class="labelsAlign" action="/action_page.php">
                            <div class="form-group">
                                <label for="Sname">Pseudonyme (entre 5 et 15 caractères) <span class ="text-danger"> * </span>:</label>
                                <input @keyup="SignInVerify" @change="SignInVerify" type="text" class="form-control" id="Sname" placeholder="Ex. Lewis" name="name" maxlength="15"><br/>
                                <span class="alert alert-info" v-if="!CHKuserName"><strong><i class="fas fa-info-circle"></i></strong> {{username}}</span>
                            </div>

                            <div class="form-group">
                                <label for="Semail">Email <span class ="text-danger"> * </span>:</label>
                                <input @keyup="SignInVerify" @change="SignInVerify" type="email" class="form-control" id="Semail" placeholder="Tom@centuryFlop.com" name="email"><br/>
                                <span class="alert alert-info" v-if="!CHKeMail"><strong><i class="fas fa-info-circle"></i></strong> {{email}}</span>
                            </div>

                            <div class="form-group">
                                <label for="Spwd">Mot de Passe (au moins 8 caractères) <span class ="text-danger"> * </span>:</label>
                                <input @keyup="SignInVerify" @change="SignInVerify" type="password" class="form-control" id="Spwd" placeholder="Renseignez un mot de passe" name="pswd"><br/>
                                <span class="alert alert-info" v-if="!CHKpassword"><strong><i class="fas fa-info-circle"></i></strong> {{Mdp}}</span>
                            </div>

                            <div class="form-group">
                                <label for="SpwdC">Confirmez le Mot de Passe <span class ="text-danger"> * </span>:</label>
                                <input @keyup="SignInVerify" @change="SignInVerify" type="password" class="form-control" id="SpwdC" placeholder="Confirmez le mot de passe" name="pswdC"><br/>
                                <span class="alert alert-warning" v-if="ComparePwds"><strong><i class="fas fa-info-circle"></i></strong> {{MDPFail}}</span>
                            </div>
                            
                            <div class="form-group">
                                <label for="Sbio">Ma biographie:</label>
                                <textarea class="form-control" id="SBio" placeholder="Racontez-nous! Qui êtes vous?" rows="3"></textarea>
                                <p class ="text-danger"><small><i>* : Champs obligatoires</i></small></p>
                            </div>

                        </form>
                    </div>
            
                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button id="SignIn" @click="Subscribe" v-if="!subOkay && !subFailure" type="submit" title="M'inscrire" class="btn btn-primary" disabled>M'inscrire...</button>
                    </div>
                    <div v-if="subOkay" class="alert alert-success">
                        {{subOK}}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div v-if="subFailure" class="alert alert-danger">
                        {{MSGfaillure}}
                        <button @click="ResetStatsError" type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
            
                </div>
            </div>
        </div>
        <div class="modal" id="Registred">
            <div class="modal-dialog">
                <div class="modal-content">
            
                    <div class="modal-header">
                        <h4 class="modal-title"><i class="fas fa-info-circle"></i> Inscription </h4>
                        <button @click="ResetStats" type="button" title="Fermer" class="close" data-dismiss="modal">&times;</button>
                    </div>
            
                    <div class="labelsAlign modal-body">
                        <p class="alert alert-success"> 
                            <strong> Confirmation : </strong> Votre compte a bien été créé <br/>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'SignIn',
        data(){
            return {
                // Messages
                email: "Veuillez renseigner un e-mail",
                username: "Veuillez renseigner un Pseudonyme",
                Mdp: "Requis : 1 Majuscule, 1 Minuscule, 1 Nombre",
                MDPFail: "Les mots de passes ne sont pas identiques",
                subOK: "Votre inscription a bien été prise en compte",
            }
        },

        computed:{
            // Récupération de l'état des "Getters" pour actualiser la page
            ...mapGetters([
                // SignIn
                'CHKeMail',
                'CHKpassword',
                'ComparePwds',
                'CHKuserName',

                // Status
                'Loading',
                'subOkay',
                'subCompleted',

                'subFailure',
                'MSGfaillure'
            ]),
        },
        // Création de la logique du module
        methods:{
            SignInVerify(){
                this.$store.dispatch("SignInVerify");
            },
            Subscribe(){
                this.$store.dispatch("Subscribe");
            },
            ResetStats(){
                this.$store.dispatch("ResetSignInStats");
            },
            ResetStatsError(){
                this.$store.dispatch("ResetSignInStatsFail");
            }
        },
    }
</script>

<style scoped>
    /* Ajustement du Design Mobile 320px à 574px */
    @media screen and (min-width:360px) and (max-width:574px) and (orientation: portrait)       /* 20em - Mobiles           */
    {
        h4
        {
            font-size : 1.352em;
        }

        label
        {
            font-size : 0.991em;
        }
        .alert 
        {
            font-size : 0.745em;
        }
    }
    @media screen and (min-width:320px) and (max-width:359px) and (orientation: portrait)       /* 20em - Mobiles           */
    {
        h4
        {
            font-size : 1.16em;
        }

        label
        {
            font-size : 0.863em;
        }
        .alert 
        {
            font-size : 0.591em;
        }
    }
</style>