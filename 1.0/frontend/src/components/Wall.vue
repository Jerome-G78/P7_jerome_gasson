<template>
    <div>
        <div v-if="Loading" class="text-primary text-center" id="WallLoad" role="status">
            <p>Chargement des messages...</p>
            <span class="spinner-border"></span>
        </div>
        <div v-if="!Loading && Connected && NoData" class="spinner-border text-primary text-center" id="WallLoad">
            <p>Aucuns messages a charger ... a vous de jouer! :D </p>
        </div>
        <div v-if="subFailure" class="alert alert-danger">
            <i class="fas fa-exclamation-triangle"></i> {{MSGfaillure}}
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

                // Status
                'subFailure',
                'MSGfaillure',
                'Loading',

                // Posts & Comments
                'Posts',
                'Comments',
                'NoData'
            ]),
        },
    }        
</script>