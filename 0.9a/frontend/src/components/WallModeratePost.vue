<template>
    <div class="modal" id="ModerateModal">
        <div class="modal-dialog">
            <div class="modal-content">
        
                <div class="modal-header">
                    <h4 class="modal-title"><i class="fas fa-exclamation-circle"></i> Modération de contenue</h4>
                    <button @click="ResetStats" type="button" title="Fermer" class="close" data-dismiss="modal">&times;</button>
                </div>
        
                <div class="modal-body">
                    <div class="form-group">
                        <label for="TitleMod">Titre : (Minimum 3 Caractères)</label>
                        <input @keyup="VerifyModeratePost" type="text" class="form-control" id="TitleMod" placeholder="Champ de modération" name="TitleMod" v-model="ModerateTitle">
                    </div>
                    <div class="form-group">
                        <label for="ContentMod">Contenue : (Minimum 5 Caractères)</label>
                        <textarea @keyup="VerifyModeratePost" class="form-control" id="ContentMod" placeholder="Champ de modération" name="ContentMod" rows="3" v-model="ModerateContent"></textarea>
                    </div>
                    <div v-if="subOkay && subCompleted" class="alert alert-info">
                        <strong><i class="fas fa-info-circle"></i></strong> {{OnSucess}}.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div v-if="!subOkay && subCompleted" class="alert alert-danger">
                        <strong><i class="fas fa-info-circle"></i></strong> {{OnError}}.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="modal-footer">
                    <button v-if="chkModerate" @click="Submit" type="button" title="Modérer" class="btn btn-warning">Modérer</button>
                    <button @click="ResetStats" type="button" title="Annuler" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                </div>
        
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'WallModeratePost',
    data(){
        return {
            // Variables locales

            // Messages
            OnError:'Une erreur est survenue',
            OnSucess:'Le message à été modéré',
        }
    },

    computed:{

        ...mapGetters([
            // Edit Post
            'chkModerate',
            'ModerateTitle',
            'ModerateContent',

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
        VerifyModeratePost(){
            this.$store.dispatch("VerifyModeratePost");
        },
        Submit(){
            this.$store.dispatch("ModeratePost");
        },
        ResetStats(){
            this.$store.dispatch("ResetFields");
        },
    },

    mounted(){ 
        //
    },

    updated(){
        //
    },
}
</script>