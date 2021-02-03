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
                        <button @click="ResetStats" type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
        
            </div>
        </div>
    </div>
</template>

<script>
// import router from '@/router/index.js'

export default {
    name: 'Login',
    data(){
        return {
            // Récupération des variables globales dans vue X
            urlAPI:this.$store.state.urlAPI,
            userName: this.$store.state.userName,
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

    computed:{
        Data(){
            return {
                urlAPI:this.$store.state.urlAPI,
                userName: this.$store.state.userName,
                Connected: this.$store.state.Connected,
                email:this.$store.state.email,
                bio:this.$store.state.bio,
                Loading: this.$store.state.Loading,
                WallReload: this.$store.state.WallReload,
                isAdmin: this.$store.state.isAdmin,
                BioEdit: this.$store.state.BioEdit,
                Token: this.$store.state.Token,
            }
        },
    },
    // Création de la logique du module
    methods:{
        LogInVerify(){
            let Email = document.getElementById('Lemail').value;
            let Pwd = document.getElementById('Lpwd').value;
            // console.log(Email, Pwd);


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
            this.$store.commit('setLoading', true);
            console.log("Loading : "+this.Data.Loading);
            let Email = document.getElementById('Lemail').value;
            let Pwd = document.getElementById('Lpwd').value;

            // Initialisation de la promesse vers l'API via AXIOS
            axios.post(this.urlAPI+'/api/users/login/', {
                email: Email,
                password: Pwd
            })
            .then(res =>{
                // Récupération des information du compte de l'utilisateur
                // console.log(res);
                this.subOkay = true;
                this.subCompleted = true;
                this.$store.commit('setConnected', true);
                localStorage.setItem("Connected", true);
                // console.log("Connected : "+ this.$store.state.Connected);
                this.$store.commit('setEmail', res.data.email);
                localStorage.setItem("Email", this.$store.state.email);
                // console.log(this.$store.state.email);
                document.getElementById('Lemail').value = '';
                document.getElementById('Lpwd').value = '';
                this.$store.commit('setUserName', res.data.userName);
                localStorage.setItem("userName", this.$store.state.userName);
                // console.log("userName : "+this.$store.state.userName);
                this.$store.commit('setUserID', res.data.userId);
                localStorage.setItem("userId", this.$store.state.userId);
                // console.log(this.$store.state.userId);
                this.$store.commit('setToken', res.data.token);
                localStorage.setItem("Token", this.$store.state.Token);
                // console.log("User Token : "+this.$store.state.Token);
                this.$store.commit('setIsAdmin', res.data.isAdmin);
                localStorage.setItem("isAdmin", this.$store.state.isAdmin);
                // console.log("User is Admin : "+this.$store.state.isAdmin);
                this.$store.commit('setLoading',this.Loading = false);
                console.log(this.Loading);

                // Completed
                this.subOkay = false;
                this.subCompleted = false;
                this.$store.commit('setConnected', true);
                console.log("User Connected : "+ this.$store.state.Connected);
                // Masquer la fenêtre Modal
                $('#logginModal').modal('hide');

                // Recharger le mur
                this.$store.commit('setWallReload', true);
                console.log(this.Data.WallReload);

            })
            .catch(err =>{
                //WIP
                console.log(err);
                this.subFailure = true;
                // this.subFail = err.error;
                this.Loading = false;
                this.$store.commit('setLoading',this.Loading = false);
                console.log(this.Loading);
            });
        },
        ResetStats(){
            document.getElementById('Lemail').value = '';
            document.getElementById('Lpwd').value = '';
            this.subFailure = false;
            this.CHKeMail = false
            this.CHKpassword = false;
            this.subOkay = false;
            this.subCompleted = false;
            this.chkOK = false;
        }
    },
}
</script>