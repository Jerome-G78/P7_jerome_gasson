<template>
    <div class="modal" id="EditModal">
        <div class="modal-dialog">
            <div class="modal-content">
        
                <div class="modal-header">
                    <h4 class="modal-title"><i class="fas fa-pen"></i> Edition de contenue</h4>
                    <button @click="ResetStats" type="button" title="Fermer" class="close" data-dismiss="modal">&times;</button>
                </div>
        
                <div class="modal-body">
                    <div class="labelsAlign form-group">
                        <label for="TitleEdit">Titre (Minimum 3 Caractères) :</label>
                        <input type="text" class="form-control" id="TitleEdit" placeholder="Champ d'édition" name="TitleEdit" v-model="EditTitle" maxlength="255"/>
                    </div>
                    <div v-if="EditAttachment !='' && !EDeleteFile" class="form-group">
                        <label for="Picture"> Image </label>
                        <img class="col-4 justify-content-center rounded img-fluid d-flex" name="Picture" :src="EditAttachment"/>
                        <button @click="RemoveAttachment" type="button" title="Supprimer" class="btn btn-danger"><i class="far fa-trash-alt"></i></button><br/>
                    </div>

                    <div v-show="EditAttachment ==''">
                        <img v-if="uploadFile && Npicture !=''" class="col-12 justify-content-center rounded img-fluid d-flex" name="Picture" :src="Npicture"/>
                        <input @change="handleFileUpload" type="file" name="File" id="EdituploadFile"> <br/>
                    </div>

                    <div class="labelsAlign form-group">
                        <label for="ContentEdit">Contenue (Minimum 5 Caractères) :</label>
                        <textarea class="form-control" id="ContentEdit" placeholder="Champ d'édition" name="ContentEdit" rows="3" v-model="EditContent" maxlength="255"></textarea>
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
                    <div v-if="subFailure" class="alert alert-danger">
                        {{MSGfaillure}}
                        <button @click="MsgVerify" type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="modal-footer">
                    <button @click="Submit" type="button" title="Editer" class="btn btn-primary">Editer</button>
                    <button @click="ResetStats" type="button" title="Annuler" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                </div>
        
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'WallEditPost',
        data(){
            return {
                // Variables locales

                // Messages
                OnError:'Une erreur est survenue',
                OnSucess:'Le message à été modifié',
            }
        },

        computed:{
            // Récupération de l'état des "Getters" pour actualiser la page
            ...mapGetters([
                // Edit Post
                'chkEdit',
                'EditTitle',
                'EditContent',
                'EditAttachment',
                'EDeleteFile',
                'uploadFile',
                'Npicture',

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
                this.$store.dispatch("RemoveEAttachment");
            },

            handleFileUpload(){
                let Stat = document.getElementById('EdituploadFile').value;
                if(Stat !='Aucun fichier choisi'){
                    this.$store.dispatch("EditUploadPreview");
                } else {
                    this.$store.dispatch("EditDeletePreview");
                }
            },

            Submit(){
                this.$store.dispatch("VerifyEditPost");
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
            font-size : 1.3em;
        }

        input, textarea, label
        {
            font-size : 0.97em;
        }

        .alert 
        {
            font-size : 0.591em;
        }
    }
</style>