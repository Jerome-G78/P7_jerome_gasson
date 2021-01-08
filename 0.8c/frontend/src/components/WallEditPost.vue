<template>
    <div class="modal" id="EditModal">
        <div class="modal-dialog">
            <div class="modal-content">
        
                <div class="modal-header">
                    <h4 class="modal-title"><i class="fas fa-pen"></i> Edition de contenue</h4>
                    <button @click="ResetStats" type="button" title="Fermer" class="close" data-dismiss="modal">&times;</button>
                </div>
        
                <div class="modal-body">
                    <p> Work In Progress ...</p>
                    <div class="form-group">
                        <label for="TitleEdit">Titre :</label>
                        <input @keyup="EditVerify" type="text" class="form-control" id="TitleEdit" placeholder="Champ d'édition" name="TitleEdit">
                    </div>
                    <div class="form-group">
                        <label for="ContentEdit">Contenue :</label>
                        <textarea @keyup="EditVerify" class="form-control" id="ContentEdit" placeholder="Champ d'édition" rows="3"></textarea>
                    </div>
                    <div v-if="subOkay && subCompleted" class="alert alert-info">
                        <strong><i class="fas fa-info-circle"></i></strong> {{OnSucess}}.
                        <button @click="ResetStats" type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div v-if="!subOkay && subCompleted" class="alert alert-danger">
                        <strong><i class="fas fa-info-circle"></i></strong> {{OnError}}.
                        <button @click="ResetStats" type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="modal-footer">
                    <button @click="Submit" v-if="chkOK" type="button" title="Editer" class="btn btn-primary">Editer</button>
                    <button @click="ResetStats" type="button" title="Annuler" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                </div>
        
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WallEditPost',
    data(){
        return {
            // Récupération des variables dans vue X
            Connected: this.$store.state.Connected,

            // Variables locales
            CHKtitle: false,
            CHKcontent: false,
            chkOK: false,
            
            subOkay: false,
            subFailure: false,
            subCompleted: false,

            // Messages
            OnError:'Une erreur est survenue',
            OnSucess:'Le message à été modifié',
        }
    },
    // Création de la logique du module
    methods:{
        EditVerify(){
            let Title = document.getElementById('TitleEdit').value;
            let Content = document.getElementById('ContentEdit').value;

            if(Title !=''){
                this.CHKtitle = true;
            } else {
                this.CHKtitle = false;
            }
            if(Content !=''){
                this.CHKcontent = true;
            } else {
                this.CHKcontent = false;
            }
            if(this.CHKtitle && this.CHKcontent){
                this.chkOK = true;
            } else {
                this.chkOK = false;
            }
        },
        Submit(){
            // Sucess
            document.getElementById('TitleEdit').value = '';
            document.getElementById('ContentEdit').value = '';
            this.subOkay = true;
            this.subCompleted = true;
            this.chkOK = false;

            // Faillure
            /*
            this.subFailure = true;
            this.subCompleted = true;
            */
        },
        ResetStats(){
            // WIP
            document.getElementById('TitleEdit').value = '';
            document.getElementById('ContentEdit').value = '';
            this.subFailure = false;
            this.subOkay = false;
            this.subCompleted = false;
            this.chkOK = false;
        }
    }
}
</script>