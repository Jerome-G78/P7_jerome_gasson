<template>
    <div class="modal" id="NewMessage">
        <div class="modal-dialog">
            <div class="modal-content">
        
                <div class="modal-header">
                    <h4 class="modal-title"><i class="far fa-newspaper"></i> Poster un message </h4>
                    <button @click="ResetStats" type="button" title="Fermer" class="close" data-dismiss="modal">&times;</button>
                </div>
        
                <div class="modal-body">

                    <div class="form-group">
                        <label for="title">Titre <span class ="text-danger"> * </span>:</label>
                        <input @keyup="MsgVerify" type="text" class="form-control" id="title" placeholder="Ajoutez un Titre" name="title">
                    </div>

                    <div class="form-group">
                        <label for="Content"> Contenue du message <span class ="text-danger"> * </span> :</label>
                        <textarea @keyup="MsgVerify" class="form-control" id="Content" placeholder="Contenue de votre message" rows="3"></textarea>
                    </div>

                    <p class ="text-danger"><small><i>* : Champs obligatoires</i></small></p>

                    <div class="form-group">
                        <input @click="JoinPict" id="Join" type="checkbox"> joindre une image <br/>
                        <input @click="SetPict" v-if="uploadFile" id="uploadFile" type="file">
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

                <div class="modal-footer">
                    <button @click="Post" v-if="chkCompleted" type="button" title="Envoyer" class="btn btn-primary">Envoyer...</button>
                </div>
        
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NewMessage',
    data(){
        return {
            // Récupération des variables globales dans vue X
            userName: this.$store.state.userName,
            Loading: this.$store.state.Loading,
            Ntitle:this.$store.state.Ntitle,
            Ncontent:this.$store.state.Ncontent,
            Nattachment: this.$store.state.Nattachment,
            Npicture:this.$store.state.Npicture,
            Token: this.$store.state.Token,

            // Variables locales
            chkCompleted: false,
            subOkay: false,
            subFailure: false,
            subCompleted: false,
            uploadFile: false,

            // Messages
            subOK: "Message envoyé!",
            subFail: "Une erreur est survenue!"
        }
    },
    // Création de la logique du module
    methods:{
        MsgVerify(){
            let CHKtitle = document.getElementById("title").value;
            let CHKContent = document.getElementById("Content").value;
            console.log(CHKtitle, CHKContent);

            if(CHKtitle !=''){
                this.$store.commit('setNtitle', CHKtitle);
            } else {
                this.$store.commit('setNtitle', '');
            }

            if(CHKContent !=''){
                this.$store.commit('setNcontent', CHKContent);
            } else {
                this.$store.commit('setNcontent', '');
            }

            if(CHKtitle !='' && CHKContent !=''){
                this.chkCompleted = true;
            } else {
                this.chkCompleted = false;
            }

        },

        JoinPict(){
            if(this.uploadFile){
                this.uploadFile = false;
                this.Nattachment = 0;
                this.$store.commit('setNattachment', 0); // Global ?!
                console.log(this.Nattachment);

            } else {
                this.uploadFile = true;
                this.Nattachment = 1;
                this.$store.commit('setNattachment', 1); // Global ?!
                console.log(this.Nattachment);
            }
        },

        SetPict(){
            // WIP
        },

        Post(){
            // WIP
            console.log(this.Ntitle, this.Ncontent, this.uploadFile, this.Nattachment);

            if(this.Nattachment == 1 && this.Npicture != ''){
                // Configuration de l'en-tete AXIOS (intégration du token)
                axios.interceptors.request.use(
                    config => {
                        config.headers.authorization = `Bearer ${this.Token}`;
                        // config.headers.Content-Type = `multipart/form-data`;
                        return config;
                    },
                    error => {
                        return Promise.reject(error);
                    }
                );

                // Initialisation de la promesse vers l'API via AXIOS
                axios.post('http://localhost:3000/api/messages/new/', {
                    title: document.getElementById("title").value,
                    content: document.getElementById("Content").value,
                    attachment: 1,
                    image: ''
                })
                .then(res =>{
                    // Sucess
                    this.subOkay = true;
                    this.chkCompleted = false;

                    // Completed
                    document.getElementById("Join").checked = false;
                    document.getElementById("title").value = '';
                    document.getElementById("Content").value ='';
                    this.subCompleted = true;

                })
                .catch(err =>{
                    console.log(err);
                    this.subFailure = true;
                    // this.subFail = err.error;
                    this.Loading = false;
                    this.$store.commit('setLoading',this.Loading = false);
                    console.log(this.Loading);
                });

                // Rechargement du mur de messages
                // Initialisation de la promesse vers l'API via AXIOS
                axios.get('http://localhost:3000/api/messages/')
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

                axios.get('http://localhost:3000/api/messages/comment?fields=id,messageId,username,comment,createdAt')
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

                        if(this.Posts == 0){
                            this.$store.commit('setNoData', true);
                        }
                    }
                })
                .catch(err =>{
                    console.log(err);
                });

            } else {
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
                axios.post('http://localhost:3000/api/messages/new/', {
                    title: document.getElementById("title").value,
                    content: document.getElementById("Content").value
                })
                .then(res =>{
                    // Sucess
                    this.subOkay = true;
                    this.chkCompleted = false;

                    // Completed
                    document.getElementById("Join").checked = false;
                    document.getElementById("title").value = '';
                    document.getElementById("Content").value ='';
                    this.subCompleted = true;

                })
                .catch(err =>{
                    console.log(err);
                    this.subFailure = true;
                    // this.subFail = err.error;
                    this.Loading = false;
                    this.$store.commit('setLoading',this.Loading = false);
                    console.log(this.Loading);
                });

            }
        },
        ResetStats(){
            // WIP
            document.getElementById('title').value = '';
            document.getElementById('Content').value = '';
            document.getElementById("Join").checked = false;
            this.Nattachment = 0,
            this.chkCompleted = false;
            this.subFailure = false;
            this.uploadFile = false
            this.subOkay = false;
            this.subCompleted = false;
        }
    },
}
</script>