<template>
    <div class="modal" id="ModerateModal">
        <div class="modal-dialog">
            <div class="modal-content">
        
                <div class="modal-header">
                    <h4 class="modal-title"><i class="fas fa-exclamation-circle"></i> Modération de contenue</h4>
                    <button @click="ResetStats" type="button" title="Fermer" class="close" data-dismiss="modal">&times;</button>
                </div>
        
                <div class="modal-body">
                    <p> Work In Progress ...</p>
                    <div class="form-group">
                        <label for="TitleMod">Titre :</label>
                        <input @keyup="ModerateVerify" type="text" class="form-control" id="TitleMod" placeholder="Champ de modération" name="TitleMod" v-model="Data.EditTitle">
                    </div>
                    <div class="form-group">
                        <label for="ContentMod">Contenue :</label>
                        <textarea @keyup="ModerateVerify" class="form-control" id="ContentMod" placeholder="Champ de modération" rows="3" v-model="Data.EditContent"></textarea>
                    </div>
                    <div v-if="subOkay && subCompleted" class="alert alert-info">
                        <strong><i class="fas fa-info-circle"></i></strong> {{OnSucess}}.
                        <button @click="ResetStats" type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div v-if="!subOkay && subCompleted" class="alert alert-danger">
                        <strong><i class="fas fa-info-circle"></i></strong> {{OnError}}.
                        <button @click="ResetStats" type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="modal-footer">
                    <button @click="Submit" v-if="chkOK" type="button" title="Modérer" class="btn btn-warning">Modérer</button>
                    <button @click="ResetStats" type="button" title="Annuler" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                </div>
        
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WallModeratePost',
    data(){
        return {
            urlAPI: this.$store.state.urlAPI,
            isAdmin: this.$store.state.isAdmin,
            Connected: this.$store.state.Connected,
            PostId: this.$store.state.CurrentPostId,

            EditTitle: this.$store.state.Etitle,
            EditContent: this.$store.state.Econtent,

            // Variables locales
            CHKtitle: false,
            CHKcontent: false,
            chkOK: false,
            
            subOkay: false,
            subFailure: false,
            subCompleted: false,

            // Messages
            OnError:'Une erreur est survenue',
            OnSucess:'Le message à été modéré',
        }
    },

    computed:{
        Data(){
            return {
            urlAPI:this.$store.state.urlAPI,
            userName: this.$store.state.userName,
            Connected: this.$store.state.Connected,
            Loading: this.$store.state.Loading,
            isAdmin: this.$store.state.isAdmin,
            Token: this.$store.state.Token,

            EditTitle: this.$store.state.Etitle,
            EditContent: this.$store.state.Econtent,
            PostId:this.$store.state.CurrentPostId,
            }
        },

        ReLoadWall(){
        this.$store.commit('setLoading',true);
        console.log(this.Data.Loading);
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
        ModerateVerify(){
            let Title = document.getElementById('TitleMod').value;
            let Content = document.getElementById('ContentMod').value;
            console.log(Title, Content);

            if(Title !=''){
                this.CHKtitle = true;
            } else {
                this.CHKtitle = false;
            }
            if(Content !=''){
                this.CHKcontent = true;
            } else {
                this.CHKcontent = false;
            }
            if(this.CHKtitle && this.CHKcontent){
                this.chkOK = true;
            } else {
                this.chkOK = false;
            }
        },
        Submit(){
            let TitleMod = document.getElementById('TitleMod').value;
            let ContentMod = document.getElementById('ContentMod').value;
            console.log(this.PostId);

            // Configuration de l'en-tete AXIOS (intégration du token)
            axios.interceptors.request.use(
                config => {
                    config.headers.authorization = `Bearer ${this.Data.Token}`;
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );

            // Initialisation de la promesse vers l'API via AXIOS
            if(this.Data.isAdmin){
                axios.put(this.urlAPI+'/api/messages/'+this.Data.PostId+'/moderate',{
                title: TitleMod,
                content : ContentMod
                })
                .then(res =>{
                    // Envoie des données en base
                    console.log(res);

                    //SubOkay
                    this.subOkay = true;
                    this.subCompleted = true;
                    this.$store.commit('setLoading', false);
                    console.log(this.$store.state.Loading);

                    // Sucess
                    this.subOkay = true;
                    this.subCompleted = true;
                    this.chkOK = false;

                    // Completed
                    this.subCompleted = true;
                    this.$store.commit('setLoading',false);

                    $('#ModerateModal').modal('hide');
                })
                .catch(err =>{
                    //WIP
                    console.log(err);
                    this.subFailure = true;
                    this.subCompleted = true;
                    this.Loading = false;
                    this.$store.commit('setLoading',false);
                    console.log(this.Loading);
                });

            } else {
                this.subFailure = true;
                this.subCompleted = true;
                this.Loading = false;
                this.$store.commit('setLoading',false);
                console.log(this.Loading);
            }
            
        },

        ResetStats(){
            //WIP
            this.EditTitle = this.$store.state.Etitle;
            console.log(this.EditTitle);
            this.EditContent = this.$store.state.Econtent;
            console.log(this.EditContent);
            this.subFailure = false;
            this.subOkay = false;
            this.subCompleted = false;
            this.chkOK = false;
            return this.$store.state.Etitle, this.$store.state.Econtent;
        }
    },

    mounted(){ 
        //
    }
}
</script>