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
                        <label for="TitleEdit">Titre : (Minimum 3 Caractères)</label>
                        <input type="text" class="form-control" id="TitleEdit" placeholder="Champ d'édition" name="TitleEdit" v-model="EditTitle">
                    </div>
                    <div v-if="EditAttachment !='' && !EDeleteFile" class="form-group">
                        <label for="Picture"> Image </label>
                        <img class="col-4 justify-content-center rounded img-fluid d-flex" name="Picture" :src="EditAttachment"/>
                        <button @click="RemoveAttachment" type="button" title="Supprimer" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
                        <button @click="ModifyAttachment" type="button" title="Remplacer" class="btn btn-primary"><i class="fas fa-sync-alt"></i></button>
                    </div>
                    <div class="labelsAlign form-group">
                        <label for="ContentEdit">Contenue (Minimum 5 Caractères):</label>
                        <textarea class="form-control" id="ContentEdit" placeholder="Champ d'édition" name="ContentEdit" rows="3" v-model="EditContent"></textarea>
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
        
        ...mapGetters([
            // Edit Post
            'chkEdit',
            'EditTitle',
            'EditContent',
            'EditAttachment',
            'EDeleteFile',

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
        RemoveAttachment(){
            this.$store.dispatch("RemoveEAttachment");
        },
        ModifyAttachment(){
            this.$store.dispatch("");
        },
        Submit(){
            this.$store.dispatch("VerifyEditPost");
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