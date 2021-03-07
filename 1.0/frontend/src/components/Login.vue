<template>
    <div class="modal" id="logginModal">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <h4 class="modal-title"><i class="fas fa-key"></i> Connexion</h4>
                    <button @click="ResetStats" type="button" title="Fermer" class="close" data-dismiss="modal">&times;</button>
                </div>

                <div class="modal-body">
                    <form class="labelsAlign" action="/action_page.php">

                        <div class="form-group">
                            <label for="Lemail">Email <span class ="text-danger"> * </span>:</label>
                            <input @keyup="LogInVerify" type="email" class="form-control" id="Lemail" placeholder="Entrez une adresse e-mail" name="email">
                        </div>

                        <div class="form-group">
                            <label for="Lpwd">Mot de Passe <span class ="text-danger"> * </span>:</label>
                            <input @keyup="LogInVerify" type="password" class="form-control" id="Lpwd" placeholder="Entrez un mot de passe" name="pswd">
                            <p class ="text-danger"><small><i>* : Champs obligatoires</i></small></p>
                        </div>

                    </form>
                </div>
        
                <div class="modal-footer">
                    <button @click="LogIn" v-if="CHKeMail && CHKpassword && !subOkay && !subFailure" type="submit" title="M'identifier" class="btn btn-primary">M'identifer...</button>
                </div>
                <div v-if="subOkay" class="alert alert-success">
                    {{subOK}}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div v-if="subFailure" class="alert text-align-center alert-danger">
                    {{MSGfaillure}}
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
        name: 'Login',
        data(){
            return {
                // Messages
                subOK: "Connexion réussi.",
            }
        },

        computed:{
            // Récupération de l'état des "Getters" pour actualiser la page
            ...mapGetters([
                // Login
                'CHKeMail',
                'CHKpassword',
                'Connected',

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
            LogInVerify(){
                this.$store.dispatch("LogInVerify");
            },
            LogIn(){
                this.$store.dispatch("LogIn");
            },
            ResetStats(){
                this.$store.dispatch("ResetLoginStats");
            }
        },
    }
</script>