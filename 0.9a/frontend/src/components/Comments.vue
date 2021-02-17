<template>
    <div>
        <div v-for="Comment in Comments" :key="Comment.id" :id="'P'+Comment.messageId+'C'+Comment.id+'U'+Comment.username" class="row justify-content-end">
            <span v-show="SetOwnComment(Comment.username)"></span>
            <!-- Verifier la correspondance du PostId pour affichage -->
            <div v-if="Comment.messageId == Post.id">
                <div v-if="Data.Connected && (Data.isAdmin || Data.ownComment)" class="CommentDeleteButton col-10">
                    <p class="Comment">
                        <span class="CommentBackground">{{Comment.username}}<span class="inf"><i> (Le {{FormatDateTime(Comment.updatedAt)}})</i></span></span><br/>
                        {{Comment.comment}}
                    </p>
                </div>
                <div class="col-2" v-if="Data.Connected && (Data.isAdmin || Data.ownComment)">
                    <button @click="DeleteComment(Comment)" type="button" title="Supprimer" class="btn btn-danger text-center"><i class="far fa-trash-alt"></i></button>
                </div>
                <div v-else class="col-12">
                    <p class="Comment">
                        <span class="CommentBackground">{{Comment.username}}<span class="inf"><i> (Le {{FormatDateTime(Comment.updatedAt)}})</i></span></span><br/>
                        {{Comment.comment}}
                    </p>
                </div>
            </div>
        </div>
        <span v-if="Comments.length == 0"> <i class="fas fa-comment-slash"></i> {{NoComments}} </span>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'Comments',

    data(){
        return {
            // Variables Local
            urlAPI: this.$store.state.urlAPI,

            Posts:[],
            Comments:[],

            CHKcomment : false,
            ValueComment: false,

            ownMessage: false,
            ownComment: false,
            Liked: false,

            LikeCounter:this.$store.state.LikeCounter,

            // Messages
            NoComments:"Aucuns commentaires à afficher"
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
        }
    },

    // Création de la logique du module
    methods:{
        DeleteComment(Comment){
            console.log(Comment);
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
                    axios.delete(this.urlAPI+"/api/messages/comment/"+Comment.messageId+"/"+Comment.id+"/moderate/")
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
                    axios.delete(this.urlAPI+"/api/messages/comment/"+Comment.messageId+"/"+Comment.id)
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
        WallReload(){
            this.$store.commit('setWallReload', true);
            console.log(this.Data.WallReload);
        },
        // Paramètrages d'affichage et d'unicité des Comments
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
/* Design du Commentaire */
.CommentBackground
{
    background:-webkit-linear-gradient(to right, #424241 60%,#2f3855);
	background:-moz-linear-gradient(to right, #424241 60%,#2f3855);
	background:-o-linear-gradient(to right, #424241 60%,#2f3855);
	background:linear-gradient(to right, #424241 60%,#2f3855);
    opacity: 0.8;
}
</style>