<template>
    <button @click="wallLoad">Charger</button>
	<div v-if="Loading" class="spinner-border text-primary text-center" id="WallLoad">
        <p>Chargement des messages... </p>
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
                        <button v-if="Connected && ownMessage" type="button" title="Editer" class="btn btn-primary text-center" data-toggle="modal" data-target="#EditModal"><i class="fas fa-pen"></i></button>
                        <button v-if="Connected && isAdmin" type="button" title="Modérer" class="btn btn-danger text-center" data-toggle="modal" data-target="#ModerateModal"><i class="fas fa-exclamation-circle"></i></button>
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
                        <div class="col-3">
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
            isAdmin: this.$store.state.isAdmin,
            Connected: this.$store.state.Connected,
            Loading: this.$store.state.Loading,
            LikeCounter: this.$store.state.LikesCounter,
            PostId:this.$store.state.CurrentPostId,
            CommentId:this.$store.state.CurrentCommentId,

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
    // Création de la logique du module
    methods:{
        wallLoad(){
            //WIP
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
                }
            })
            .catch(err =>{
                console.log(err);
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
            // WIP
            // Sucess
            document.getElementById('comment').value = '';
            this.ValueComment = false;
            this.subOkay = true;
            this.subCompleted = true;
            this.chkOK = false;

            // Faillure
            /*
            this.subFailure = true;
            this.subCompleted = true;
            */
        },
        DeleteComment(){
            //WIP
            console.log('Comment Deleted')
        },

        SetPostId(){
            // Récupérer le PostID, pour l'éditer, le supprimer ou le modérer.
            console.log("Mouse Over!");
            let OverId = document.getElementById("Buttons").parentNode.id;
            this.$store.commit('setCurrentPostId',this.PostId);
        },
        Like(){
            // WIP
            if(this.Liked){
                console.log('Disliked');
                this.Liked = false;
                this.LikeCounter -=1;
                this.$store.commit('setLikes', this.LikeCounter);
                console.log(this.LikeCounter);
                
            } else {
                console.log('Liked');
                this.Liked = true;
                this.LikeCounter +=1;
                this.$store.commit('setLikes', this.LikeCounter);
                console.log(this.LikeCounter);
            }
            
        },
        DeletePost(){
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
                // Initialisation de la promesse vers l'API via AXIOS
                axios.delete('http://localhost:3000/api/messages/'+this.PostId+'/moderate')
                .then(res =>{
                    console.log(res);
                })
                .catch(err =>{
                    console.log(err);
                });
                console.log('Post Deleted');
            } else {
                // Initialisation de la promesse vers l'API via AXIOS
                axios.delete('http://localhost:3000/api/messages/'+this.PostId)
                .then(res =>{
                    console.log(res);
                })
                .catch(err =>{
                    console.log(err);
                });
                console.log('Post Deleted');
            }
        }
    }
}
</script>