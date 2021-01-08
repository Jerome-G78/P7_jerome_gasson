<template>
    <div class="modal" id="logginModal">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <h4 class="modal-title"><i class="fas fa-key"></i> Connexion</h4>
                    <button @click="ResetStats" type="button" title="Fermer" class="close" data-dismiss="modal">&times;</button>
                </div>

                <div class="modal-body">
                    <form action="/action_page.php">

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
    </div>
</template>

<script>
export default {
    name: 'Login',
    data(){
        return {
            // Récupération des variables globales dans vue X
            userName: this.$store.state.userName,
            Connected: this.$store.state.Connected,
            CHKeMail: this.$store.state.CHKeMail,
            CHKpassword: this.$store.state.CHKpassword,
            Loading: this.$store.state.Loading,

            // Variables locales
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
        LogInVerify(){
            let Email = document.getElementById('Lemail').value;
            let Pwd = document.getElementById('Lpwd').value;
            console.log(Email, Pwd);


            if(Email !=''){
                this.$store.commit('setCHKeMail',this.CHKeMail = true);

            } else {
                this.$store.commit('setCHKeMail',this.CHKeMail = false);
            }

            if(Pwd!='') {
                this.$store.commit('setCHKpassword', this.CHKpassword = true);
            } else {
                this.$store.commit('setCHKpassword', this.CHKpassword = false);
            }
        },
        LogIn(){
            this.$store.commit('setLoading',this.Loading = true);
            console.log(this.Loading);
            let Email = document.getElementById('Lemail').value;
            let Pwd = document.getElementById('Lpwd').value;

            // Faillure
            /*
            this.subFailure = true;
            this.$store.commit('setLoading',this.Loading = false);
            console.log(this.Loading);
            */

            // LogIn
            this.subOkay = true;

            // Completed
            this.subCompleted = true;
            this.Connected = true;
            this.$store.commit('setConnected',this.Connected = true);
            console.log(this.$store.state.Connected);
            this.$store.commit('setLoading',this.Loading = false);
            console.log(this.$store.state.Loading);
        },
        ResetStats(){
            // WIP
            document.getElementById('Lemail').value = '';
            document.getElementById('Lpwd').value = '';
            this.subFailure = false;
            this.subOkay = false;
            this.subCompleted = false;
            this.chkOK = false;
        }
    },
}
</script>