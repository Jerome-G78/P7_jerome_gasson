<template>
    <div class="modal" id="registrationModal">
        <div class="modal-dialog">
            <div class="modal-content">
        
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title"> <i class="far fa-address-card"></i> Formulaire d'inscription</h4>
                    <button @click="ResetStats" type="button" title="Fermer" class="close" data-dismiss="modal">&times;</button>
                </div>
        
                <!-- Modal body -->
                <div class="modal-body">
                    <form action="/action_page.php">
                        <div class="form-group">
                            <label for="Semail">Email <span class ="text-danger"> * </span>:</label>
                            <input @keyup="SingInVerify" type="email" class="form-control" id="Semail" placeholder="Tom@centuryFlop.com" name="email"><br/>
                            <span class="alert alert-info" v-if="!CHKeMail"><strong><i class="fas fa-info-circle"></i></strong> {{email}}</span>
                        </div>

                        <div class="form-group">
                            <label for="Sname">Nom d'utilisateur/Pseudo (entre 5 et 15 caractères) <span class ="text-danger"> * </span>:</label>
                            <input @keyup="SingInVerify" type="text" class="form-control" id="Sname" placeholder="Ex. Lewis" name="name" maxlength="15"><br/>
                            <span class="alert alert-info" v-if="!CHKuserName"><strong><i class="fas fa-info-circle"></i></strong> {{username}}</span>
                        </div>

                        <div class="form-group">
                            <label for="Spwd">Mot de Passe (au moins 8 caractères) <span class ="text-danger"> * </span>:</label>
                            <input @keyup="SingInVerify" type="password" class="form-control" id="Spwd" placeholder="Renseignez un mot de passe" name="pswd"><br/>
                            <span class="alert alert-info" v-if="!CHKpassword"><strong><i class="fas fa-info-circle"></i></strong> {{Mdp}}</span>
                        </div>

                        <div class="form-group">
                            <label for="SpwdC">Confirmez le Mot de Passe <span class ="text-danger"> * </span>:</label>
                            <input @keyup="SingInVerify" type="password" class="form-control" id="SpwdC" placeholder="Confirmez le mot de passe" name="pswdC"><br/>
                            <span class="alert alert-warning" v-if="ComparePwds"><strong><i class="fas fa-info-circle"></i></strong> {{MDPFail}}</span>
                        </div>
                        
                        <div class="form-group">
                            <label for="Sbio">Ma biographie:</label>
                            <textarea class="form-control" id="SBio" placeholder="Racontez-nous! Qui êtes vous? (facultatif)" rows="3"></textarea>
                            <p class ="text-danger"><small><i>* : Champs obligatoires</i></small></p>
                        </div>

                    </form>
                </div>
        
                <!-- Modal footer -->
                <div class="modal-footer">
                    <button @click="Subscribe" v-if="CHKeMail && CHKuserName && CHKpassword && !subOkay && !subFailure" type="submit" title="M'inscrire" class="btn btn-primary">M'inscrire...</button>
                </div>
                <div v-if="subOkay" class="alert alert-success">
                    {{subOK}}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
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
        </div>
    </div>
</template>

<script>
export default {
    name: 'SignIn',
    data(){
        return {
            // Récupération des variables globales dans vue X
            urlAPI:this.$store.state.urlAPI,
            userName: this.$store.state.userName,
            Connected: this.$store.state.Connected,
            CHKeMail: this.$store.state.CHKeMail,
            CHKpassword: this.$store.state.CHKpassword,
            ComparePwds: this.$store.state.ComparePwds,
            CHKuserName: this.$store.state.CHKuserName,
            Loading: this.$store.state.Loading,

            // Variables locales
            subOkay: false,
            subFailure: false,
            subCompleted: false,

            // Messages
            email: "Veuillez renseigner un e-mail",
            username: "Veuillez renseigner un nom d'utilisateur / Pseudo",
            Mdp: "Celui-ci doit contenir : 1 Majuscule, 1 Minuscule, 1 Nombre",
            MDPFail: "Les mots de passes ne sont pas identiques",
            subOK: "Votre inscription a bien été prise en compte",
            subFail: "Une erreur est survenue lors de l'inscription!"

        }
    },
    // Création de la logique du module
    methods:{
        SingInVerify(){
            let Email = document.getElementById('Semail').value;
            let Pwd = document.getElementById('Spwd').value;
            let PwdC = document.getElementById('SpwdC').value;
            let Name = document.getElementById('Sname').value;
            console.log(Email, Pwd, PwdC, Name);


            if(Email !=''){
                this.$store.commit('setCHKeMail',this.CHKeMail = true);

            } else {
                this.$store.commit('setCHKeMail',this.CHKeMail = false);
            }

            if(Name !=''){
                this.$store.commit('setCHKuserName', this.CHKuserName = true);
            } else {
                this.$store.commit('setCHKuserName', this.CHKuserName = false);
            }

            if(Pwd !='' && PwdC !='' && (Pwd == PwdC)){
                this.$store.commit('setComparePwds', this.ComparePwds = false);
                this.$store.commit('setCHKpassword', this.CHKpassword = true);
            }
            if(Pwd !='' && PwdC !='' && (Pwd != PwdC)){
                this.$store.commit('setComparePwds', this.ComparePwds = true);
            }
            if(Pwd=='' || PwdC=='') {
                this.$store.commit('setCHKpassword', this.CHKpassword = false);
            }
        },
        Subscribe(){
            this.$store.commit('setLoading',this.Loading = true);
            console.log(this.Loading);
            let Email = document.getElementById('Semail').value;
            let Pwd = document.getElementById('Spwd').value;
            let Name = document.getElementById('Sname').value;
            let Bio = document.getElementById('SBio').value;

            // Initialisation de la promesse vers l'API via AXIOS
            axios.post(this.urlAPI+'/api/users/register/', {
                email : Email,
                username : Name,
                password : Pwd,
                bio : Bio
            }).then(res => {
                console.log(res);
                this.subOkay = true;
                // Cleaning
                document.getElementById('Semail').value = '';
                document.getElementById('Spwd').value = '';
                document.getElementById('SpwdC').value = '';
                document.getElementById('Sname').value = '';
                document.getElementById('SBio').value = '';

                // Completed
                this.subCompleted = true;
                this.$store.commit('setLoading',this.Loading = false);
                console.log(this.Loading);

                // Masquer la fenêtre Modal
                $('#registrationModal').modal('hide');

            })
            .catch(err => {
            //WIP
            console.log(err);
            this.subFailure = true;
            // Cleaning
            document.getElementById('Spwd').value = '';
            document.getElementById('SpwdC').value = '';
            this.$store.commit('setLoading',this.Loading = false);

            // Completed
            this.subCompleted = true;
            this.$store.commit('setLoading',this.Loading = false);
            console.log(this.Loading);
            });
        },
        ResetStats(){
            // WIP
            document.getElementById('Semail').value = '';
            document.getElementById('Spwd').value = '';
            document.getElementById('SpwdC').value = '';
            document.getElementById('Sname').value = '';
            document.getElementById('SBio').value = '';
            this.subFailure = false;
            this.subOkay = false;
            this.subCompleted = false;
            this.chkOK = false;
            this.CHKeMail = false;
            this.$store.commit('setCHKeMail',this.CHKeMail = false);
            this.CHKpassword = false;
            this.$store.commit('setCHKpassword', this.CHKpassword = false);
            this.CHKuserName = false;
            this.$store.commit('setCHKuserName', this.CHKuserName = false);
        }
    },
}
</script>