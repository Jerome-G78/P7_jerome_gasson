<template>
    <div class="modal" id="ModerateModal">
        <div class="modal-dialog">
            <div class="modal-content">
        
                <div class="modal-header">
                    <h4 class="modal-title"><i class="fas fa-exclamation-circle"></i> Modération de contenue</h4>
                    <button @click="ResetStats" type="button" title="Fermer" class="close" data-dismiss="modal">&times;</button>
                </div>
        
                <div class=" modal-body">
                    <div class="labelsAlign form-group">
                        <label for="TitleMod">Titre : (Minimum 3 Caractères)</label>
                        <input type="text" class="form-control" id="TitleMod" placeholder="Champ de modération" name="TitleMod" v-model="ModerateTitle" maxlength="255"/>
                    </div>
                    <div v-if="ModerateAttachment !='' && !MDeleteFile" class="form-group">
                        <label for="Picture">Image</label>
                        <img class="col-4 justify-content-center rounded img-fluid d-flex" name="Picture" :src="ModerateAttachment"/>
                        <button @click="RemoveAttachment" type="button" title="Supprimer" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
                    </div>
                    <div class="labelsAlign form-group">
                        <label for="ContentMod">Contenue : (Minimum 5 Caractères)</label>
                        <textarea class="form-control" id="ContentMod" placeholder="Champ de modération" name="ContentMod" rows="3" v-model="ModerateContent" maxlength="255"></textarea>
                    </div>
                    <div v-if="subOkay && subCompleted" class="alert alert-info">
                        <strong><i class="fas fa-info-circle"></i></strong> {{OnSucess}}.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div v-if="(!subOkay && subCompleted)" class="alert alert-danger">
                        <strong><i class="fas fa-info-circle"></i></strong> {{OnError}}.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div v-if="subFailure" class="alert alert-danger">
                        {{MSGfaillure}}
                        <button @click="MsgVerify" type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="modal-footer">
                    <button @click="Submit" type="button" title="Modérer" class="btn btn-warning">Modérer</button>
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
            // Récupération de l'état des "Getters" pour actualiser la page
            ...mapGetters([
                // Moderate Post
                'chkModerate',
                'ModerateTitle',
                'ModerateContent',
                'ModerateAttachment',
                'MDeleteFile',

                // Status
                'WallReload',
                'Loading',
                'subOkay',
                'subCompleted',

                'subFailure',
                'MSGfaillure'
            ]),
        },

        // Création de la logique du module
        methods:{
            MsgVerify(){
                this.$store.dispatch("MsgVerifyFail");
            },

            RemoveAttachment(){
                this.$store.dispatch("RemoveMAttachment");
            },
            Submit(){
                this.$store.dispatch("VerifyModeratePost");
            },
            ResetStats(){
                this.$store.dispatch("ResetFields");
            },
        },
    }
</script>

<style scoped>
    /* Ajustement du Design Mobile 320px à 574px */
    @media screen and (min-width:360px) and (max-width:574px) and (orientation: portrait)       /* 20em - Mobiles           */
    {
        h4
        {
            font-size : 1.3em;
        }

        input, textarea, label
        {
            font-size : 1.1em;
        }

        .alert 
        {
            font-size : 0.745em;
        }
    }
    @media screen and (min-width:320px) and (max-width:359px) and (orientation: portrait)       /* 20em - Mobiles           */
    {
        h4
        {
            font-size : 1.12em;
        }

        input, textarea, label
        {
            font-size : 0.97em;
        }

        .alert 
        {
            font-size : 0.62em;
        }
    }
</style>