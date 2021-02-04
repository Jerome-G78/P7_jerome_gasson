<template>
    <div>
        <div v-if="Data.Loading" class="spinner-border text-primary text-center" id="WallLoad">
            <p>Chargement des messages... </p>
        </div>
        <div v-if="!Data.Loading && Data.Connected && Data.NoData" class="spinner-border text-primary text-center" id="WallLoad">
            <p>Aucuns messages a charger ... a vous de jouer! :D </p>
        </div>
        <!--POST START-->
        <div v-for="Post in Posts" :key="Post.id">
            <br/>
            <div class="row justify-content-center">
                <div class="Mbody col-10 col-sm-10 col-md-11 bg-info text-white media border p-4 m-0">
                    <div :id="Post.id" class="media-body">
                        <h4 class="UserBackground">{{Post.User.username}} <span class="inf"><span :key="'DT'+Post.id"><i>(Edité le {{Data.PostDate}} à {{Data.PostTime}})</i></span></span></h4>
                        <h5 class="TitleBackground"><i>{{Post.title}}</i></h5>
                        <hr/>
                        <img class="justify-content-center rounded img-fluid d-flex" :src="Post.attachment"/>
                        <p class="Content">{{Post.content}}</p><br/>
                        <hr v-if="Data.Connected">
                        <div id="Buttons" @mouseover.stop="SetPostId" class="row justify-content-center" :key="'Buttons'+Post.id">
                            <button @click.stop="Like" v-if="Data.Connected" type="button" title="J'aime" class="btn btn-primary text-center"><i class="far fa-thumbs-up"></i> {{Post.likes}}</button>
                            <button @click="EditPost" v-if="Data.Connected && Data.ownMessage" type="button" title="Editer" class="btn btn-primary text-center" data-toggle="modal" data-target="#EditModal"><i class="fas fa-pen"></i></button>
                            <button @click="EditPost" v-if="Data.Connected && Data.isAdmin" type="button" title="Modérer" class="btn btn-danger text-center" data-toggle="modal" data-target="#ModerateModal"><i class="fas fa-exclamation-circle"></i></button>
                            <button @click.stop="DeletePost" v-if="Data.Connected && (Data.isAdmin || Data.ownMessage)" type="button" title="Supprimer" class="btn btn-danger text-center"><i class="far fa-trash-alt"></i></button>
                        </div>
                        <hr v-if="Data.Connected"/>
                        <div v-if="Data.Connected" class="row justify-content-start">
                            <div v-if="Data.Connected" class="labelsAlign col-9 form-group">
                                <label for="comment">Commentaire</label>
                                <input :id="CPId" @keyup="CommentVerify" type="text" class="form-control" placeholder="Commentez!" name="comment" maxlength="255"/>
                            </div>
                            <div v-if="Data.Connected" class="col-3 align-items-center">
                                <button @click="Submit" v-if="ValueComment" type="button" title="Envoyer" class="btn btn-primary text-center"><i class="far fa-paper-plane"></i></button>
                            </div>
                        </div>
                        <hr>
                        <div v-for="Comment in Comments" :key="Comment.id" :id="Data.CommentId" class="row justify-content-end">
                            <div v-if="Data.Connected && (Data.ownComment || Data.isAdmin)" class="col-9">
                                <p class="Comment">
                                    <span class="CommentBackground">{{Comment.username}}<span class="inf"><i> (Le {{Data.CommentDate}} à {{Data.CommentTime}})</i></span></span><br/>
                                    {{Comment.comment}}
                                </p>
                            </div>
                            <div v-if="!Data.Connected || (!Data.ownComment && !Data.isAdmin)" class="col-12">
                                <p class="Comment">
                                    <span class="CommentBackground">{{Comment.username}}<span class="inf"><i> (Le {{Data.CommentDate}} à {{Data.CommentTime}})</i></span></span><br/>
                                    {{Comment.comment}}
                                </p>
                            </div>
                            <div @mouseover="SetCommentId" id="CommentDeleteButton" class="col-3">
                                <button @click="DeleteComment" v-if="Data.Connected && (Data.isAdmin || Data.ownComment)" type="button" title="Supprimer" class="btn btn-danger text-center"><i class="far fa-trash-alt"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
        </div>
        <!-- POST END -->
    </div>
</template>

<script>

export default {
    name: 'Wall',
    data(){
        return {
            // Variables Local
            urlAPI: this.$store.state.urlAPI,
            // NoData:true,

            Posts: [],
            PostId:0,
            CPId:'',
            PostDate:'',
            PostTime:'',

            Comments:[],
            CommentId:'',
            CommentDate:'',
            CommentTime:'',
            
            CHKcomment : false,
            ValueComment: false,

            ownMessage: false,
            ownComment: false,
            Liked: false,

            LikeCounter:this.$store.state.LikeCounter,

        }
    },
    
    
    computed:{
        Data(){
            return {
                userName: this.$store.state.userName,
                isAdmin: this.$store.state.isAdmin,
                Token: this.$store.state.Token,
                ownMessage:this.$store.state.ownMessage,
                ownComment:this.$store.state.ownComment,

                Connected: this.$store.state.Connected,
                Loading: this.$store.state.Loading,
                WallReload: this.$store.state.WallReload,
                NoData:this.$store.state.NoData,

                PostDate:this.$store.state.PostDate,
                PostTime:this.$store.state.PostTime,

                CommentDate:this.$store.state.CommentDate,
                CommentTime:this.$store.state.CommentTime,

                CurrentCommentId:this.$store.state.CurrentCommentId,
                CommentId:this.$store.state.CommentId,
            }
        },

        GetEtitle(){
            this.EditTitle = this.$store.state.Etitle;
            return this.$store.state.Etitle;
        },

        GetEContent(){
            this.EditContent = this.$store.state.Econtent;
            return this.$store.state.Econtent;
        },
    },
    
    // Création de la logique du module
    methods:{
        CommentVerify(){
            let Comment = document.getElementById('CP'+this.PostId).value;

            if(Comment !=''){
                this.ValueComment = true;
            } else {
                this.ValueComment = false;
            }
        },
        Submit(){
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

            let comment = document.getElementById('CP'+this.PostId).value;
            console.log(comment);
            axios.post(this.urlAPI+"/api/messages/comment/"+this.PostId+"/new/",{
                comment : comment
            })
            .then(res =>{
                // Sucess
                document.getElementById('CP'+this.PostId).value = '';
                this.ValueComment = false;
                this.subOkay = true;
                this.subCompleted = true;
                this.chkOK = false;

                // Rechargement du mur après opération
                this.$store.commit('setWallReload', true);
                console.log(this.Data.WallReload);

            })
            .catch(err =>{
                // Faillure
                this.subFailure = true;
                this.subCompleted = true;
                this.chkOK = false;
            });
        },
        SetCommentId(){
            // Récupérer le PostID, pour l'éditer, le supprimer ou le modérer.
            let OverId = document.getElementById("CommentDeleteButton").parentNode.id;
            let CurrentCID = this.Data.CurrentCommentId = OverId.split('C')[1];
            console.log("Mouse Over! - CommentID :" + CurrentCID);
            this.$store.commit('setCurrentCommentId',CurrentCID);
        },
        DeleteComment(){
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
                if(this.Data.isAdmin){
                    axios.delete(this.urlAPI+"/api/messages/comment/"+this.PostId+"/"+this.Data.CurrentCommentId+"/moderate/")
                    .then(res=>{
                        console.log(res);
                        console.log('commentaire supprimé');
                        // Rechargement du mur après opération
                        this.$store.commit('setWallReload', true);
                        console.log(this.Data.WallReload);
                    })
                    .catch(err =>{
                        console.log(err);
                    });

                } else {
                    axios.delete(this.urlAPI+"/api/messages/comment/"+this.PostId+"/"+this.Data.CurrentCommentId)
                    .then(res=>{
                        console.log(res);
                        console.log('commentaire supprimé');
                        // Rechargement du mur après opération
                        this.$store.commit('setWallReload', true);
                        console.log(this.Data.WallReload);

                    })
                    .catch(err =>{
                        console.log(err);
                    });
                }
        },
        SetPostId(){
            // Récupérer le PostID, pour l'éditer, le supprimer ou le modérer.
            let OverId = document.getElementById("Buttons").parentNode.id;
            this.PostId = OverId;
            this.$store.commit('setCurrentPostId',this.PostId);
            console.log("Mouse Over! - PostID : " + this.PostId);
        },
        Like(){
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

            axios.post(this.urlAPI+"/api/messages/"+this.PostId+"/vote/like")
            .then(res =>{
                // Like le post
                console.log('Liked');
                console.log(res);
                this.Liked = true;
                this.LikeCounter +=1;
                this.$store.commit('setLikes', this.LikeCounter);
                console.log(this.LikeCounter);

                // Rechargement du mur après opération
                this.$store.commit('setWallReload', true);
                console.log(this.Data.WallReload);
            })
            .catch(err =>{
                axios.post(this.urlAPI+"/api/messages/"+this.PostId+"/vote/dislike")
                .then(res=>{
                    // Dislike le post
                    console.log('Disliked');
                    console.log(res);
                    this.Liked = false;
                    this.LikeCounter -=1;
                    this.$store.commit('setLikes', this.LikeCounter);
                    console.log(this.LikeCounter);

                    // Rechargement du mur après opération
                    this.$store.commit('setWallReload', true);
                    console.log(this.Data.WallReload);
                })
            });
            
        },
        DeletePost(){
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
            if(this.Data.isAdmin){
                // Initialisation de la promesse vers l'API via AXIOS
                axios.delete(this.urlAPI+'/api/messages/'+this.PostId+'/moderate')
                .then(res =>{
                    console.log(res);

                    // Rechargement du mur après opération
                    this.$store.commit('setWallReload', true);
                    console.log(this.Data.WallReload);
                })
                .catch(err =>{
                    console.log(err);
                });
                console.log('Post Deleted');
            } else {
                // Initialisation de la promesse vers l'API via AXIOS
                axios.delete(this.urlAPI+'/api/messages/'+this.PostId)
                .then(res =>{
                    console.log(res);
                    // Rechargement du mur après opération
                    this.$store.commit('setWallReload', true);
                    console.log(this.Data.WallReload);
                })
                .catch(err =>{
                    console.log(err);
                });
                console.log('Post Deleted');
            }
        },
        EditPost(){
            let Counter = 0;
            // Chargement du post (Axios)
            axios.get(this.urlAPI+"/api/messages/?fields=id,title,content")
            .then(res =>{
                console.log(res);
                // console.log(res.data.length);
                console.log(this.PostId);
                Counter = res.data.length;
                for(let i=0; i < Counter; i++){
                    // console.log('B-For');
                    if(res.data[i].id == this.PostId){
                        this.$store.commit('setCurrentEtitle',res.data[i].title);
                        console.log(this.$store.state.Etitle);
                        this.$store.commit('setCurrentEcontent',res.data[i].content);
                        console.log(this.$store.state.Econtent);
                    }
                }
            })
            .catch(err =>{
                console.log(err);
            });
        },
        WallReload(){
            this.$store.commit('setWallReload', true);
            console.log(this.Data.WallReload);
        }
    },
    beforeMount(){
        if(this.Data.WallReload == true){
            // Lors du chargement du composant, appeler les messages dans la BDD
            // Initialisation de la promesse vers l'API via AXIOS
            axios.get(this.urlAPI+'/api/messages/?order=updatedAt:DESC')
            .then(res =>{
                // Récupération des messages & likes liées
                this.Posts = res.data;
                console.log("Numbers of Posts: "+this.Posts.length);
                for(let i=0; i < this.Posts.length; i++){
                    this.PostId = this.Posts[i].id;
                    console.log("PID :"+this.PostId);
                    this.CPId = "CP"+this.PostId;
                    console.log("CPID :"+this.CPId);
                    this.LikeCounter = this.Posts[i].likes;
                    // Récupération de la date & l'heure du Post
                    let date= this.Posts[i].updatedAt.split('T')[0];
                    this.$store.commit('setPostDate',date);
                    console.log("PostDate : "+this.$store.state.PostDate);
                    let time= this.Posts[i].updatedAt.split('T')[1];
                    let PTime = time.replace('.000Z','');
                    this.$store.commit('setPostTime',PTime);
                    console.log("PostTime : "+this.$store.state.PostTime);

                    if(res.data[i].User.username == this.$store.state.userName){
                        this.$store.commit('setOwnMessage',true);
                        console.log("OwnMessage : "+this.Data.ownMessage);
                    }

                    axios.get(this.urlAPI+'/api/messages/comment?fields=id,messageId,username,comment,updatedAt&updatedAt:DESC')
                    .then(res =>{
                        console.log(res);
                        // Récupération des commentaires liées
                        this.Comments = res.data;
                        console.log("Numbers of Comments: "+this.Comments.length);
                        for(let i=0; i < this.Comments.length; i++){
                            console.log("Current PostID : "+ this.Comments[i].messageId);
                            if(this.Comments[i].messageId == this.PostId){
                                console.log(this.Comments[i].messageId, this.PostId);
                                this.CommentId = "P"+this.PostId+"C"+this.Comments[i].id;
                                this.$store.commit('setCommentId',"P"+this.PostId+"C"+this.Comments[i].id);
                                console.log("Comment : "+this.$store.state.CommentId);
                                // Récupération de la date & l'heure du message
                                let date= this.Comments[i].updatedAt.split('T')[0];
                                this.$store.commit('setCommentDate',date);
                                console.log("CommentDate : "+this.$store.state.CommentDate);
                                this.CommentDate = date;
                                let time= this.Comments[i].updatedAt.split('T')[1];
                                let CTime = time.replace('.000Z','');
                                this.$store.commit('setCommentTime',CTime);
                                console.log("CommentTime : "+this.$store.state.CommentTime);

                                if(res.data[i].username == this.$store.state.userName){
                                    this.$store.commit('setOwnComment',true);
                                    console.log("OwnComment : "+this.Data.ownComment);
                                }
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
                }

                if(this.Posts !=""){
                    this.$store.commit('setNoData', false);
                    console.log("NoData : "+this.Data.NoData);
                }

                this.$store.commit('setLoading',false);
                console.log(this.Data.Loading);
                this.$store.commit('setWallReload',false);
                console.log(this.Data.WallReload);
                
            })
            .catch(err =>{
                console.log(err);
                this.$store.commit('setLoading',false);
                console.log(this.Data.Loading);
            });
        }
    },

    mounted(){
        // Lors du chargement du composant, appeler les messages dans la BDD
        // Initialisation de la promesse vers l'API via AXIOS
        axios.get(this.urlAPI+'/api/messages/?order=updatedAt:DESC')
        .then(res =>{
            // Récupération des messages & likes liées
            this.Posts = res.data;
            console.log("Numbers of Posts: "+this.Posts.length);
            for(let i=0; i < this.Posts.length; i++){
                this.PostId = this.Posts[i].id;
                console.log("PID :"+this.PostId);
                this.CPId = "CP"+this.PostId;
                console.log("CPID :"+this.CPId);
                this.LikeCounter = this.Posts[i].likes;
                // Récupération de la date & l'heure du Post
                let date= this.Posts[i].updatedAt.split('T')[0];
                this.$store.commit('setPostDate',date);
                console.log("PostDate : "+this.$store.state.PostDate);
                let time= this.Posts[i].updatedAt.split('T')[1];
                let PTime = time.replace('.000Z','');
                this.$store.commit('setPostTime',PTime);
                console.log("PostTime : "+this.$store.state.PostTime);

                if(res.data[i].User.username == this.$store.state.userName){
                    this.$store.commit('setOwnMessage',true);
                    console.log("OwnMessage : "+this.Data.ownMessage);
                }

                axios.get(this.urlAPI+'/api/messages/comment?fields=id,messageId,username,comment,updatedAt&updatedAt:DESC')
                .then(res =>{
                    console.log(res);
                    // Récupération des commentaires liées
                    this.Comments = res.data;
                    console.log("Numbers of Comments: "+this.Comments.length);
                    for(let i=0; i < this.Comments.length; i++){
                        console.log("Current PostID : "+ this.Comments[i].messageId);
                        if(this.Comments[i].messageId == this.PostId){
                            console.log(this.Comments[i].messageId, this.PostId);
                            this.CommentId = "P"+this.PostId+"C"+this.Comments[i].id;
                            this.$store.commit('setCommentId',"P"+this.PostId+"C"+this.Comments[i].id);
                            console.log("Comment : "+this.$store.state.CommentId);
                            // Récupération de la date & l'heure du message
                            let date= this.Comments[i].updatedAt.split('T')[0];
                            this.$store.commit('setCommentDate',date);
                            console.log("CommentDate : "+this.$store.state.CommentDate);
                            this.CommentDate = date;
                            let time= this.Comments[i].updatedAt.split('T')[1];
                            let CTime = time.replace('.000Z','');
                            this.$store.commit('setCommentTime',CTime);
                            console.log("CommentTime : "+this.$store.state.CommentTime);

                            if(res.data[i].username == this.$store.state.userName){
                                this.$store.commit('setOwnComment',true);
                                console.log("OwnComment : "+this.Data.ownComment);
                            }
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
            }

            if(this.Posts !=""){
                this.$store.commit('setNoData', false);
                console.log("NoData : "+this.Data.NoData);
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
    updated(){
        if(this.Data.WallReload == true){
            // Lors du chargement du composant, appeler les messages dans la BDD
            // Initialisation de la promesse vers l'API via AXIOS
            axios.get(this.urlAPI+'/api/messages/?order=updatedAt:DESC')
            .then(res =>{
                // Récupération des messages & likes liées
                this.Posts = res.data;
                console.log("Numbers of Posts: "+this.Posts.length);
                for(let i=0; i < this.Posts.length; i++){
                    this.PostId = this.Posts[i].id;
                    console.log("PID :"+this.PostId);
                    this.CPId = "CP"+this.PostId;
                    console.log("CPID :"+this.CPId);
                    this.LikeCounter = this.Posts[i].likes;
                    // Récupération de la date & l'heure du Post
                    let date= this.Posts[i].updatedAt.split('T')[0];
                    this.$store.commit('setPostDate',date);
                    console.log("PostDate : "+this.$store.state.PostDate);
                    let time= this.Posts[i].updatedAt.split('T')[1];
                    let PTime = time.replace('.000Z','');
                    this.$store.commit('setPostTime',PTime);
                    console.log("PostTime : "+this.$store.state.PostTime);

                    if(res.data[i].User.username == this.$store.state.userName){
                        this.$store.commit('setOwnMessage',true);
                        console.log("OwnMessage : "+this.Data.ownMessage);
                    }

                    axios.get(this.urlAPI+'/api/messages/comment?fields=id,messageId,username,comment,updatedAt&updatedAt:DESC')
                    .then(res =>{
                        console.log(res);
                        // Récupération des commentaires liées
                        this.Comments = res.data;
                        console.log("Numbers of Comments: "+this.Comments.length);
                        for(let i=0; i < this.Comments.length; i++){
                            console.log("Current PostID : "+ this.Comments[i].messageId);
                            if(this.Comments[i].messageId == this.PostId){
                                console.log(this.Comments[i].messageId, this.PostId);
                                this.CommentId = "P"+this.PostId+"C"+this.Comments[i].id;
                                this.$store.commit('setCommentId',"P"+this.PostId+"C"+this.Comments[i].id);
                                console.log("Comment : "+this.$store.state.CommentId);
                                // Récupération de la date & l'heure du message
                                let date= this.Comments[i].updatedAt.split('T')[0];
                                this.$store.commit('setCommentDate',date);
                                console.log("CommentDate : "+this.$store.state.CommentDate);
                                this.CommentDate = date;
                                let time= this.Comments[i].updatedAt.split('T')[1];
                                let CTime = time.replace('.000Z','');
                                this.$store.commit('setCommentTime',CTime);
                                console.log("CommentTime : "+this.$store.state.CommentTime);

                                if(res.data[i].username == this.$store.state.userName){
                                    this.$store.commit('setOwnComment',true);
                                    console.log("OwnComment : "+this.Data.ownComment);
                                }
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
                }

                if(this.Posts !=""){
                    this.$store.commit('setNoData', false);
                    console.log("NoData : "+this.Data.NoData);
                }

                this.$store.commit('setLoading',false);
                console.log(this.Data.Loading);
                this.$store.commit('setWallReload',false);
                console.log(this.Data.WallReload);
                
            })
            .catch(err =>{
                console.log(err);
                this.$store.commit('setLoading',false);
                console.log(this.Data.Loading);
            });
        }
    }
}
</script>

<style scoped>
/* Design du Post */
.UserBackground
{
    background-image:url(../assets/PostDesign/Background-PostUser.png);
    background-position:right bottom;
    background-repeat:no-repeat;
    opacity: 0.8;
}

.TitleBackground
{
    background:-webkit-linear-gradient(to right, #d2515b 30%, #2f3855);
	background:-moz-linear-gradient(to right, #d2515b 30%, #2f3855);
	background:-o-linear-gradient(to right, #d2515b 30%, #2f3855);
	background:linear-gradient(to right, #d2515b 30%, #2f3855);
    opacity: 0.8;
}

.CommentBackground
{
    background:-webkit-linear-gradient(to right, #424241 60%,#2f3855);
	background:-moz-linear-gradient(to right, #424241 60%,#2f3855);
	background:-o-linear-gradient(to right, #424241 60%,#2f3855);
	background:linear-gradient(to right, #424241 60%,#2f3855);
    opacity: 0.8;
}
</style>