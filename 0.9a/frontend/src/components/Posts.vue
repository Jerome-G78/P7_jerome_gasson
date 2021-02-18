<template>
    <div>
        <div v-for="Post in Posts" :key="Post.id" :id="Post.id" class="Space row justify-content-center">
            <div class="Mbody col-10 col-sm-10 col-md-11 bg-info text-white media border p-4 m-0">
                <div class="media-body">
                    <span v-show="SetOwnMessage(Post.User.username)"></span>
                    <h4 class="UserBackground">{{Post.User.username}} <span class="inf"><span><i>(Edité le {{FormatDateTime(Post.updatedAt)}})</i></span></span></h4>
                    <h5 class="TitleBackground"><i>{{Post.title}}</i></h5>
                    <hr/>
                    <img class="justify-content-center rounded img-fluid d-flex" :src="Post.attachment"/>
                    <p class="Content">{{Post.content}}</p><br/>
                    <hr v-if="Data.Connected">
                    <div class="Buttons row justify-content-center">
                        <button @click.stop="Like(Post.id)" v-if="Data.Connected" type="button" title="J'aime" class="btn btn-primary text-center"><i class="far fa-thumbs-up"></i> {{Post.likes}}</button>
                        <button @click="EditPost(Post.id)" v-if="Data.Connected && Data.ownMessage" type="button" title="Editer" class="btn btn-primary text-center" data-toggle="modal" data-target="#EditModal"><i class="fas fa-pen"></i></button>
                        <button @click="EditPost(Post.id)" v-if="Data.Connected && Data.isAdmin" type="button" title="Modérer" class="btn btn-danger text-center" data-toggle="modal" data-target="#ModerateModal"><i class="fas fa-exclamation-circle"></i></button>
                        <button @click.stop="DeletePost(Post.id)" v-if="Data.Connected && (Data.isAdmin || Data.ownMessage)" type="button" title="Supprimer" class="btn btn-danger text-center"><i class="far fa-trash-alt"></i></button>
                    </div>
                    <hr v-if="Data.Connected"/>
                    <div v-if="Data.Connected" class="row justify-content-start">
                        <div v-if="Data.Connected" class="labelsAlign col-10 form-group">
                            <label for="comment">Commentaire</label>
                            <input :id="'CP'+Post.id" @keyup="CommentVerify(Post.id)" type="text" class="form-control" placeholder="Commentez!" name="comment" maxlength="255"/>
                        </div>
                        <div v-if="Data.Connected" class="col-2 align-items-center">
                            <button @click="Submit(Post)" v-if="ValueComment" type="button" title="Envoyer" class="btn btn-primary text-center"><i class="far fa-paper-plane"></i></button>
                        </div>
                    </div>
                    <hr>
                    <Comments :Posts="Posts" :Comments="Comments" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import Comments from '@/components/Comments.vue'

export default {
    name: 'PostS',

    props:{
        Posts:{
            type:Array
        },

        Comments:{
            type:Array
        }
    },

    components: {
        Comments
    },

    data(){
        return {
            // Variables Local
            urlAPI: this.$store.state.urlAPI,

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
        CommentVerify(PostId){
            let Comment = document.getElementById('CP'+PostId).value;

            if(Comment !=''){
                this.ValueComment = true;
            } else {
                this.ValueComment = false;
            }
        },
        Submit(Post, ctx){
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

            let comment = document.getElementById('CP'+Post.id).value;
            console.log(comment);
            axios.post(this.urlAPI+"/api/messages/comment/"+Post.id+"/new/",{
                comment : comment
            })
            .then(res =>{
                // Sucess
                document.getElementById('CP'+Post.id).value = '';
                this.ValueComment = false;
                this.subOkay = true;
                this.subCompleted = true;
                this.chkOK = false;

                // Rechargement du mur après opération
                console.log('ModifyPost emiting...');
                ctx.emit('ModifyPost', true);
                console.log('ModifyPost emited');
                // this.$store.commit('setWallReload', true);
                // console.log(this.Data.WallReload);

            })
            .catch(err =>{
                // Faillure
                this.subFailure = true;
                this.subCompleted = true;
                this.chkOK = false;
            });
        },
        Like(PostId){
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

            axios.post(this.urlAPI+"/api/messages/"+PostId+"/vote/like")
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
                axios.post(this.urlAPI+"/api/messages/"+PostId+"/vote/dislike")
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
        DeletePost(PostId){
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
                axios.delete(this.urlAPI+'/api/messages/'+PostId+'/moderate')
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
                axios.delete(this.urlAPI+'/api/messages/'+PostId)
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
        EditPost(PostId){
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
                    if(res.data[i].id == PostId){
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
        },
        // Paramètrages d'affichage et d'unicité des Posts
        FormatDateTime(DateTime){
            // Mise à jour du format de la date
            if (DateTime) {
                return moment(String(DateTime)).format('DD/MM/YYYY HH:mm')
            }
        },
        SetOwnMessage(Username){
            console.log('Methode - SetOwnMessage : '+ Username);
            if(Username == this.Data.userName){
                console.log(this.Data.userName);
                this.Data.ownMessage = true;
                console.log("Own Message!");
                return Username;

            } else {
                console.log(this.Data.userName);
                this.Data.ownMessage = false;
                console.log("No Own Message");
                return Username;
            }
        }
    },

    mounted(){
        // Lors du chargement du composant, appeler les messages dans la BDD
        // Initialisation de la promesse vers l'API via AXIOS

        axios.all([
            axios.get(this.urlAPI+'/api/messages/?order=updatedAt:DESC'),
            axios.get(this.urlAPI+'/api/messages/comment?fields=id,messageId,username,comment,updatedAt&updatedAt:DESC')
        ])
        .then(responseArr => {

            this.$store.commit('setLoading',true);
            console.log(this.Data.Loading);
            this.Posts = responseArr[0].data;
            console.log("Numbers of Posts: "+this.Posts.length);
            console.log(this.Posts);
            this.Comments = responseArr[1].data;
            console.log("Numbers of Comments: "+this.Comments.length);
            console.log(this.Comments);

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
            axios.all([
                axios.get(this.urlAPI+'/api/messages/?order=updatedAt:DESC'),
                axios.get(this.urlAPI+'/api/messages/comment?fields=id,messageId,username,comment,updatedAt&updatedAt:DESC')
            ])
            .then(responseArr => {

                this.$store.commit('setLoading',true);
                console.log(this.Data.Loading);
                this.Posts = responseArr[0].data;
                console.log("Numbers of Posts: "+this.Posts.length);
                this.Comments = responseArr[1].data;
                console.log("Numbers of Comments: "+this.Comments.length);

                if(this.Posts !=""){
                    this.$store.commit('setNoData', false);
                    console.log("NoData : "+this.Data.NoData);
                }

                this.$store.commit('setWallReload',false);
                console.log(this.Data.WallReload);

                this.$store.commit('setLoading',false);
                console.log(this.Data.Loading);
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

.Space{
    margin-top:1em;
    margin-bottom:1em;
}

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
</style>