<template>
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
                            <label for="Semail">Email <span class ="text-danger"> * </span>:</label>
                            <input @keyup="SignInVerify" type="email" class="form-control" id="Semail" placeholder="Tom@centuryFlop.com" name="email"><br/>
                            <span class="alert alert-info" v-if="!CHKeMail"><strong><i class="fas fa-info-circle"></i></strong> {{email}}</span>
                        </div>

                        <div class="form-group">
                            <label for="Sname">Pseudonyme (entre 5 et 15 caractères) <span class ="text-danger"> * </span>:</label>
                            <input @keyup="SignInVerify" type="text" class="form-control" id="Sname" placeholder="Ex. Lewis" name="name" maxlength="15"><br/>
                            <span class="alert alert-info" v-if="!CHKuserName"><strong><i class="fas fa-info-circle"></i></strong> {{username}}</span>
                        </div>

                        <div class="form-group">
                            <label for="Spwd">Mot de Passe (au moins 8 caractères) <span class ="text-danger"> * </span>:</label>
                            <input @keyup="SignInVerify" type="password" class="form-control" id="Spwd" placeholder="Renseignez un mot de passe" name="pswd"><br/>
                            <span class="alert alert-info" v-if="!CHKpassword"><strong><i class="fas fa-info-circle"></i></strong> {{Mdp}}</span>
                        </div>

                        <div class="form-group">
                            <label for="SpwdC">Confirmez le Mot de Passe <span class ="text-danger"> * </span>:</label>
                            <input @keyup="SignInVerify" type="password" class="form-control" id="SpwdC" placeholder="Confirmez le mot de passe" name="pswdC"><br/>
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
                    <button @click="ResetStats" type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
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
            subFail: "Une erreur est survenue lors de l'inscription!"
        }
    },

    computed:{
        ...mapGetters([
            // SignIn
            'CHKeMail',
            'CHKpassword',
            'ComparePwds',
            'CHKuserName',

            // Status
            'Loading',
            'subOkay',
            'subFailure',
            'subCompleted'
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
        }
    },
}
</script>