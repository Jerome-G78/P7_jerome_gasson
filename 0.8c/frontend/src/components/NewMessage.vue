<template>
    <div class="modal" id="NewMessage">
        <div class="modal-dialog">
            <div class="modal-content">
        
                <div class="modal-header">
                    <h4 class="modal-title"><i class="far fa-newspaper"></i> Poster un message </h4>
                    <button type="button" title="Fermer" class="close" data-dismiss="modal">&times;</button>
                </div>
        
                <div class="modal-body">

                    <div class="form-group">
                        <label for="title">Titre <span class ="text-danger"> * </span>:</label>
                        <input @keyup="MsgVerify" type="text" class="form-control" id="title" placeholder="Ajoutez un Titre" name="title">
                    </div>

                    <div class="form-group">
                        <label for="Content"> Contenue du message <span class ="text-danger"> * </span> :</label>
                        <textarea @keyup="MsgVerify" class="form-control" id="Content" placeholder="Contenue de votre message" rows="3"></textarea>
                    </div>

                    <p class ="text-danger"><small><i>* : Champs obligatoires</i></small></p>

                    <div class="form-group">
                        <input @click="JoinPict" id="Join" type="checkbox"> joindre une image <br/>
                        <input @click="SetPict" v-if="uploadFile" id="uploadFile" type="file">
                    </div>

                    <div v-if="subOkay" class="alert alert-success">
                        {{subOK}}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div v-if="subFailure" class="alert alert-danger">
                        {{subFail}}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                </div>

                <div class="modal-footer">
                    <button @click="Post" v-if="chkCompleted" type="button" title="Envoyer" class="btn btn-primary">Envoyer...</button>
                </div>
        
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NewMessage',
    data(){
        return {
            // Récupération des variables globales dans vue X
            userName: this.$store.state.userName,
            Loading: this.$store.state.Loading,
            Ntitle:this.$store.state.Ntitle,
            Ncontent:this.$store.state.Ncontent,
            Nattachment: this.$store.state.Nattachment,
            Npicture:this.$store.state.Npicture,

            // Variables locales
            chkCompleted: false,
            subOkay: false,
            subFailure: false,
            subCompleted: false,
            uploadFile: false,

            // Messages
            subOK: "Message envoyé!",
            subFail: "Une erreur est survenue!"
        }
    },
    // Création de la logique du module
    methods:{
        MsgVerify(){
            let CHKtitle = document.getElementById("title").value;
            let CHKContent = document.getElementById("Content").value;

            if(CHKtitle !=''){
                this.$store.commit('setNtitle', CHKtitle);
            } else {
                this.$store.commit('setNtitle', '');
            }

            if(CHKContent !=''){
                this.$store.commit('setNcontent', CHKContent);
            } else {
                this.$store.commit('setNcontent', '');
            }

            if(CHKtitle !='' && CHKContent !=''){
                this.chkCompleted = true;
            } else {
                this.chkCompleted = false;
            }

        },

        JoinPict(){
            if(this.uploadFile){
                this.uploadFile = false;
                this.Nattachment = 0;
                this.$store.commit('setNattachment', 0); // Global ?!

            } else {
                this.uploadFile = true;
                this.Nattachment = 1;
                this.$store.commit('setNattachment', 1); // Global ?!
            }
        },

        SetPict(){
            // WIP
        },

        Post(){
           // WIP
           // Sucess
        this.subOkay = true;
        this.chkCompleted = false;

        // Completed
        document.getElementById("Join").checked = false;
        document.getElementById("title").value = '';
        document.getElementById("Content").value ='';

        this.subCompleted = true;
        }
    },
}
</script>