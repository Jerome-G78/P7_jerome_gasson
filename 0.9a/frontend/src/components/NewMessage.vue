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
                        <input @keyup="MsgVerify" type="text" class="form-control" id="Title" placeholder="Ajoutez un Titre" name="title" v-model="Data.Ntitle">
                    </div>

                    <div class="form-group">
                        <label for="Content"> Contenue du message (Minimum 5 Caractères) <span class ="text-danger"> * </span> :</label>
                        <textarea @keyup="MsgVerify" class="form-control" id="Content" placeholder="Contenue de votre message" rows="3" v-model="Data.Ncontent"></textarea>
                    </div>

                    <p class ="text-danger"><small><i>* : Champs obligatoires</i></small></p>

                    <div class="form-group">
                        <input @click="JoinPict" id="Join" type="checkbox"> joindre une image <br/>
                        <input v-if="uploadFile" id="uploadFile" type="file">
                    </div>

                    <div v-if="subOkay" class="alert alert-success">
                        {{subOK}}
                        <button @click="ResetStats" type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div v-if="subFailure" class="alert alert-danger">
                        {{subFail}}
                        <button @click="ResetStats" type="button" class="close" data-dismiss="alert" aria-label="Close">
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
            urlAPI:this.$store.state.urlAPI,
            // Récupération des variables globales dans vue X
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

    computed:{
        Data(){
            return {
                urlAPI:this.$store.state.urlAPI,

                // Status
                Connected: this.$store.state.Connected,
                Loading: this.$store.state.Loading,
                WallReload: this.$store.state.WallReload,

                Ntitle:this.$store.state.Ntitle,
                Ncontent:this.$store.state.Ncontent,
                Npicture:this.$store.state.Npicture,
                Nattachment: this.$store.state.Nattachment,

                // User
                userName: this.$store.state.userName,
                email:this.$store.state.email,
                bio:this.$store.state.bio,
                isAdmin: this.$store.state.isAdmin,
                Token: this.$store.state.Token,
            }
        },
    },

    // Création de la logique du module
    methods:{
        MsgVerify(){
            let CHKtitle = document.getElementById("Title").value;
            let CHKContent = document.getElementById("Content").value;
            console.log(CHKtitle, CHKContent);

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
                this.$store.commit('setNattachment', 0);
                this.$store.commit('setNpicture','');
                console.log(this.Nattachment);

            } else {
                this.uploadFile = true;
                this.Nattachment = 1;
                this.$store.commit('setNattachment', 1);
                console.log(this.Data.Nattachment);
            }
        },

        Post(){
            console.log(this.Data.Ntitle, this.Data.Ncontent, this.uploadFile, this.Data.Nattachment);
            this.$store.commit('setLoading', true);
            console.log(this.Data.Loading);

            if(this.Data.Nattachment == 1){
                console.log('Attatched');
                // Récupération du fichier Image
                let formData = new FormData();
                let imageFile = document.querySelector("#uploadFile");
                // console.log(imageFile.value, imageFile.files[0]);
                formData.append("image",imageFile.files[0]);
                // Ajout des autres éléments au FormData ( title, content, attachment )
                formData.append("title",document.getElementById("Title").value);
                formData.append("content",document.getElementById("Content").value);
                formData.append("attachment",1);
                // console.log(FormData);

                // Configuration de l'en-tete AXIOS (intégration du token)
                axios.interceptors.request.use(
                    config => {
                       config.headers = {
                           'authorization': `Bearer ${this.Data.Token}`,
                           'Accept': 'application/json',
                           'Content-Type':'multipart/form-data;boundary="WebKitFormBoundary"'
                       }
                        return config;
                    },
                    error => {
                        return Promise.reject(error);
                    }
                );

                // Initialisation de la promesse vers l'API via AXIOS
                axios.post(this.urlAPI+'/api/messages/new/',formData)
                .then(res =>{
                    // Sucess
                    this.subOkay = true;
                    this.chkCompleted = false;

                    // Completed
                    document.getElementById("Join").checked = false;
                    document.getElementById("Title").value = '';
                    document.getElementById("Content").value ='';
                    this.subCompleted = true;
                    this.Nattachment = 0;
                    this.chkCompleted = false;
                    this.subFailure = false;
                    this.uploadFile = false;
                    this.subOkay = false;
                    this.subCompleted = false;
                    this.ResetStats();

                    this.$store.commit('setLoading', false);
                    console.log(this.Data.Loading);

                    $('#NewMessage').modal('hide');
                    this.$store.commit('setWallReload', true);
                    console.log(this.Data.WallReload);

                })
                .catch(err =>{
                    console.log(err);
                    this.subFailure = true;
                    // this.subFail = err.error;
                    this.$store.commit('setLoading', false);
                    console.log(this.Data.Loading);
                });

            } else {
                console.log('NoAttatched');
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
                axios.post(this.urlAPI+'/api/messages/new/', {
                    title: document.getElementById("Title").value,
                    content: document.getElementById("Content").value
                })
                .then(res =>{
                    // Sucess
                    this.subOkay = true;
                    this.chkCompleted = false;

                    // Completed
                    document.getElementById("Join").checked = false;
                    document.getElementById("Title").value = '';
                    document.getElementById("Content").value ='';
                    this.subCompleted = true;

                    this.$store.commit('setLoading', false);
                    console.log(this.Data.Loading);
                    this.ResetStats();

                    $('#NewMessage').modal('hide');

                    // Recharger le mur
                    this.$store.commit('setWallReload', true);
                    console.log(this.Data.WallReload);

                })
                .catch(err =>{
                    console.log(err);
                    this.subFailure = true;
                    // this.subFail = err.error;
                    this.$store.commit('setLoading', false);
                    console.log(this.Data.Loading);
                });

            }
        },

        ResetStats(){
            console.log('Reset...');
            this.$store.commit('setNtitle', '');
            console.log(this.$store.state.Ntitle);
            this.$store.commit('setNcontent', '');
            console.log(this.$store.state.Ncontent);
            document.getElementById("Join").checked = false;
            this.Nattachment = 0,
            this.chkCompleted = false;
            this.subFailure = false;
            this.uploadFile = false
            this.subOkay = false;
            this.subCompleted = false;
            this.$store.commit('setLoading',false);
        }
    },
    mounted(){
        document.getElementById('Title').value = '';
        this.$store.commit('setNtitle', '');
        document.getElementById('Content').value = '';
        this.$store.commit('setNcontent', '');
        document.getElementById("Join").checked = false;
        this.Nattachment = 0,
        this.chkCompleted = false;
        this.subFailure = false;
        this.uploadFile = false
        this.subOkay = false;
        this.subCompleted = false;
        this.$store.commit('setLoading',false);
    }
}
</script>