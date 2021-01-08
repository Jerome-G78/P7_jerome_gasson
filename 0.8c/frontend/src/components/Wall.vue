<template>
	<div v-if="Loading" class="spinner-border text-primary text-center" id="WallLoad">
        <p>Chargement des messages... </p>
    </div>
    <!-- POST START-->
    <div class="row justify-content-center">
        <br/>
        <div class="col-11 col-sm-9 col-md-6 bg-info text-white media border p-4 m-0" id="">
            <div class="media-body">
                <h4>[Utilisateur] <small><i>(Posté le [Date])</i></small></h4>
                <hr>
                <h5><i>[Title]</i></h5>
                <img class="rounded img-fluid d-flex" src="../assets/ps3wave.jpg"/>
                <p>[Content...]</p><br/>
                <hr v-if="Connected">
                <div id="EditContent" class="row justify-content-center">
                    <button v-if="Connected" type="button" title="J'aime" class="btn btn-primary text-center"><i class="far fa-thumbs-up"></i> 0</button>
                    <button v-if="Connected && ownMessage" type="button" title="Editer" class="btn btn-primary text-center" data-toggle="modal" data-target="#EditModal"><i class="fas fa-pen"></i></button>
                    <button v-if="Connected && isAdmin" type="button" title="Modérer" class="btn btn-danger text-center" data-toggle="modal" data-target="#ModerateModal"><i class="fas fa-exclamation-circle"></i></button>
                    <button v-if="Connected && (isAdmin || ownMessage)" type="button" title="Supprimer" class="btn btn-danger text-center"><i class="far fa-trash-alt"></i></button>
                </div>
                <hr v-if="Connected">
                <div id="Comment" v-if="Connected" class="row justify-content-start">
                    <div v-if="Connected" class="col-9 form-group">
                        <label for="comment">Commentaire</label>
                        <input @keyup="CommentVerify" type="text" class="form-control" id="comment" placeholder="Commentez!" name="comment">
                    </div>
                    <div class="col-3 align-items-center">
                        <button @click="Submit" v-if="ValueComment" type="button" title="Envoyer" class="btn btn-primary text-center"><i class="far fa-paper-plane"></i></button>
                    </div>
                </div>
                <hr>

                <div id="PostedComments" class="row justify-content-end">
                    <div class="col-9">
                        <p>
                            <i>[Username - [Date]]</i><br/>
                            [Comment... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...]
                        </p>
                    </div>
                    <div class="col-3">
                        <button v-if="Connected && (isAdmin || ownMsg)" type="button" title="Supprimer" class="btn btn-danger text-center"><i class="far fa-trash-alt"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- POST END -->
</template>

<script>
export default {
    name: 'Wall',
    el: "#EditContent",
    data(){
        return {
            // Récupération des variables dans vue X
            isAdmin: this.$store.state.isAdmin,
            ownMessage: this.$store.state.ownMessage,
            Connected: this.$store.state.Connected,
            Loading: this.$store.state.Loading,

            // Variables Local
            CHKcomment : false,
            ValueComment: false,
        }
    },
    // Création de la logique du module
    methods:{
        CommentVerify(){
            let Comment = document.getElementById('comment').value;

            if(Comment !=''){
                this.ValueComment = true;
            } else {
                this.ValueComment = false;
            }
        },
        Submit(){
            // Sucess
            document.getElementById('comment').value = '';
            this.ValueComment = false;
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