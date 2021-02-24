<template>
    <div>
        <div v-for="Comment in Comments" :key="Comment.id" class="row justify-content-end">
            <span v-show="SetOwnComment(Comment.username)"></span>
            <div v-if="getCommentById(Comment.messageId, Post.id) == Post.id && Connected && (isAdmin || ownComment)" class="CommentDeleteButton col-10">
                <p class="Comment">
                    <span class="CommentBackground">{{Comment.username}}<span class="inf"><i> (Le {{FormatDateTime(Comment.updatedAt)}})</i></span></span><br/>
                    {{Comment.comment}}
                </p>
            </div>
            <div class="col-2" v-if="getCommentById(Comment.messageId, Post.id) == Post.id && Connected && (isAdmin || ownComment)">
                <button @click="DeleteComment(Comment)" type="button" title="Supprimer" class="btn btn-danger text-center"><i class="far fa-trash-alt"></i></button>
            </div>
            <div v-if="getCommentById(Comment.messageId, Post.id) == Post.id && !Connected" class="col-12">
                <p class="Comment">
                    <span class="CommentBackground">{{Comment.username}}<span class="inf"><i> (Le {{FormatDateTime(Comment.updatedAt)}})</i></span></span><br/>
                    {{Comment.comment}}
                </p>
            </div>
            <span v-else-if="getCommentById(Comment.messageId, Post.id) != Post.id && !Connected"><i class="fas fa-comment-slash"></i> {{NoComments}}</span>
            <span v-else-if="getCommentById(Comment.messageId, Post.id) != Post.id && Connected"><i class="fas fa-comment-slash"></i> {{NoComments}}</span>
        </div>
        <span v-if="!Comments.length"><i class="fas fa-comment-slash"></i> {{NoComments}}</span>
    </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
    name: 'CommentS',

    props:{
        Post:{
            type:Object
        },

         Comments:{
            type:Array
        }
    },

    data(){
        return {
            // Variables Local
            
            // Messages
            NotConnected:"Veuillez vous connecter.",
            NoComments:"Aucuns commentaires à afficher"
        }
    },

    computed:{
        ...mapGetters([
            
            // Utilisateur
            'Connected',
            'isAdmin',
            'userName',
            'ownComment',

            // Status
            'Loading',
            'subOkay',
            'subFailure',
            'subCompleted',
        ]),
    },

    // Création de la logique du module
    methods:{
        getCommentById(Cid, Pid){
            // console.log(this.$store.state.Comments, Pid, Cid);
            // return this.$store.state.Comments.filter(comment => comment.messageId === Pid);
            if(this.$store.state.Comments.filter(comment => comment.messageId === Pid)){
                return Cid;
            }
            else {
                return null;
            }
            // return this.$store.state.Comments.filter(comment => comment.messageId === Pid);
        },

        DeleteComment(Comment){
            console.log(Comment);
            this.$store.dispatch("DeleteComment",Comment);
        },
        // Paramètrages d'affichage et d'unicité des Comments
        FormatDateTime(DateTime){
            // Mise à jour du format de la date
            if (DateTime) {
                return moment(String(DateTime)).format('DD/MM/YYYY HH:mm')
            }
        },
        SetOwnComment(Username){
            this.$store.dispatch("SetOwnComment",Username);
        },
    },

    mounted(){
        //
    },

    updated(){
        //
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