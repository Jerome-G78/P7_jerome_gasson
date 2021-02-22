<template>
    <div>
        <div v-if="Data.Loading" class="spinner-border text-primary text-center" id="WallLoad">
            <p>Chargement des messages... </p>
        </div>
        <div v-if="!Data.Loading && Data.Connected && Data.NoData" class="spinner-border text-primary text-center" id="WallLoad">
            <p>Aucuns messages a charger ... a vous de jouer! :D </p>
        </div>
        <!--POST START-->
        <PostS :Posts="Posts" :Comments="Comments"/>
        <!--POST END-->
    </div>
</template>

<script>
import moment from 'moment'
import PostS from '@/components/Posts.vue'
import CommentS from '@/components/Comments.vue'

export default {
    name: 'Wall',
    components: {
        PostS, CommentS
    },

    data(){
        return {
            // Variables Local
            urlAPI: this.$store.state.urlAPI,

            Posts: this.$store.state.Posts,
            Comments: this.$store.state.Comments,
            
            CHKcomment: false,
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

                Posts: this.$store.state.Posts,
                Comments: this.$store.state.Comments,
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
        Submit(Post){
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
        DeleteComment(Post,Comment){
            console.log(Post,Comment);
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
                    axios.delete(this.urlAPI+"/api/messages/comment/"+Comment.id+"/"+Post.id+"/moderate/")
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
                    axios.delete(this.urlAPI+"/api/messages/comment/"+Comment.id+"/"+Post.id)
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
        /*
        EditPost(PostId){
            // this.$store.dispatch("EditPost", PostId);
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
        */
        WallReload(data){
            this.$store.commit('setWallReload', data);
            console.log(this.Data.WallReload);
        },
        // Paramètrages d'affichage et d'unicité des Comment IDs
        FormatDateTime(DateTime){
            // Mise à jour du format de la date
            if (DateTime) {
                return moment(String(DateTime)).format('DD/MM/YYYY HH:mm')
            }
        },
        SetOwnComment(Username){
            console.log('Methode - SetOwnComment : '+ Username);
            if(Username == this.Data.userName){
                console.log(this.Data.userName);
                this.Data.ownComment = true;
                console.log("Own Comment!");
                return Username;

            } else {
                console.log(this.Data.userName);
                this.Data.ownComment = false;
                console.log("No Own Comment");
                return Username;
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
            this.$store.commit('setPosts',responseArr[0].data);
            this.Posts = responseArr[0].data;
            console.log("Numbers of Posts: "+this.Posts.length);
            console.log(this.Posts);
            this.$store.commit('setComments',responseArr[1].data);
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
                this.$store.commit('setPosts',responseArr[0].data);
                this.Posts = responseArr[0].data;
                console.log("Numbers of Posts: "+this.Posts.length);
                this.$store.commit('setComments',responseArr[1].data);
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