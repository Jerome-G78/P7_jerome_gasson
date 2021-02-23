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
                    <hr v-if="Connected">
                    <div class="Buttons row justify-content-center">
                        <button @click.stop="Like(Post.id)" v-if="Connected" type="button" title="J'aime" class="btn btn-primary text-center"><i class="far fa-thumbs-up"></i> {{Post.likes}}</button>
                        <button @click="EditPost(Post.id)" v-if="Connected && ownMessage" type="button" title="Editer" class="btn btn-primary text-center" data-toggle="modal" data-target="#EditModal"><i class="fas fa-pen"></i></button>
                        <button @click="ModeratePost(Post.id)" v-if="Connected && isAdmin" type="button" title="Modérer" class="btn btn-danger text-center" data-toggle="modal" data-target="#ModerateModal"><i class="fas fa-exclamation-circle"></i></button>
                        <button @click.stop="DeletePost(Post.id)" v-if="Connected && (isAdmin || ownMessage)" type="button" title="Supprimer" class="btn btn-danger text-center"><i class="far fa-trash-alt"></i></button>
                    </div>
                    <hr v-if="Connected"/>
                    <div v-if="Connected" class="row justify-content-start">
                        <div v-if="Connected" class="labelsAlign col-10 form-group">
                            <label for="comment">Commentaire</label>
                            <input :id="'CP'+Post.id" @keyup="CommentVerify(Post.id)" type="text" class="form-control" placeholder="Commentez!" name="comment" maxlength="255"/>
                        </div>
                        <div v-if="Connected" class="col-2 align-items-center">
                            <button v-if="ValueComment" :id="'CPS'+Post.id" @click="Submit(Post)" type="button" title="Envoyer" class="btn btn-primary text-center"><i class="far fa-paper-plane"></i></button>
                        </div>
                    </div>
                    <hr>
                    <Comments :Post="Post" :Comments="Comments" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import Comments from '@/components/Comments.vue'

export default {
    name: 'PostS',

    props:{
        Posts:{
            type:Array
        },

        Comments:{
            type:Object
        }
    },

    components: {
        Comments
    },

    data(){
        return {
            //
        }
    },

    computed:{
        ...mapGetters([
            
            // Utilisateur
            'Connected',
            'isAdmin',
            'userName',
            'ownMessage',
            'Liked',

            // Like Counters
            'LikesCounter',

            // Edit & Moderate
            'EditTitle',
            'EditContent',
            'ModerateTitle',
            'ModerateContent',

            // Status
            'WallReload',
            'Loading',
            'subOkay',
            'subFailure',
            'subCompleted',

            // Comments
            'ValueComment'
        ]),
    },

    // Création de la logique du module
    methods:{
        CommentVerify(PostId){
            this.$store.dispatch("CommentVerify",PostId);
        },
        Submit(Post){
            this.$store.dispatch("SubmitComment",Post);
        },
        Like(PostId){
            this.$store.dispatch("LikePost",PostId);
        },
        DeletePost(PostId){
            this.$store.dispatch("DeletePost",PostId);
        },
        EditPost(PostId){
            this.$store.dispatch("WallEditPost", PostId);
        },
        ModeratePost(PostId){
            this.$store.dispatch("WallModeratePost", PostId);
        },
        // Paramètrages d'affichage et d'unicité des Posts
        FormatDateTime(DateTime){
            // Mise à jour du format de la date
            if (DateTime) {
                return moment(String(DateTime)).format('DD/MM/YYYY HH:mm')
            }
        },
        SetOwnMessage(Username){
            this.$store.dispatch("SetOwnMessage", Username);
        }
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