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
                        <input @keyup="ModerateVerify" type="text" class="form-control" id="TitleMod" placeholder="Champ de modération" name="TitleMod" v-model="Data.EditTitle">
                    </div>
                    <div class="form-group">
                        <label for="ContentMod">Contenue : (Minimum 5 Caractères)</label>
                        <textarea @keyup="ModerateVerify" class="form-control" id="ContentMod" placeholder="Champ de modération" rows="3" v-model="Data.EditContent"></textarea>
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
                    <button @click="Submit" v-if="chkOK" type="button" title="Modérer" class="btn btn-warning">Modérer</button>
                    <button @click="ResetStats" type="button" title="Annuler" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                </div>
        
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WallModeratePost',
    data(){
        return {
            // Variables locales
            CHKtitle: false,
            CHKcontent: false,
            chkOK: false,
            
            subOkay: false,
            subFailure: false,
            subCompleted: false,

            // Messages
            OnError:'Une erreur est survenue',
            OnSucess:'Le message à été modéré',
        }
    },

    computed:{
        Data(){
            return {
            urlAPI:this.$store.state.urlAPI,
            userName: this.$store.state.userName,
            Connected: this.$store.state.Connected,
            Loading: this.$store.state.Loading,
            WallReload: this.$store.state.WallReload,
            isAdmin: this.$store.state.isAdmin,
            Token: this.$store.state.Token,

            EditTitle: this.$store.state.Etitle,
            EditContent: this.$store.state.Econtent,
            PostId:this.$store.state.PostId,
            }
        },
    },

    // Création de la logique du module
    methods:{
        ModerateVerify(){
            let Title = document.getElementById('TitleMod').value;
            let Content = document.getElementById('ContentMod').value;
            console.log(Title, Content);

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
            let TitleMod = document.getElementById('TitleMod').value;
            let ContentMod = document.getElementById('ContentMod').value;

            // Configuration de l'en-tete AXIOS (intégration du token)
            axios.interceptors.request.use(
                config => {
                    config.headers.authorization = `Bearer ${this.Data.Token}`;
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );

            // Initialisation de la promesse vers l'API via AXIOS
            if(this.Data.isAdmin){
                axios.put(this.Data.urlAPI+'/api/messages/'+this.Data.PostId+'/moderate',{
                title : TitleMod,
                content : ContentMod
                })
                .then(res =>{
                    // Envoie des données en base
                    console.log(res);

                    //SubOkay
                    this.subOkay = true;
                    this.subCompleted = true;
                    this.$store.commit('setLoading', false);
                    console.log(this.$store.state.Loading);

                    // Sucess
                    this.subOkay = true;
                    this.subCompleted = true;
                    this.chkOK = false;

                    // Completed
                    this.subCompleted = true;
                    this.$store.commit('setLoading',false);
                    this.ResetStats();

                    $('#ModerateModal').modal('hide');
                    this.$store.commit('setWallReload', true);
                    console.log(this.Data.WallReload);
                })
                .catch(err =>{
                    //WIP
                    console.log(err);
                    this.subFailure = true;
                    this.subCompleted = true;
                    this.$store.commit('setLoading',false);
                    console.log(this.Data.Loading);
                });

            } else {
                this.subFailure = true;
                this.subCompleted = true;
                this.$store.commit('setLoading',false);
                console.log(this.Data.Loading);
            }
            
        },

        ResetStats(){
            this.EditTitle = this.$store.state.Etitle;
            console.log(this.EditTitle);
            this.EditContent = this.$store.state.Econtent;
            console.log(this.EditContent);
            this.subFailure = false;
            this.subOkay = false;
            this.subCompleted = false;
            this.chkOK = false;
            return this.$store.state.Etitle, this.$store.state.Econtent;
        }
    },

    mounted(){ 
        //
    }
}
</script>