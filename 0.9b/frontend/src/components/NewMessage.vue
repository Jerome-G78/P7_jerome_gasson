<template>
    <div class="modal" id="NewMessage">
        <div class="modal-dialog">
            <div class="modal-content">
        
                <div class="modal-header Titlebackground">
                    <h4 class="modal-title"><i class="far fa-newspaper"></i> Poster un message </h4>
                    <button @click="ResetStats" type="button" title="Fermer" class="close" data-dismiss="modal">&times;</button>
                </div>
        
                <div class="labelsAlign modal-body">

                    <div class="form-group">
                        <label for="title">Titre (Minimum 3 Caractères) <span class ="text-danger"> * </span>:</label>
                        <input type="text" class="form-control" id="Title" placeholder="Ajoutez un Titre" name="title" v-model="Ntitle">
                    </div>

                    <div class="form-group">
                        <label for="File"> Image/Photo (Faclultatif) </label>
                        <input v-show="!uploadFile" type="file" name="File" id="uploadFile"> <br/>
                        <input @click="handleFileUpload" id="Join" type="checkbox"> joindre une image
                        <img v-if="uploadFile && Npicture !=''" class="col-12 justify-content-center rounded img-fluid d-flex" name="Picture" :src="Npicture"/>
                    </div>

                    <div class="form-group">
                        <label for="Content"> Contenue du message (Minimum 5 Caractères) <span class ="text-danger"> * </span> :</label>
                        <textarea class="form-control" id="Content" placeholder="Contenue de votre message" rows="3" v-model="Ncontent"></textarea>
                    </div>

                    <p class ="text-danger"><small><i>* : Champs obligatoires</i></small></p>

                    <div v-if="subOkay" class="alert alert-success">
                        {{subOK}}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div v-if="subFailure" class="alert alert-danger">
                        {{subFail}}
                        <button @click="MsgVerify" type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                </div>

                <div class="modal-footer">
                    <button @click="Post" type="button" title="Envoyer" class="btn btn-primary">Envoyer...</button>
                    <button @click="ResetStats" type="button" title="Annuler" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                </div>
        
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'NewMessage',
    data(){
        return {
            // Messages
            subOK: "Message envoyé!",
            subFail: "Une erreur est survenue!",
        }
        
    },

    computed:{
        ...mapGetters([
            // New Message
            'Ntitle',
            'Ncontent',
            'chkCompleted',
            'uploadFile',
            'Npicture',

            // Status
            'Loading',
            'subOkay',
            'subFailure',
            'subCompleted'
        ]),
    },

    // Création de la logique du module
    methods:{
        MsgVerify(){
            this.$store.dispatch("MsgVerifyFail");
        },

        handleFileUpload(){
            let Stat = document.getElementById("Join").checked;
            if(Stat){
                this.$store.dispatch("UploadPreview");
            } else {
                this.$store.dispatch("DeletePreview");
            }
        },

        Post(){
            console.log("OK");
            this.$store.dispatch("MsgVerify");
        },

        ResetStats(){
            this.$store.dispatch("ResetNewMsgStats");
        }
    },
    mounted(){
        this.$store.dispatch("ResetNewMsgStats");
    }
}
</script>