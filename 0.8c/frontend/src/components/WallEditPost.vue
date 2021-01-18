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
            url:this.$store.state.url,
            Connected: this.$store.state.Connected,
            PostId: this.$store.state.CurrentPostId,
            Loading: this.$store.state.Loading,

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
            let TitleEdit = document.getElementById('TitleEdit').value;
            let Content = document.getElementById('ContentEdit').value;
            console.log(this.PostId);

            // Configuration de l'en-tete AXIOS (intégration du token)
            axios.interceptors.request.use(
                config => {
                    config.headers.authorization = `Bearer ${this.Token}`;
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );

            // Initialisation de la promesse vers l'API via AXIOS
            axios.put(this.url+'/api/messages/'+this.PostId,{
                title: TitleEdit,
                content : Content
                })
            .then(res =>{
                // Envoie des données en base
                console.log(res);
                this.bio = BioArea;

                //SubOkay
                this.$store.commit('setBio', BioArea);
                this.subOkay = true;
                this.subCompleted = true;
                this.$store.commit('setLoading',this.Loading = false);
                console.log(this.$store.state.Loading);

                // Sucess
                this.subOkay = true;
                this.subCompleted = true;
                this.chkOK = false;

                // Completed
                document.getElementById('TitleEdit').value = '';
                document.getElementById('ContentEdit').value = '';
                this.subCompleted = true;
                this.$store.commit('setLoading',this.Loading = false);
            })
            .catch(err =>{
                //WIP
                console.log(err);
                this.subFailure = true;
                this.subCompleted = true;
                this.Loading = false;
                this.$store.commit('setLoading',this.Loading = false);
                console.log(this.Loading);
            });
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