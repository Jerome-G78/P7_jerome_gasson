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
                        <input type="text" class="form-control" id="title" placeholder="Ajoutez un Titre" name="title">
                    </div>

                    <div class="form-group">
                        <label for="Content"> Contenue du message <span class ="text-danger"> * </span> :</label>
                        <textarea class="form-control" id="Content" placeholder="Contenue de votre message" rows="3"></textarea>
                    </div>
                    <p> 
                        Joindre une image :
                        <input id="uploadFile" type="file">
                    </p>

                    <p class ="text-danger"><small><i>* : Champs obligatoires</i></small></p>

                </div>

                <div class="modal-footer">
                    <button type="button" title="Envoyer" class="btn btn-primary" data-dismiss="modal">Envoyer...</button>
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
            Connected: this.$store.state.Connected,
            Loading: this.$store.state.Loading,

            // Variables locales
            subOkay: false,
            subFailure: false,
            subCompleted: false,

            // Messages
            subOK: "Message envoyé! ",
            subFail: "Une erreur est survenue!"
        }
    },
    // Création de la logique du module
    methods:{
        MsgVerify(){

        },
        Post(){
           
        }
    },
}
</script>