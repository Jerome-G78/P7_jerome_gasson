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
import router from '@/router/index.js'

export default {
    name: 'Login',
    data(){
        return {
            currentRoute: window.location.pathname,
            // Récupération des variables globales dans vue X
            url:this.$store.state.url,
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
            this.$store.commit('setLoading',this.Loading = true);
            console.log("Loading : "+this.Loading);
            let Email = document.getElementById('Lemail').value;
            let Pwd = document.getElementById('Lpwd').value;

            // Initialisation de la promesse vers l'API via AXIOS
            axios.post(this.url+'/api/users/login/', {
                email: Email,
                password: Pwd
            })
            .then(res =>{
                // Récupération des information du compte de l'utilisateur
                console.log(res);
                this.subOkay = true;
                this.subCompleted = true;
                this.$store.commit('setConnected', this.Connected);
                localStorage.setItem("Connected", true);
                console.log("Connected : "+ this.$store.state.Connected);
                this.$store.commit('setEmail', res.data.email);
                console.log(this.$store.state.email);
                document.getElementById('Lemail').value = '';
                document.getElementById('Lpwd').value = '';
                this.$store.commit('setUserName', res.data.userName);
                console.log(this.$store.state.userName);
                this.$store.commit('setUserID', res.data.userId);
                console.log(this.$store.state.userId);
                this.$store.commit('setToken', res.data.token);
                console.log(this.$store.state.Token);
                this.$store.commit('setIsAdmin', res.data.isAdmin);
                console.log(this.$store.state.isAdmin);
                this.$store.commit('setLoading',this.Loading = false);
                console.log(this.Loading);

                // Completed
                console.log(this.currentRoute);
                this.subOkay = false;
                this.subCompleted = false;
                this.Connected = true;
                this.$store.commit('setConnected', this.Connected);
                console.log("Connected : "+ this.$store.state.Connected);
                // Redirrection vers la page Home...
                router.push(this.currentRoute+'Home');

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
            axios.get(this.url+'/api/messages/')
            .then(res =>{
                // Récupération des messages & likes liées
                this.Posts = res.data;
                console.log(this.Posts);
                for(let i=0; i < this.Posts.length; i++){
                    this.PostId = this.Posts[i].id;
                    // console.log(this.PostId);
                    // Récupération de la date & l'heure du Post
                    let date= this.Posts[i].createdAt.split('T')[0];
                    this.PostDate= date;
                    let time= this.Posts[i].createdAt.split('T')[1];
                    this.PostTime = time.replace('.000Z','');
                    if(res.data[i].User.username == this.$store.state.userName){
                        this.ownMessage = true;
                    }
                }
            })
            .catch(err =>{
                console.log(err);
            });

            axios.get(this.url+'/api/messages/comment?fields=id,messageId,username,comment,createdAt')
            .then(res =>{
                // Récupération des commentaires liées
                this.Comments = res.data;
                console.log(this.Comments);
                for(let i=0; i < this.Comments.length; i++){
                    this.CommentId = this.Comments[i].id;
                    // console.log(this.CommentId);
                    // Récupération de la date & l'heure du message
                    let date= this.Comments[i].createdAt.split('T')[0];
                    this.CommentDate = date;
                    let time= this.Comments[i].createdAt.split('T')[1];
                    this.CommentTime = time.replace('.000Z','');

                    if(res.data[i].username == this.$store.state.userName){
                        this.ownComment = true;
                    }
                }
            })
            .catch(err =>{
                console.log(err);
            });
        },
        ResetStats(){
            // WIP
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