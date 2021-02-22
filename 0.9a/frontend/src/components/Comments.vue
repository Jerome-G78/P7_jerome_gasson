<template>
    <div>
        <div v-for="Comment in Comments" :key="Comment.id" :id="'P'+Comment.messageId+'C'+Comment.id+'U'+Comment.username" class="row justify-content-end">
            <span v-show="SetOwnComment(Comment.username)"></span>
            <!-- Verifier la correspondance du PostId pour affichage -->
            <!-- <div v-if="Comment.messageId == Post.id"> -->
                <div v-if="Connected && (isAdmin || ownComment)" class="CommentDeleteButton col-10">
                    <p class="Comment">
                        <span class="CommentBackground">{{Comment.username}}<span class="inf"><i> (Le {{FormatDateTime(Comment.updatedAt)}})</i></span></span><br/>
                        {{Comment.comment}}
                    </p>
                </div>
                <div class="col-2" v-if="Connected && (isAdmin || ownComment)">
                    <button @click="DeleteComment(Comment)" type="button" title="Supprimer" class="btn btn-danger text-center"><i class="far fa-trash-alt"></i></button>
                </div>
                <div v-else class="col-12">
                    <p class="Comment">
                        <span class="CommentBackground">{{Comment.username}}<span class="inf"><i> (Le {{FormatDateTime(Comment.updatedAt)}})</i></span></span><br/>
                        {{Comment.comment}}
                    </p>
                </div>
            <!--</div> -->
        </div>
        <span v-if="Comments.length == 0"> <i class="fas fa-comment-slash"></i> {{NoComments}} </span>
    </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
    name: 'CommentS',

    props:{
        Posts:{
            type:Array
        },

         Comments:{
            type:Array
        }
    },

    data(){
        return {
            // Variables Local
            
            // Messages
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
            'WallReload',
            'Loading',
            'subOkay',
            'subFailure',
            'subCompleted'
        ]),
    },

    // Création de la logique du module
    methods:{
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