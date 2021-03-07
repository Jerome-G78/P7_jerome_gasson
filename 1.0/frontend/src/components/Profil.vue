<template>
    <div>
        <div class="modal" id="profilModal">
            <div class="modal-dialog">
                <div class="modal-content">
            
                    <div class="modal-header">
                        <h4 class="modal-title"><i class="far fa-user"></i> Mon Profil</h4>
                        <button @click="ResetStats" type="button" title="Fermer" class="close" data-dismiss="modal">&times;</button>
                    </div>
            
                    <div class="labelsAlign modal-body">
                        <p> 
                            <strong> Nom : </strong>{{userName}}<br/>
                            <strong> E-mail : </strong>{{Email}}<br/>
                            <strong> Biographie : </strong>{{Bio}}<br/>
                        </p>

                        <div @keyup="checkBio" class="form-group">
                            <label for="Bio"><i class="fas fa-pen"></i> Modifier ma Biographie:</label>
                            <textarea  class="form-control" id="Bio" placeholder="Renseignez ce champ si vous souhiatez changer votre biographie." rows="3"></textarea>
                            <button @click="updateBio" v-if="BioEdit" type="button" title="Mettre à jour" class="btn btn-primary">Mettre à jour</button>

                            <div v-if="subOkay" class="alert alert-success">
                                <strong><i class="fas fa-check-circle"></i></strong> votre profil est à jour.
                                <button @click="ResetStats" type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <hr/>
                        </div>

                        <div v-show="isAdmin" class="form-group">
                            <h5>Options Modérateur</h5>
                            <label for="Search"><i class="fas fa-search"></i> Rechercher un utilisateur</label>
                            <input @keyup="checkNameExist" type="text" class="form-control" id="Search" placeholder="Tapez le nom d'un utilisateur" name="Search">
                            <button @click="addRight" v-if="findUser && !findUserAdmin" type="button" title="Accorder les drois modérateur" class="btn btn-primary" >Accorder</button>
                            <button @click="removeRight" v-if="findUser && findUserAdmin" type="button" title="Supprimer les drois modérateur" class="btn btn-danger" >Retirer</button>

                            <div v-if="RightAdded" class="alert alert-success">
                                <strong><i class="fas fa-check-circle"></i></strong> {{RightAdd}}
                                <button @click="ResetStats" type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div v-if="RightRemoved" class="alert alert-success">
                                <strong><i class="fas fa-check-circle"></i></strong> {{RightRemove}}
                                <button @click="ResetStats" type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>

                        <div v-if="!isAdmin" class="alert alert-info">
                            <strong><i class="fas fa-info-circle"></i></strong> vous n'êtes pas modérateur.
                        </div>
                        
                    </div>

                    <div class="modal-footer">
                        <div v-if="subFailure" class="alert alert-danger">
                            {{MSGfaillure}}
                            <button @click="ResetStats" type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <button type="button" data-toggle="modal" data-target="#ConfirmDeleteProfil" title="Désinscription" class="btn btn-danger" data-dismiss="modal">Désinscription</button>
                        <button @click="GoOut" type="button" title="Déconnexion" class="btn btn-primary" data-dismiss="modal">Déconnexion</button>
                    </div>
            
                </div>
            </div>
        </div>
        <div class="modal" id="ConfirmDeleteProfil">
            <div class="modal-dialog">
                <div class="modal-content">
            
                    <div class="modal-header">
                        <h4 class="modal-title"><i class="fas fa-exclamation-triangle"></i> Suppression de compte</h4>
                        <button @click="ResetStats" type="button" title="Fermer" class="close" data-dismiss="modal">&times;</button>
                    </div>
            
                    <div class="labelsAlign modal-body">
                        <p class="alert alert-danger"> 
                            <strong> Avertissement : </strong> Cette opération est irréversible! <br/>
                            Toutes les informations vous concernant vont être supprimés : <br/>
                            Message(s), Commentaire(s), Mention(s) "J'aime", Bio, Nom, E-mail.
                        </p>

                        <div class="form-group">
                            <!-- <h5>Demande de confirmation</h5> -->
                            <label for="Confirmation"><i class="fas fa-pen"></i> Veuillez confirmer votre demande : </label>
                            <input @keyup="checkConfirm" type="text" class="form-control" id="Confirmation" placeholder="Tapez : J'accepte" name="Confirmation">
                        </div>
                        <div v-if="subFailure" class="alert alert-danger">
                            {{MSGfaillure}}
                            <button @click="ResetStats" type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button @click="Unsubscribe" v-if="ChkConfirm" type="button" title="Confirmer" class="btn btn-danger">Confirmer</button>
                        <button @click="ResetStats" type="button" title="Annuler" class="btn btn-primary" data-dismiss="modal">Annuler</button>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="modal" id="Cleaning">
            <div class="modal-dialog">
                <div class="modal-content">
            
                    <div class="modal-header">
                        <h4 class="modal-title"><i class="fas fa-info-circle"></i> Désinscription </h4>
                        <button @click="ResetStats" type="button" title="Fermer" class="close" data-dismiss="modal">&times;</button>
                    </div>
            
                    <div class="labelsAlign modal-body">
                        <p class="alert alert-success"> 
                            <strong> Confirmation : </strong> Votre compte a bien été supprimé! <br/>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'Profil',

        data(){
            return {
                // Variables locales

                // Messages
                subOK: "Connexion réussi.",
                RightAdd: "Droit accordé à l'utilisateur",
                RightRemove: "Droit supprimé à l'utilisateur",
            }
        },

        computed:{
            // Récupération de l'état des "Getters" pour actualiser la page
            ...mapGetters([
                // Profil
                'Connected',
                'userName',
                'Email',
                'Bio',
                'BioEdit',
                'isAdmin',
                'ChkConfirm',

                //Administration
                'findUser',
                'findUserAdmin',
                'findedUser',
                'RightAdded',
                'RightRemoved',

                // Status
                'Loading',
                'subOkay',
                'subCompleted',

                'subFailure',
                'MSGfaillure'
                

            ]),
        },

        // Création de la logique du module
        methods:{
            checkBio(){     
                this.$store.dispatch("checkBio");
            },
            updateBio(){
                this.$store.dispatch("BioUpdate");
            },
            checkNameExist(){
                this.$store.dispatch("CheckNameExist");
            },
            addRight(){
                this.$store.dispatch("addRight");
            },
            removeRight(){
                this.$store.dispatch("removeRight");
            },
            checkConfirm(){
                this.$store.dispatch("CheckConfirm");
            },
            Unsubscribe(){
                this.$store.dispatch("Unsubscribe");
            },
            ResetStats(){
                this.$store.dispatch("ResetProfilStats");
            },
            GoOut(){
                this.$store.dispatch("GoOut");
            },
        },
    }
</script>