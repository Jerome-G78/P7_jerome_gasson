<template>
    <div>
        <div v-for="Comment in Comments" :key="Comment.id" class="row justify-content-end">
            <div v-if="getCommentById(Comment.messageId, Post.id) == Post.id && Connected && (isAdmin || Comment.username == userName)" class="CommentDeleteButton col-10">
                <p class="Comment">
                    <span class="CommentBackground">{{Comment.username}}<span class="inf"><i> (Le {{FormatDateTime(Comment.createdAt)}})</i></span></span><br/>
                    {{Comment.comment}}
                </p>
            </div>
            <div v-if="getCommentById(Comment.messageId, Post.id) == Post.id && Connected && (isAdmin || Comment.username == userName)" class="col-3">
                <button @click="DeleteComment(Comment)" type="button" title="Supprimer" class="btn btn-danger text-center"><i class="far fa-trash-alt"></i></button>
            </div>
            <div v-if="getCommentById(Comment.messageId, Post.id) == Post.id && Connected && !isAdmin && Comment.username != userName" class="col-12">
                <p class="Comment">
                    <span class="CommentBackground">{{Comment.username}}<span class="inf"><i> (Le {{FormatDateTime(Comment.createdAt)}})</i></span></span><br/>
                    {{Comment.comment}}
                </p>
            </div>
            <div v-if="getCommentById(Comment.messageId, Post.id) == Post.id && !Connected" class="col-12">
                <p class="Comment">
                    <span class="CommentBackground">{{Comment.username}}<span class="inf"><i> (Le {{FormatDateTime(Comment.createdAt)}})</i></span></span><br/>
                    {{Comment.comment}}
                </p>
            </div>
            <!-- <span v-else><i class="fas fa-comment-slash"></i> {{NoComments}}</span> -->
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
            // CommentsCounter:0,
            
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

            // Status
            'Loading',
            'subOkay',
            'subFailure',
            'subCompleted',
        ]),
    },

    // Création de la logique du module
    methods:{
        getCommentById(CMid, Pid){
            // console.log(this.$store.state.Comments, Pid, Cid);
            // return this.$store.state.Comments.filter(comment => comment.messageId === Pid);
            if(this.$store.state.Comments.filter(comment => comment.messageId === Pid)){
                return CMid;
            }
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