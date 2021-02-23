<template>
    <div>
        <div v-if="Loading" class="spinner-border text-primary text-center" id="WallLoad">
            <p>Chargement des messages... </p>
        </div>
        <div v-if="!Loading && Connected && NoData" class="spinner-border text-primary text-center" id="WallLoad">
            <p>Aucuns messages a charger ... a vous de jouer! :D </p>
        </div>
        <!--POST START-->
        <PostS :Posts="Posts" :Comments="Comments"/>
        <!--POST END-->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PostS from '@/components/Posts.vue'
import CommentS from '@/components/Comments.vue'

export default {
    name: 'Wall',
    components: {
        PostS, CommentS
    },
    
    computed:{

        ...mapGetters([
            
            // Utilisateur
            'Connected',
            'isAdmin',
            'userName',
            'ownMessage',
            'ownComment',
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

            // Posts & Comments
            'Posts',
            'Comments',

            'NoData'
        ]),
    },
    
    // Création de la logique du module
    methods:{
        //
    },


    mounted(){
        this.$store.dispatch("WallLoad");
    },
    updated(){
        if(this.WallReload == true){
            this.$store.dispatch("WallLoad");
        }
    }
}

                
</script>