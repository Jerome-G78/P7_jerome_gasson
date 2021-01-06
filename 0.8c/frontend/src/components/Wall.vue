<template>
    <!-- Wall START -->
	<div class="spinner-border text-primary text-center" id="WallLoad">
        <p>Chargement des messages... </p>
    </div>
    <!-- POST START-->
    <div class="row justify-content-center">
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
                    <div class="col-9 form-group">
                        <label for="comment">Commentaire</label>
                        <input type="text" class="form-control" id="comment" placeholder="Commentez!" name="comment">
                    </div>
                    <div class="col-3 align-items-center">
                        <button type="button" title="Envoyer" class="btn btn-primary text-center"><i class="far fa-paper-plane"></i></button>
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
    <!-- Wall END -->
    <!-- Modals EDIT/MOD START -->

    <div class="modal" id="EditModal">
        <div class="modal-dialog">
            <div class="modal-content">
        
                <div class="modal-header">
                    <h4 class="modal-title"><i class="fas fa-pen"></i> Edition de contenue</h4>
                    <button type="button" title="Fermer" class="close" data-dismiss="modal">&times;</button>
                </div>
        
                <div class="modal-body">
                    <p> Work In Progress ...</p>
                    <div class="form-group">
                        <label for="TitleEdit">Titre :</label>
                        <input type="email" class="form-control" id="TitleEdit" placeholder="Champ d'édition" name="TitleEdit">
                    </div>
                    <div class="form-group">
                        <label for="ContentEdit">Contenue :</label>
                        <textarea class="form-control" id="ContentEdit" placeholder="Champ d'édition" rows="3"></textarea>
                    </div>
                    <div class="alert alert-info">
                        <strong><i class="fas fa-info-circle"></i></strong> ...
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" title="Editer" class="btn btn-primary">Editer</button>
                    <button type="button" title="Annuler" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                </div>
        
            </div>
        </div>
    </div>

    <div class="modal" id="ModerateModal">
        <div class="modal-dialog">
            <div class="modal-content">
        
                <div class="modal-header">
                    <h4 class="modal-title"><i class="fas fa-exclamation-circle"></i> Modération de contenue</h4>
                    <button type="button" title="Fermer" class="close" data-dismiss="modal">&times;</button>
                </div>
        
                <div class="modal-body">
                    <p> Work In Progress ...</p>
                    <div class="form-group">
                        <label for="TitleMod">Titre :</label>
                        <input type="email" class="form-control" id="TitleMod" placeholder="Champ de modération" name="TitleMod">
                    </div>
                    <div class="form-group">
                        <label for="ContentMod">Contenue :</label>
                        <textarea class="form-control" id="ContentMod" placeholder="Champ de modération" rows="3"></textarea>
                    </div>
                    <div class="alert alert-info">
                        <strong><i class="fas fa-info-circle"></i></strong> ...
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" title="Modérer" class="btn btn-warning">Modérer</button>
                    <button type="button" title="Annuler" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                </div>
        
            </div>
        </div>
    </div>
    <!-- Modals EDIT/MOD END -->
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
            Connected: this.$store.state.Connected
        }
    }
}
</script>