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
                isAdmin: this.$store.state.isAdmin,
                BioEdit: this.$store.state.BioEdit,
                Token: this.$store.state.Token,
            }
        },

        ReLoadWall(){
            this.$store.commit('setLoading',true);
            console.log(this.$store.state.Loading);
            // Lors du chargement du composant, appeler les messages dans la BDD
            // Initialisation de la promesse vers l'API via AXIOS
            axios.get(this.urlAPI+'/api/messages/?order=id:ASC')
            .then(res =>{
                // Récupération des messages & likes liées
                this.Posts = res.data;
                console.log(this.Posts);
                for(let i=0; i < this.Posts.length; i++){
                    this.PostId = this.Posts[i].id;
                    this.LikeCounter = this.Posts[i].likes;
                    // Récupération de la date & l'heure du Post
                    let date= this.Posts[i].createdAt.split('T')[0];
                    this.$store.commit('setPostDate',date);
                    console.log(date);
                    let time= this.Posts[i].createdAt.split('T')[1];
                    let PTime = time.replace('.000Z','');
                    this.$store.commit('setPostTime',PTime);
                    console.log(PTime);
                    if(res.data[i].User.username == this.$store.state.userName){
                        this.ownMessage = true;
                    }

                    if(this.Posts.length == 0){
                        this.$store.commit('setNoData', true);
                    }
                }

                this.$store.commit('setLoading',false);
                console.log(this.Data.Loading);
                
            })
            .catch(err =>{
                console.log(err);
                this.$store.commit('setLoading',false);
                console.log(this.Data.Loading);
            });

            axios.get(this.urlAPI+'/api/messages/comment?fields=id,messageId,username,comment,createdAt')
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

                    this.$store.commit('setLoading',false);
                    console.log(this.Data.Loading);

                })
                .catch(err =>{
                    console.log(err);
                    this.$store.commit('setLoading',false);
                    console.log(this.Data.Loading);
                });
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
                console.log(res);
                this.subOkay = true;
                this.subCompleted = true;
                this.$store.commit('setConnected', true);
                localStorage.setItem("Connected", true);
                console.log("Connected : "+ this.$store.state.Connected);
                this.$store.commit('setEmail', res.data.email);
                localStorage.setItem("Email", this.$store.state.email);
                console.log(this.$store.state.email);
                document.getElementById('Lemail').value = '';
                document.getElementById('Lpwd').value = '';
                this.$store.commit('setUserName', res.data.userName);
                localStorage.setItem("userName", this.$store.state.userName);
                console.log("userName : "+this.$store.state.userName);
                this.$store.commit('setUserID', res.data.userId);
                localStorage.setItem("userId", this.$store.state.userId);
                console.log(this.$store.state.userId);
                this.$store.commit('setToken', res.data.token);
                localStorage.setItem("Token", this.$store.state.Token);
                console.log("User Token : "+this.$store.state.Token);
                this.$store.commit('setIsAdmin', res.data.isAdmin);
                localStorage.setItem("isAdmin", this.$store.state.isAdmin);
                console.log("User is Admin : "+this.$store.state.isAdmin);
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
                this.ReLoadWall;

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
            axios.get(this.urlAPI+'/api/messages/')
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

            axios.get(this.urlAPI+'/api/messages/comment?fields=id,messageId,username,comment,createdAt')
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