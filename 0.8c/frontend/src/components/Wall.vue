<template>
    <button @click="ReLoad">Recharger...</button>
	<div v-if="Loading" class="spinner-border text-primary text-center" id="WallLoad">
        <p>Chargement des messages... </p>
    </div>
    <div v-if="!Loading && Connected && NoData" class="spinner-border text-primary text-center" id="WallLoad">
        <p>Aucuns messages a charger ... a vous de jouer! :D </p>
    </div>
    <!-- POST START-->
    <div v-for="Post in Posts" :key="Post">
        <br/>
        <div class="row justify-content-center">
            <div class="col-11 col-sm-9 col-md-6 bg-info text-white media border p-4 m-0">
                <div :id="Post.id" class="media-body">
                    <h4>{{Post.User.username}} <small><i>(Créer le {{PostDate}} à {{PostTime}})</i></small></h4>
                    <hr>
                    <h5><i>{{Post.title}}</i></h5>
                    <img class="rounded img-fluid d-flex" :src="Post.attachment"/>
                    <p>{{Post.content}}</p><br/>
                    <hr v-if="Connected">
                    <div id="Buttons" @mouseover="SetPostId" class="row justify-content-center">
                        <button @click.stop="Like" v-if="Connected" type="button" title="J'aime" class="btn btn-primary text-center"><i class="far fa-thumbs-up"></i> {{Post.likes}}</button>
                        <button @click="EditPost" v-if="Connected && ownMessage" type="button" title="Editer" class="btn btn-primary text-center" data-toggle="modal" data-target="#EditModal"><i class="fas fa-pen"></i></button>
                        <button @click="EditPost" v-if="Connected && isAdmin" type="button" title="Modérer" class="btn btn-danger text-center" data-toggle="modal" data-target="#ModerateModal"><i class="fas fa-exclamation-circle"></i></button>
                        <button @click.stop="DeletePost" v-if="Connected && (isAdmin || ownMessage)" type="button" title="Supprimer" class="btn btn-danger text-center"><i class="far fa-trash-alt"></i></button>
                    </div>
                    <hr v-if="Connected">
                    <div id="Comment" v-if="Connected" class="row justify-content-start">
                        <div v-if="Connected" class="col-9 form-group">
                            <label for="comment">Commentaire</label>
                            <input @keyup="CommentVerify" type="text" class="form-control" id="comment" placeholder="Commentez!" name="comment">
                        </div>
                        <div class="col-3 align-items-center">
                            <button @click="Submit" v-if="ValueComment" type="button" title="Envoyer" class="btn btn-primary text-center"><i class="far fa-paper-plane"></i></button>
                        </div>
                    </div>
                    <hr>

                    <div v-for="Comment in Comments" :key="Comment" id="PostedComments" class="row justify-content-end">
                        <div class="col-9">
                            <p>
                                <i>{{Comment.username}} ({{CommentDate}} à {{CommentTime}})</i><br/>
                                {{Comment.comment}}
                            </p>
                        </div>
                        <div @mouseover="SetCommentId" id="CommentDeleteButton" class="col-3">
                            <button @click="DeleteComment" v-if="Connected && (isAdmin || ownComment)" type="button" title="Supprimer" class="btn btn-danger text-center"><i class="far fa-trash-alt"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- POST END -->
</template>

<script>

export default {
    name: 'Wall',
    // el: "#EditContent",
    data(){
        return {
            // Récupération des variables dans vue X
            urlAPI:this.$store.state.urlAPI,
            isAdmin: this.$store.state.isAdmin,
            Connected: this.$store.state.Connected,
            Loading: this.$store.state.Loading,
            NoData:this.$store.state.NoData,
            LikeCounter: this.$store.state.LikesCounter,
            // PostId:this.$store.state.CurrentPostId,
            // CommentId:this.$store.state.CurrentCommentId,
            Token:this.$store.state.Token,

            // Variables Local
            Posts: [],
            // PostId:0,
            PostDate:'',
            PostTime:'',

            Comments:[],
            // CommentId:0,
            CommentDate:'',
            CommentTime:'',
            
            CHKcomment : false,
            ValueComment: false,

            ownMessage: false,
            ownComment: false,
            Liked: false,

        }
    },

    computed:{
        data(){
            return{
                Connected: this.$store.state.Connected,
                isAdmin: this.$store.state.isAdmin,
                
                PostId:this.$store.state.CurrentPostId,
                CommentId:this.$store.state.CurrentCommentId,
                Etitle:this.$store.state.Etitle,
                Econtent:this.$store.state.Econtent,
            }
        }

    },
    // Création de la logique du module
    methods:{
        ReLoad(){
            this.Loading = true;
            this.$store.commit('setLoading',this.Loading);
            console.log(this.Loading);
            //WIP
            // Initialisation de la promesse vers l'API via AXIOS
            axios.get(this.urlAPI+'/api/messages/?order=id:ASC')
            .then(res =>{
                // Récupération des messages & likes liées
                this.Posts = res.data;
                console.log(this.Posts);
                for(let i=0; i < this.Posts.length; i++){
                    this.LikeCounter = this.Posts[i].likes;
                    this.PostId = this.Posts[i].id;
                    // Récupération de la date & l'heure du Post
                    let date= this.Posts[i].createdAt.split('T')[0];
                    this.PostDate= date;
                    let time= this.Posts[i].createdAt.split('T')[1];
                    this.PostTime = time.replace('.000Z','');
                    if(res.data[i].User.username == this.$store.state.userName){
                        this.ownMessage = true;
                    }
                }

                if(this.Posts == 0){
                    this.$store.commit('setNoData', true);
                    this.NoData = true;
                } else {
                    this.$store.commit('setNoData', false);
                    this.NoData = false;
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

                    if(this.Posts == 0){
                        this.$store.commit('setNoData', true);
                    }
                }

                this.Loading = false;
                this.$store.commit('setLoading',this.Loading);
                console.log(this.Loading);

            })
            .catch(err =>{
                console.log(err);
                this.Loading = false;
                this.$store.commit('setLoading',this.Loading);
                console.log(this.Loading);
            });
        },
        CommentVerify(){
            let Comment = document.getElementById('comment').value;

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
                        config.headers.authorization = `Bearer ${this.Token}`;
                        return config;
                    },
                    error => {
                        return Promise.reject(error);
                    }
                );

            let comment = document.getElementById('comment').value;
            console.log(comment);
            axios.post(this.urlAPI+"/api/messages/comment/"+this.PostId+"/new/",{
                comment : comment
            })
            .then(res =>{
                // Sucess
                document.getElementById('comment').value = '';
                this.ValueComment = false;
                this.subOkay = true;
                this.subCompleted = true;
                this.chkOK = false;
                router.push({path:'Home'});

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
            console.log("Mouse Over!");
            let OverId = document.getElementById("CommentDeleteButton").parentNode.id;
            this.$store.commit('setCurrentCommentId',this.CommentId);
        },
        DeleteComment(){
            //WIP
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
            if(this.isAdmin){
                axios.delete(this.urlAPI+"/api/messages/comment/"+this.PostId+"/"+this.CommentId+"/moderate/")
                .then(res=>{
                    console.log(res);
                    console.log('commentaire supprimé');
                })
                .catch(err =>{
                    console.log(err);
                });

            } else {
                axios.delete(this.urlAPI+"/api/messages/comment/"+this.PostId+"/"+this.CommentId)
                .then(res=>{
                    console.log(res);
                    console.log('commentaire supprimé');

                })
                .catch(err =>{
                    console.log(err);
                });
            }
        },
        SetPostId(){
            // Récupérer le PostID, pour l'éditer, le supprimer ou le modérer.
            console.log("Mouse Over!");
            let OverId = document.getElementById("Buttons").parentNode.id;
            this.$store.commit('setCurrentPostId',this.PostId);
        },
        Like(){
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

            axios.post(this.urlAPI+"/api/messages/"+this.PostId+"/vote/like")
            .then(res =>{
                // Like le post
                console.log('Liked');
                console.log(res);
                this.Liked = true;
                this.LikeCounter +=1;
                this.$store.commit('setLikes', this.LikeCounter);
                console.log(this.LikeCounter);
            })
            .catch(err =>{
                axios.post(this.urlAPI+"/api/messages/"+this.PostId+"/vote/dislike")
                then(res=>{
                    // Dislike le post
                    console.log('Disliked');
                    console.log(res);
                    this.Liked = false;
                    this.LikeCounter -=1;
                    this.$store.commit('setLikes', this.LikeCounter);
                    console.log(this.LikeCounter);
                })
                
            });
            
        },
        DeletePost(){
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
            if(this.isAdmin){
                // Initialisation de la promesse vers l'API via AXIOS
                axios.delete(this.urlAPI+'/api/messages/'+this.PostId+'/moderate')
                .then(res =>{
                    console.log(res);
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
                        // console.log('IN-IF');
                        this.Etitle=res.data[i].title;
                        this.$store.commit('setCurrentEtitle',res.data[i].title);
                        console.log(this.$store.state.Etitle);
                        this.Econtent=res.data[i].content;
                        this.$store.commit('setCurrentEcontent',res.data[i].content);
                        console.log(this.$store.state.Econtent);
                    }
                }
            })
            .catch(err =>{
                console.log(err);
            });
        }
    },
    mounted(){
        this.Loading = true;
        this.$store.commit('setLoading',this.Loading);
        console.log(this.Loading);
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
                this.PostDate= date;
                let time= this.Posts[i].createdAt.split('T')[1];
                this.PostTime = time.replace('.000Z','');
                if(res.data[i].User.username == this.$store.state.userName){
                    this.ownMessage = true;
                }
            }
            if(this.Posts == 0){
                this.$store.commit('setNoData', true);
            } else {
                this.$store.commit('setNoData', false);
            }
        })
        .catch(err =>{
            console.log(err);
            this.Loading = false;
            this.$store.commit('setLoading',this.Loading);
            console.log(this.Loading);
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

                    if(this.Posts == 0){
                        this.$store.commit('setNoData', true);
                    }
                }

                this.Loading = false;
                this.$store.commit('setLoading',this.Loading);
                console.log(this.Loading);

            })
            .catch(err =>{
                console.log(err);
                this.Loading = false;
                this.$store.commit('setLoading',this.Loading);
                console.log(this.Loading);
            });
    }
}
</script>