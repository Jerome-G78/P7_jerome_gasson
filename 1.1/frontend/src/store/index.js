import { createStore } from 'vuex'

export default createStore({
    state: {
        // Paramètres généraux
        // urlAPI: 'https://shadsoft.fr:3443',
        urlAPI: 'http://localhost:3000',
        footer: 'Groupomania 2021 - Tout drois résérvés',

        // Déclaration des données du "store" de vue X
        SignIn: {
            // SignIn & LogIn
            CHKeMail: false,
            CHKpassword: false,
            ComparePwds: false,
            CHKuserName: false,
        },

        profil: {
            // Profil
            Connected: false,
            isAdmin: false,
            Token: '',
            TokenExpired: false,
            userId: 0,
            userName: '',
            email: '',
            bio: 'Non renseigné',
            BioEdit: false,
            UConfirm: false,

            // Like / Dislike post
            Liked: false,

            // Moderation
            // Admin Right
            RightAdded: false,
            RightRemoved: false,

            // FindUser
            findUser: false,
            findUserAdmin: false,
            findedUser: '',
        },

        PostComments: {
            // Posts & Comments
            Posts: [],
            Comments: [],
            LikesCounter: 0,
            ValueComment: false,
        },

        NewMessage: {
            // New Message
            Ntitle: '',
            Ncontent: '',
            Npicture: '',
            chkCompleted: false,
            uploadFile: false,
        },

        EditModerate: {
            // Edit & Moderate Posts
            CurrentPostId: 0,

            // Edit Posts & attachment
            chkEdit: false,
            Etitle: '',
            Econtent: '',
            Eattachment: '',
            EDeleteFile: false,

            // Moderate Posts & attachment
            chkModerate: false,
            Mtitle: '',
            Mcontent: '',
            Mattachment: '',
            MDeleteFile: false,
        },

        Status: {
            // Status
            Loading: false,
            subOkay: false,
            subCompleted: false,
            subFailure: false,
            WallFailure: false,
            NoData: true,

            // Custom Faillure Messages
            MSGfaillure: '',
        }
    },

    mutations: {
        //SignIn & LogIn
        setCHKeMail(state, newValue) {
            state.SignIn.CHKeMail = newValue;
        },
        setCHKpassword(state, newValue) {
            state.SignIn.CHKpassword = newValue;
        },
        setComparePwds(state, newValue) {
            state.SignIn.ComparePwds = newValue;
        },
        setCHKuserName(state, newValue) {
            state.SignIn.CHKuserName = newValue;
        },

        // Profil
        setConnected(state, newValue) {
            state.profil.Connected = newValue;
        },
        setUserID(state, newValue) {
            state.profil.userId = newValue;
        },
        setUserName(state, newValue) {
            state.profil.userName = newValue;
        },
        setEmail(state, newValue) {
            state.profil.email = newValue;
        },
        setIsAdmin(state, newValue) {
            state.profil.isAdmin = newValue;
        },
        setToken(state, newValue) {
            state.profil.Token = newValue;
        },
        setTokenExpired(state, newValue) {
            state.profil.TokenExpired = newValue;
        },
        setBioEdit(state, newValue) {
            state.profil.BioEdit = newValue;
        },
        setBio(state, newValue) {
            state.profil.bio = newValue;
        },
        setChkConfirm(state, newValue) {
            state.profil.UConfirm = newValue;
        },
        // Like Post
        setLiked(state, newValue) {
            state.profil.Liked = newValue;
        },
        // Moderation
        // Admin Right
        setRightAdded(state, newValue) {
            state.profil.RightAdded = newValue;
        },
        setRightRemoved(state, newValue) {
            state.profil.RightRemoved = newValue;
        },
        // FindUser
        setfindUser(state, newValue) {
            state.profil.findUser = newValue;
        },
        setfindUserAdmin(state, newValue) {
            state.profil.findUserAdmin = newValue;
        },
        setfindedUser(state, newValue) {
            state.profil.findedUser = newValue;
        },

        // Set Posts & Comments Table
        setPosts(state, newValue) {
            state.PostComments.Posts = newValue;
        },
        setComments(state, newValue) {
            state.PostComments.Comments = newValue;
        },
        setLikes(state, newValue) {
            state.PostComments.LikesCounter = + newValue;
        },
        setValueComment(state, newValue) {
            state.PostComments.ValueComment = newValue;
        },

        // New Message
        setNtitle(state, newValue) {
            state.NewMessage.Ntitle = newValue;
        },
        setNcontent(state, newValue) {
            state.NewMessage.Ncontent = newValue;
        },
        setNpicture(state, newValue) {
            state.NewMessage.Npicture = newValue;
        },
        setUploadFile(state, newValue) {
            state.NewMessage.uploadFile = newValue;
        },
        setchkCompleted(state, newValue) {
            state.NewMessage.chkCompleted = newValue;
        },

        // Edit & Moderate Posts
        setCurrentPostId(state, newValue) {
            state.EditModerate.CurrentPostId = newValue;
        },
        // Edit Posts & attachment
        setchkEdit(state, newValue) {
            state.EditModerate.chkEdit = newValue;
        },
        setCurrentEtitle(state, newValue) {
            state.EditModerate.Etitle = newValue;
        },
        setCurrentEcontent(state, newValue) {
            state.EditModerate.Econtent = newValue;
        },
        setCurrentEattachment(state, newValue) {
            state.EditModerate.Eattachment = newValue;
        },
        setEDeleteFile(state, newValue) {
            state.EditModerate.EDeleteFile = newValue;
        },
        // Moderate Posts & attachment
        setchkModerate(state, newValue) {
            state.EditModerate.chkModerate = newValue;
        },
        setCurrentMtitle(state, newValue) {
            state.EditModerate.Mtitle = newValue;
        },
        setCurrentMcontent(state, newValue) {
            state.EditModerate.Mcontent = newValue;
        },
        setCurrentMattachment(state, newValue) {
            state.EditModerate.Mattachment = newValue;
        },
        setMDeleteFile(state, newValue) {
            state.EditModerate.MDeleteFile = newValue
        },

        // Status
        setLoading(state, newValue) {
            state.Status.Loading = newValue;
        },
        setsubOkay(state, newValue) {
            state.Status.subOkay = newValue;
        },
        setsubCompleted(state, newValue) {
            state.Status.subCompleted = newValue;
        },
        setsubFailure(state, newValue) {
            state.Status.subFailure = newValue;
        },
        setsubFailure(state, newValue) {
            state.Status.subFailure = newValue;
        },
        setWallFailure(state, newValue) {
            state.Status.WallFailure = newValue;
        },
        setNoData(state, newValue) {
            state.Status.NoData = newValue;
        },

        // Custom Faillure Messages
        setMSGfaillure(state, newValue) {
            state.Status.MSGfaillure = newValue;
        },

    },

    getters: {
        // Role similaire à computed pour VueX

        // Paramètres généraux
        urlAPI(state) {
            return state.urlAPI;
        },
        Footer(state) {
            return state.footer;
        },

        //SignIn & LogIn
        CHKeMail(state) {
            return state.SignIn.CHKeMail;
        },
        CHKpassword(state) {
            return state.SignIn.CHKpassword;
        },
        ComparePwds(state) {
            return state.SignIn.ComparePwds;
        },
        CHKuserName(state) {
            return state.SignIn.CHKuserName;
        },

        // Profil
        Connected(state) {
            return state.profil.Connected;
        },
        isAdmin(state) {
            return state.profil.isAdmin;
        },
        userToken(state) {
            return state.profil.Token;
        },
        TokenExpired(state) {
            return state.profil.TokenExpired;
        },
        userID(state) {
            return state.profil.userId;
        },
        userName(state) {
            return state.profil.userName;
        },
        Email(state) {
            return state.profil.email;
        },
        Bio(state) {
            return state.profil.bio;
        },
        BioEdit(state) {
            return state.profil.BioEdit;
        },
        ChkConfirm(state) {
            return state.profil.UConfirm;
        },
        // Like & Dislike Post
        Liked(state) {
            return state.profil.Liked;
        },
        // Moderation
        // Admin Right
        RightAdded(state) {
            return state.profil.RightAdded;
        },
        RightRemoved(state) {
            return state.profil.RightRemoved;
        },
        // FindUser
        findUser(state) {
            return state.profil.findUser;
        },
        findUserAdmin(state) {
            return state.profil.findUserAdmin;
        },
        findedUser(state) {
            return state.profil.findedUser;
        },

        // Posts & Comments
        Posts(state) {
            return state.PostComments.Posts;
        },
        Comments(state) {
            return state.PostComments.Comments;
        },
        LikesCounter(state) {
            return state.PostComments.LikesCounter;
        },
        ValueComment(state) {
            return state.PostComments.ValueComment;
        },

        // New Message
        Ntitle(state) {
            return state.NewMessage.Ntitle;
        },
        Ncontent(state) {
            return state.NewMessage.Ncontent;
        },
        Npicture(state) {
            return state.NewMessage.Npicture;
        },
        chkCompleted(state) {
            return state.NewMessage.chkCompleted;
        },
        uploadFile(state) {
            return state.NewMessage.uploadFile;
        },

        // Edit Posts & attachment
        chkEdit(state) {
            return state.EditModerate.chkEdit;
        },
        EditTitle(state) {
            return state.EditModerate.Etitle;
        },
        EditContent(state) {
            return state.EditModerate.Econtent;
        },
        EditAttachment(state) {
            return state.EditModerate.Eattachment;
        },
        EDeleteFile(state) {
            return state.EditModerate.EDeleteFile;
        },
        // Moderate Posts & attachment
        chkModerate(state) {
            return state.EditModerate.chkModerate;
        },
        ModerateTitle(state) {
            return state.EditModerate.Mtitle;
        },
        ModerateContent(state) {
            return state.EditModerate.Mcontent;
        },
        ModerateAttachment(state) {
            return state.EditModerate.Mattachment;
        },
        MDeleteFile(state) {
            return state.EditModerate.MDeleteFile;
        },

        // Status
        Loading(state) {
            return state.Status.Loading;
        },
        subOkay(state) {
            return state.Status.subOkay;
        },
        subCompleted(state) {
            return state.Status.subCompleted;
        },
        subFailure(state) {
            return state.Status.subFailure;
        },
        WallFailure(state) {
            return state.Status.WallFailure;
        },
        NoData(state) {
            return state.Status.NoData;
        },
        // Custom Faillure Messages
        MSGfaillure(state) {
            return state.Status.MSGfaillure;
        }

        // N'oubliez-pas, Ces données devront être appelés depuis les composants et/ou Actions
    },

    actions: {
        // Singin
        SignInVerify({ commit, dispatch }) {
            commit('setsubFailure', false);
            let Email = document.getElementById('Semail').value;
            let Pwd = document.getElementById('Spwd').value;
            let PwdC = document.getElementById('SpwdC').value;
            let Name = document.getElementById('Sname').value;

            if (Email != '') {
                commit('setCHKeMail', true);
            } else {
                commit('setCHKeMail', false);
            }

            if (Name.length > 4) {
                commit('setCHKuserName', true);
            } else {
                commit('setCHKuserName', false);
            }

            if (Pwd.length >= 8 && PwdC.length >= 8 && (Pwd == PwdC)) {
                commit('setComparePwds', false);
                commit('setCHKpassword', true);
            }
            if (Pwd != '' && PwdC != "" && (Pwd != PwdC)) {
                commit('setComparePwds', true);
            }
            if (Pwd == '' || PwdC == '') {
                commit('setCHKpassword', false);
            }

            if (Email = '' || Name.length < 4 || Pwd == '' || PwdC == '' || (Pwd != PwdC)) {
                document.getElementById('SignIn').disabled = true;
            } else {
                document.getElementById('SignIn').disabled = false;
            }

        },
        Subscribe({ commit, dispatch }) {
            commit('setLoading', true);
            let Email = document.getElementById('Semail').value;
            let Pwd = document.getElementById('Spwd').value;
            let Name = document.getElementById('Sname').value;
            let Bio = document.getElementById('SBio').value;

            // Initialisation de la promesse vers l'API via AXIOS
            axios.post(this.state.urlAPI + '/api/users/register/', {
                email: Email,
                username: Name,
                password: Pwd,
                bio: Bio
            })
                .then(res => {
                    commit('setsubOkay', true);
                    // Cleaning
                    document.getElementById('Semail').value = '';
                    document.getElementById('Spwd').value = '';
                    document.getElementById('SpwdC').value = '';
                    document.getElementById('Sname').value = '';
                    document.getElementById('SBio').value = '';

                    // Completed
                    commit('setsubCompleted', true);
                    commit('setLoading', false);

                    // Masquer la fenêtre Modal
                    $('#registrationModal').modal('hide');
                    $('#Registred').modal('show');
                    dispatch('ResetSignInStats');
                })
                .catch(err => {
                    console.log(err);
                    if (err.message == 'Request failed with status code 409') {
                        document.getElementById('Semail').value = '';
                        document.getElementById('Semail').focus();
                        commit('setCHKeMail', false);
                        commit('setMSGfaillure', "Cette adresse e-mail est déjà utilisée.")
                        commit('setsubFailure', true);
                    } else if (err.message == 'Request failed with status code 406') {
                        document.getElementById('Sname').value = '';
                        document.getElementById('Sname').focus();
                        commit('setCHKuserName', false);
                        commit('setMSGfaillure', "Ce pseudonyme est déjà utilisé.");
                        commit('setsubFailure', true);
                    } else {
                        commit('setMSGfaillure', "Veillez à bien remplir les champs du formulaire d'inscription.");
                        commit('setsubFailure', true);
                    }

                    // Cleaning
                    document.getElementById('Spwd').value = '';
                    document.getElementById('SpwdC').value = '';

                    // Completed
                    commit('setsubCompleted', true);
                    commit('setLoading', false);
                });
        },
        ResetSignInStats({ commit }) {
            document.getElementById('Semail').value = '';
            document.getElementById('Spwd').value = '';
            document.getElementById('SpwdC').value = '';
            document.getElementById('Sname').value = '';
            document.getElementById('SBio').value = '';

            commit('setsubFailure', false);
            commit('setMSGfaillure', '');
            commit('setsubOkay', false);
            commit('setsubCompleted', false);
            commit('setCHKeMail', false);
            commit('setCHKpassword', false);
            commit('setCHKuserName', false);
            commit('setLoading', false);
        },
        ResetSignInStatsFail({ commit }) {
            document.getElementById('Spwd').value = '';
            document.getElementById('SpwdC').value = '';

            commit('setCHKpassword', false);
            commit('setsubFailure', false);
            commit('setMSGfaillure', '');
            commit('setLoading', false);
        },

        //Login
        AlreadyConnected({ commit }) {
            // Configuration de l'en-tete AXIOS (intégration du token)
            axios.interceptors.request.use(
                config => {
                    config.headers.authorization = `Bearer ${this.state.profil.Token}`;
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );

            axios.get(this.state.urlAPI + "/api/users/me")
                .then(res => {
                    commit('setsubOkay', true);
                    commit('setsubCompleted', true);
                    commit('setEmail', res.data.email);
                    commit('setUserName', res.data.username);
                    commit('setUserID', res.data.id);
                    commit('setIsAdmin', res.data.isAdmin);

                    // Completed
                    commit('setsubOkay', false);
                    commit('setsubCompleted', false);
                    commit('setLoading', false);
                })
                .catch(err => {
                    localStorage.removeItem("Connected");
                    commit('setConnected', false);
                    commit('setTokenExpired', true);
                });
        },
        LogInVerify({ commit }) {
            let Email = document.getElementById('Lemail').value;
            let Pwd = document.getElementById('Lpwd').value;
            commit('setsubFailure', false);

            if (Email != '') {
                commit('setCHKeMail', true);
            } else {
                commit('setCHKeMail', false);
            }

            if (Pwd.length >= 8) {
                commit('setCHKpassword', true);
            } else {
                commit('setCHKpassword', false);
            }

            if (Email = '' || Pwd.length < 8 || (Email = '' && Pwd.length == 0)) {
                document.getElementById('LogIn').disabled = true;
            } else {
                document.getElementById('LogIn').disabled = false;
            }
        },
        LogIn({ commit, dispatch }) {
            commit('setLoading', true);
            let Email = document.getElementById('Lemail').value;
            let Pwd = document.getElementById('Lpwd').value;

            // Initialisation de la promesse vers l'API via AXIOS
            axios.post(this.state.urlAPI + '/api/users/login/', {
                email: Email,
                password: Pwd
            })
                .then(res => {
                    document.getElementById('Lemail').value = '';
                    document.getElementById('Lpwd').value = '';

                    // Récupération des informations du compte de l'utilisateur
                    commit('setsubOkay', true);
                    commit('setsubCompleted', true);
                    commit('setConnected', true);
                    commit('setEmail', res.data.email);
                    commit('setUserName', res.data.userName);
                    commit('setUserID', res.data.userId);
                    commit('setToken', res.data.token);
                    commit('setIsAdmin', res.data.isAdmin);
                    commit('setTokenExpired', false);

                    localStorage.setItem("Connected", true);
                    localStorage.setItem("Token", this.state.profil.Token);

                    commit('setsubOkay', false);
                    commit('setsubCompleted', false);
                    commit('setLoading', false);

                    // Masquer la fenêtre Modal
                    $('#logginModal').modal('hide');

                    // Recharger le mur
                    dispatch("WallLoad");
                })
                .catch(err => {
                    localStorage.removeItem("Connected");

                    commit('setMSGfaillure', 'E-mail ou Mot de passe incorrect');
                    commit('setsubFailure', true);
                    commit('setConnected', false);
                    commit('setLoading', false);
                });
        },
        ResetLoginStats({ commit }) {
            document.getElementById('Lemail').value = '';
            document.getElementById('Lpwd').value = '';

            commit('setMSGfaillure', '');
            commit('setsubFailure', false);
            commit('setCHKeMail', false);
            commit('setCHKpassword', false);
            commit('setsubOkay', false);
            commit('setsubCompleted', false);
        },

        // Profil
        checkBio({ commit }) {
            let BioArea = document.getElementById("Bio").value;

            if (BioArea != '') {
                commit('setBioEdit', true);
            } else {
                commit('setBioEdit', false);
            }
        },
        GetProfil({ commit }) {
            axios.interceptors.request.use(
                config => {
                    config.headers.authorization = `Bearer ${this.state.profil.Token}`;
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );

            axios.get(this.state.urlAPI + '/api/users/me')
                .then(res => {
                    let UserProfil = {
                        'userID': res.data.id,
                        'UserName': res.data.username,
                        'Email': res.data.email,
                        'Bio': res.data.bio
                    };

                    if (res.data.bio != '') {
                        commit('setBio', UserProfil.Bio);
                    }

                    // Sucess
                    commit('setUserID', UserProfil.userID);
                    commit('setUserName', UserProfil.UserName);
                    commit('setEmail', UserProfil.Email);
                })
                .catch(err => {
                    commit('setsubFailure', true);
                    commit('setMSGfaillure', "Votre profil n'a pas été récupéré!");
                });
        },
        BioUpdate({ commit }) {
            let BioArea = document.getElementById("Bio").value;
            commit('setBioEdit', false);

            // Configuration de l'en-tete AXIOS (intégration du token)
            axios.interceptors.request.use(
                config => {
                    config.headers.authorization = `Bearer ${this.state.profil.Token}`;
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );

            // Initialisation de la promesse vers l'API via AXIOS
            axios.put(this.state.urlAPI + '/api/users/me/', {
                bio: BioArea,
            })
                .then(res => {
                    //SubOkay
                    commit('setBio', BioArea);
                    commit('setsubOkay', true);
                    commit('setsubCompleted', true);

                    // Completed
                    document.getElementById('Bio').value = '';
                    commit('setsubCompleted', true);
                })
                .catch(err => {
                    commit('setsubFailure', true);
                    commit('setMSGfaillure', "Votre profil n'a pas été mis à jour!");
                });

        },
        CheckConfirm({ commit }) {
            let Confirm = document.getElementById("Confirmation").value;

            if (Confirm == "J'accepte") {
                document.getElementById("Confirm").disabled = false;
                commit("setChkConfirm", true);
            } else {
                document.getElementById("Confirm").disabled = true;
                commit("setChkConfirm", false);
            }
        },
        Unsubscribe({ commit, dispatch }) {

            // Authentification de l'utilisateur...
            // Configuration de l'en-tete AXIOS (intégration du token)
            axios.interceptors.request.use(
                config => {
                    config.headers.authorization = `Bearer ${this.state.profil.Token}`;
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );

            // Suppression du compte utilisateur...
            axios.delete(this.state.urlAPI + "/api/users/unsubscribe/")
                .then(res => {
                    document.getElementById("Confirmation").value = '';
                    localStorage.removeItem('Connected');
                    localStorage.removeItem('Token');

                    commit('setsubOkay', false);
                    commit('setsubCompleted', false);
                    commit('setConnected', false);
                    commit('setEmail', '');
                    commit('setUserName', '');
                    commit('setUserID', 0);
                    commit('setToken', '');
                    commit('setIsAdmin', false);
                    commit('setLoading', false);
                    commit('setsubFailure', false);

                    // Masquer la fenêtre Modal
                    $('#ConfirmDeleteProfil').modal('hide');
                    $('#Cleaning').modal('show');

                    // Recharger la page
                    dispatch("WallLoad");
                })
                .catch(err => {
                    commit('setsubFailure', true);
                    commit('setMSGfaillure', "Erreur lors de la désinscription!");
                    console.log(err);
                });
        },
        ResetProfilStats({ commit }) {
            if (this.state.profil.isAdmin) {
                document.getElementById('Search').value = '';
            }
            document.getElementById('Bio').value = '';
            document.getElementById('Confirmation').value = '';

            commit('setBioEdit', false);
            commit('setfindUser', false);
            commit('setfindUserAdmin', false);
            commit('setfindedUser', '');
            commit('setsubOkay', false);
            commit('setsubFailure', false);
            commit('setMSGfaillure', "");
            commit('setsubCompleted', false);
            commit('setRightAdded', false);
            commit('setRightRemoved', false);
            commit('setChkConfirm', false);
        },
        GoOut({ commit }) {
            // Réinitialisation des paramètres Vue X...
            // Supression des informations de session utilisateur...

            commit('setsubOkay', false);
            commit('setsubCompleted', false);
            commit('setsubFailure', false);
            commit('setEmail', '');
            commit('setUserName', '');
            commit('setUserID', 0);
            commit('setToken', '');
            commit('setIsAdmin', false);
            commit('setConnected', false);
            commit('setLoading', false);

            localStorage.removeItem('Token');
            localStorage.removeItem('Connected');

            // Recharger la page internet
            document.location.reload();
        },
        // Like & Dislike Post
        LikePost({ commit, dispatch }, PostId) {
            // Configuration de l'en-tete AXIOS (intégration du token)
            axios.interceptors.request.use(
                config => {
                    config.headers.authorization = `Bearer ${this.state.profil.Token}`;
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );

            axios.post(this.state.urlAPI + "/api/messages/" + PostId + "/vote/like")
                .then(res => {
                    // Like le post
                    console.log('Liked');
                    commit('setLiked', true);
                    commit('setLikes', this.state.PostComments.LikeCounter += 1);

                    // Rechargement du mur après opération
                    dispatch("WallLoad");
                })
                .catch(err => {
                    axios.post(this.state.urlAPI + "/api/messages/" + PostId + "/vote/dislike")
                        .then(res => {
                            // Dislike le post
                            console.log('Disliked');
                            commit('setLiked', false);
                            commit('setLikes', this.state.PostComments.LikeCounter -= 1);

                            // Rechargement du mur après opération
                            dispatch("WallLoad");
                        })
                });

        },
        // Moderation
        // Admin Right
        addRight({ commit }) {
            let searchName = document.getElementById("Search").value;

            axios.interceptors.request.use(
                config => {
                    config.headers.authorization = `Bearer ${this.state.profil.Token}`;
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );

            axios.put(this.state.urlAPI + "/api/users/add", {
                Username: searchName,
            })
                .then(res => {
                    console.log(res);
                    document.getElementById('Search').value = '';
                    document.getElementById('AddRight').disabled = true;

                    commit('setRightAdded', true);
                    commit('setfindUser', false);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        removeRight({ commit }) {
            let searchName = document.getElementById("Search").value;

            axios.interceptors.request.use(
                config => {
                    config.headers.authorization = `Bearer ${this.state.profil.Token}`;
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );

            axios.put(this.state.urlAPI + "/api/users/remove", {
                Username: searchName,
            })
                .then(res => {
                    console.log(res);
                    document.getElementById('Search').value = '';
                    document.getElementById('RemoveRight').disabled = true;

                    commit('setRightRemoved', true);
                    commit('setfindUser', false);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // FindUser
        CheckNameExist({ commit }) {
            commit('setfindUser', false);
            commit('setRightAdded', false);
            commit('setRightRemoved', false);
            let searchName = document.getElementById("Search").value;

            axios.interceptors.request.use(
                config => {
                    config.headers.authorization = `Bearer ${this.state.profil.Token}`;
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );

            if (searchName != '') {
                // Code faire une recherche dans la BDD
                axios.post(this.state.urlAPI + "/api/users/", {
                    Username: searchName,
                })
                    .then(res => {

                        commit('setfindUser', true);
                        commit('setfindUserAdmin', res.data.isAdmin);

                        if (this.state.profil.findUserAdmin) {
                            document.getElementById("AddRight").disabled = true;
                            document.getElementById("RemoveRight").disabled = false;
                        } else {
                            document.getElementById("AddRight").disabled = false;
                            document.getElementById("RemoveRight").disabled = true;
                        }
                    })
                    .catch(err => {
                        commit('setfindUser', false);
                        commit('setfindUserAdmin', false);
                        document.getElementById("AddRight").disabled = true;
                        document.getElementById("RemoveRight").disabled = true;
                        console.log('Not Found!');
                    });
            } else {
                // Ne rien faire
                commit('setfindUser', false);
                commit('setfindUserAdmin', false);
                document.getElementById("AddRight").disabled = true;
                document.getElementById("RemoveRight").disabled = true;
                console.log('Not Found!');
            }
        },

        // Posts & Comments (wallLoad)
        WallLoad({ commit }) {
            commit('setLoading', true);
            // Lors du chargement du composant, appeler les messages dans la BDD
            // Initialisation de la promesse vers l'API via AXIOS

            axios.all([
                axios.get(this.state.urlAPI + '/api/messages/?order=createdAt:DESC'),
                axios.get(this.state.urlAPI + '/api/messages/comment?fields=id,messageId,username,comment,createdAt&order=createdAt:DESC')
            ])
                .then(responseArr => {
                    commit('setPosts', responseArr[0].data);
                    commit('setComments', responseArr[1].data);

                    if (this.state.PostComments.Posts != "") {
                        commit('setNoData', false);
                    }

                    commit('setLoading', false);
                })
                .catch(err => {
                    commit('setWallFailure', true);
                    commit('setsubFailure', true);
                    commit('setMSGfaillure', "Impossible de se connecter à la base de données, veuillez réessayer ultérieurement.");
                    commit('setLoading', false);
                    console.log(err);
                });
        },
        CommentVerify({ commit }, PostId) {
            let Comment = document.getElementById('CP' + PostId).value;

            if (Comment != '') {
                commit('setValueComment', true);
            } else {
                commit('setValueComment', false);
            }
        },
        SubmitComment({ commit, dispatch }, Post) {
            let comment = document.getElementById('CP' + Post.id).value;

            // Configuration de l'en-tete AXIOS (intégration du token)
            axios.interceptors.request.use(
                config => {
                    config.headers.authorization = `Bearer ${this.state.profil.Token}`;
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );

            axios.post(this.state.urlAPI + "/api/messages/comment/" + Post.id + "/new/?comment=" + comment)
                .then(res => {
                    // Sucess
                    document.getElementById('CP' + Post.id).value = '';
                    commit('setValueComment', false);
                    commit('setsubOkay', true);
                    commit('setsubCompleted', true);
                    commit('setsubOkay', false);
                    commit('setsubCompleted', false);

                    // Rechargement du mur après opération
                    dispatch("WallLoad");
                })
                .catch(err => {
                    // Faillure
                    console.log(err);
                    commit('setsubFailure', true);
                    commit('setsubCompleted', true);
                });
        },

        // New Message
        MsgVerify({ commit, dispatch }) {
            let CHKtitle = document.getElementById("Title").value;
            let CHKContent = document.getElementById("Content").value;

            if (CHKtitle.length > 2 && CHKContent.length > 4) {
                commit('setNtitle', CHKtitle);
                commit('setNcontent', CHKContent);
                commit('setchkCompleted', true);
                dispatch('PostPict');
            } else {
                commit('setsubFailure', true);
                commit('setMSGfaillure', "Veuillez vérifier le(s) champ(s) de formulaire");
                commit('setchkCompleted', false);
            }
        },
        MsgVerifyFail({ commit }) {
            commit('setsubFailure', false);
            commit('setMSGfaillure', "");
        },
        UploadPreview({ commit }) {
            let CHKtitle = document.getElementById("Title").value;
            let CHKContent = document.getElementById("Content").value;
            commit('setNtitle', CHKtitle);
            commit('setNcontent', CHKContent);

            let Status = document.getElementById("Join").checked;

            if (Status) {
                commit('setUploadFile', true);
            }

            // Initialisation du FormData
            let formData = new FormData();
            let imageFile = document.querySelector("#uploadFile");
            formData.append("image", imageFile.files[0]);

            // Configuration de l'en-tete AXIOS (intégration du token)
            axios.interceptors.request.use(
                config => {
                    config.headers = {
                        'authorization': `Bearer ${this.state.profil.Token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data;boundary="WebKitFormBoundary"'
                    }
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );

            // Initialisation de la promesse vers l'API via AXIOS
            axios.post(this.state.urlAPI + '/api/messages/new/preview', formData)
                .then(res => {
                    commit("setNpicture", res.data);

                    // Completed
                    console.log("Completed");
                })
                .catch(err => {
                    commit('setsubFailure', true);
                    commit('setMSGfaillure', "Impossible de charger l'image sélectionnée (Formats supportés : jpg, jpeg, png)");
                });
        },
        DeletePreview({ commit }) {
            let CHKtitle = document.getElementById("Title").value;
            let CHKContent = document.getElementById("Content").value;
            commit('setNtitle', CHKtitle);
            commit('setNcontent', CHKContent);

            let Status = document.getElementById("Join").checked;

            if (!Status) {
                commit('setUploadFile', false);
            }

            // Configuration de l'en-tete AXIOS (intégration du token)
            axios.interceptors.request.use(
                config => {
                    config.headers = {
                        'authorization': `Bearer ${this.state.profil.Token}`,
                    }
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );

            console.log(this.state.NewMessage.Npicture);

            // Initialisation de la promesse vers l'API via AXIOS
            axios.delete(this.state.urlAPI + '/api/messages/new/preview?image=' + this.state.NewMessage.Npicture)
                .then(res => {
                    commit("setNpicture", '');

                    // Completed
                    commit('setUploadFile', false);
                })
                .catch(err => {
                    commit('setsubFailure', true);
                    commit('setMSGfaillure', "Impossible de supprimer le preview (fichier introuvable)");
                });
        },
        PostPict({ commit, dispatch }) {
            commit('setLoading', true);

            if (this.state.NewMessage.uploadFile) {
                console.log('Attatched');
                // Récupération du fichier Image
                let formData = new FormData();
                let imageFile = document.querySelector("#uploadFile");
                formData.append("image", imageFile.files[0]);

                // Ajout des autres éléments au FormData ( title, content, attachment )
                formData.append("title", document.getElementById("Title").value);
                formData.append("content", document.getElementById("Content").value);
                formData.append("attachment", true);

                // Configuration de l'en-tete AXIOS (intégration du token)
                axios.interceptors.request.use(
                    config => {
                        config.headers = {
                            'authorization': `Bearer ${this.state.profil.Token}`,
                            'Accept': 'application/json',
                            'Content-Type': 'multipart/form-data;boundary="WebKitFormBoundary"'
                        }
                        return config;
                    },
                    error => {
                        return Promise.reject(error);
                    }
                );

                // Initialisation de la promesse vers l'API via AXIOS
                axios.post(this.state.urlAPI + '/api/messages/new/', formData)
                    .then(res => {
                        // Sucess
                        commit('setsubOkay', true);

                        // Completed
                        document.getElementById("Join").checked = false;
                        document.getElementById("Title").value = '';
                        document.getElementById("Content").value = '';
                        document.querySelector("#uploadFile").value = '';
                        commit('setsubCompleted', true);
                        dispatch("ResetNewMsgStats");

                        $('#NewMessage').modal('hide');
                        dispatch("WallLoad");
                    })
                    .catch(err => {
                        console.log(err);
                        commit('setsubFailure', true);
                        document.getElementById("Join").checked = false;
                    });

            } else {
                console.log('NoAttatched');

                let formData = new FormData();
                formData.append("title", document.getElementById("Title").value);
                formData.append("content", document.getElementById("Content").value);
                formData.append("attachment", false);

                // Configuration de l'en-tete AXIOS (intégration du token)
                axios.interceptors.request.use(
                    config => {
                        config.headers = {
                            'authorization': `Bearer ${this.state.profil.Token}`,
                            'Accept': 'application/json',
                            'Content-Type': 'multipart/form-data;boundary="WebKitFormBoundary"'
                        }
                        return config;
                    },
                    error => {
                        return Promise.reject(error);
                    }
                );

                // Initialisation de la promesse vers l'API via AXIOS
                axios.post(this.state.urlAPI + '/api/messages/new/', formData)
                    .then(res => {
                        // Sucess
                        commit('setsubOkay', true);

                        // Completed
                        document.getElementById("Title").value = '';
                        document.getElementById("Content").value = '';
                        dispatch("ResetNewMsgStats");

                        $('#NewMessage').modal('hide');

                        // Recharger le mur
                        dispatch("WallLoad");
                    })
                    .catch(err => {
                        console.log(err);
                        commit('setsubFailure', true);
                        commit('setLoading', false);
                    });

            }
        },
        ResetNewMsgStats({ commit, dispatch }) {
            if (this.state.NewMessage.Npicture != '') {
                dispatch('DeletePreview');
            }

            document.getElementById('Title').value = '';
            document.getElementById('Content').value = '';
            document.getElementById("Join").checked = false;
            document.querySelector("#uploadFile").value = '';

            commit('setNtitle', '');
            commit('setNcontent', '');
            commit('setchkCompleted', false);
            commit('setsubFailure', false);
            commit('setMSGfaillure', "");
            commit('setUploadFile', false);
            commit('setsubOkay', false);
            commit('setsubCompleted', false);
            commit('setLoading', false);
        },

        // Edit Posts & attachment
        VerifyEditPost({ commit, dispatch }) {
            let CHKtitle = document.getElementById("TitleEdit").value;
            let CHKContent = document.getElementById("ContentEdit").value;

            if (CHKtitle.length > 2 && CHKContent.length > 4) {
                commit('setCurrentEtitle', CHKtitle);
                commit('setCurrentEcontent', CHKContent);
                dispatch("EditPost");
            } else {
                commit('setsubFailure', true);
                commit('setMSGfaillure', "Veuillez vérifier le(s) champ(s) de formulaire");
                commit('setchkEdit', false);
            }
        },
        WallEditPost({ commit }, PostId) {
            commit('setLoading', true);
            let Counter = 0;

            // Chargement du post (Axios)
            axios.get(this.state.urlAPI + "/api/messages/?fields=id,title,content,attachment")
                .then(res => {
                    commit('setCurrentPostId', PostId);
                    Counter = res.data.length;
                    for (let i = 0; i < Counter; i++) {
                        if (res.data[i].id == PostId) {
                            commit('setCurrentEtitle', res.data[i].title);
                            commit('setCurrentEcontent', res.data[i].content);
                            commit('setCurrentEattachment', res.data[i].attachment);
                            commit('setEDeleteFile', false);
                        }
                    }
                    commit('setLoading', false);
                })
                .catch(err => {
                    commit('setsubFailure', true);
                    commit('setMSGfaillure', "Le message est introuvable, impossible de le charger.");
                    commit('setLoading', false);
                });
        },
        EditPost({ commit, dispatch }) {
            // Initialisation du FormData
            let formData = new FormData();
            // Ajout des éléments au FormData ( title, content, attachment )
            formData.append("title", this.state.EditModerate.Etitle);
            formData.append("content", this.state.EditModerate.Econtent);
            formData.append("attachment", this.state.EditModerate.Eattachment);
            formData.append("deleted", JSON.parse(this.state.EditModerate.EDeleteFile));

            // Configuration de l'en-tete AXIOS (intégration du token)
            axios.interceptors.request.use(
                config => {
                    config.headers = {
                        'authorization': `Bearer ${this.state.profil.Token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data;boundary="WebKitFormBoundary"'
                    }
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );

            // Initialisation de la promesse vers l'API via AXIOS
            axios.put(this.state.urlAPI + '/api/messages/' + this.state.EditModerate.CurrentPostId, formData)
                .then(res => {
                    // Envoie des données en base

                    //Sucess
                    document.getElementById('TitleEdit').value = '';
                    document.getElementById('ContentEdit').value = '';

                    commit('setNpicture', '');
                    commit('setsubOkay', true);
                    commit('setsubCompleted', true);
                    commit('setLoading', false);

                    // Completed
                    dispatch("ResetFields");
                    $('#EditModal').modal('hide');
                    dispatch("WallLoad");
                })
                .catch(err => {
                    commit('setsubFailure', true);
                    commit('setMSGfaillure', "Echec de mise à jour du message.");
                    commit('setsubCompleted', true);
                    commit('setLoading', false);
                });
        },
        EditUploadPreview({ commit }) {
            let CHKtitle = document.getElementById("TitleEdit").value;
            let CHKContent = document.getElementById("ContentEdit").value;
            commit('setCurrentEtitle', CHKtitle);
            commit('setCurrentEcontent', CHKContent);

            let Status = document.getElementById("EditJoin").checked;

            if (Status) {
                commit('setUploadFile', true);
            }

            // Initialisation du FormData
            let formData = new FormData();
            // Ajout des éléments au FormData (image)
            let imageFile = document.querySelector("#EdituploadFile");
            formData.append("image", imageFile.files[0]);

            // Configuration de l'en-tete AXIOS (intégration du token)
            axios.interceptors.request.use(
                config => {
                    config.headers = {
                        'authorization': `Bearer ${this.state.profil.Token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data;boundary="WebKitFormBoundary"'
                    }
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );

            // Initialisation de la promesse vers l'API via AXIOS
            axios.post(this.state.urlAPI + '/api/messages/new/preview', formData)
                .then(res => {
                    commit('setCurrentEattachment', res.data);
                    commit('setNpicture', res.data);

                    // Completed
                    console.log("Upload Preview Completed");
                })
                .catch(err => {
                    commit('setsubFailure', true);
                    commit('setMSGfaillure', "Imposible de charger l'image sélectionnée (Formats supportés : jpg, jpeg, png)");
                });
        },
        EditDeletePreview({ commit }) {
            let CHKtitle = document.getElementById("TitleEdit").value;
            let CHKContent = document.getElementById("ContentEdit").value;
            commit('setCurrentEtitle', CHKtitle);
            commit('setCurrentEcontent', CHKContent);

            let Status = document.getElementById("EditJoin").checked;

            if (!Status) {
                commit('setUploadFile', false);
            }

            // Configuration de l'en-tete AXIOS (intégration du token)
            axios.interceptors.request.use(
                config => {
                    config.headers = {
                        'authorization': `Bearer ${this.state.profil.Token}`,
                    }
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );

            // Initialisation de la promesse vers l'API via AXIOS
            axios.delete(this.state.urlAPI + '/api/messages/new/preview?image=' + this.state.NewMessage.Npicture)
                .then(res => {
                    commit("setNpicture", '');
                    commit('setCurrentEattachment', '');

                    document.getElementById("EditJoin").checked = false;
                    document.querySelector("#EdituploadFile").value = '';

                    // Completed
                    console.log("Delete Preview Completed");
                })
                .catch(err => {
                    commit('setsubFailure', true);
                    commit('setMSGfaillure', "Impossible de supprimer le preview (fichier introuvable)");
                });
        },
        RemoveEAttachment({ commit, dispatch }) {
            if (this.state.NewMessage.Npicture == '') {
                commit('setEDeleteFile', true);
            } else {
                dispatch('EditDeletePreview');
            }
        },

        // Moderate Posts & attachment
        VerifyModeratePost({ commit, dispatch }) {
            let CHKtitle = document.getElementById("TitleMod").value;
            let CHKContent = document.getElementById("ContentMod").value;

            if (CHKtitle.length > 2 && CHKContent.length > 4) {
                commit('setCurrentMtitle', CHKtitle);
                commit('setCurrentMcontent', CHKContent);
                dispatch("ModeratePost");
            } else {
                commit('setsubFailure', true);
                commit('setMSGfaillure', "Veuillez vérifier le(s) champ(s) de formulaire");
                commit('setchkModerate', false);
            }
        },
        WallModeratePost({ commit }, PostId) {
            commit('setLoading', true);
            let Counter = 0;

            // Chargement du post (Axios)
            axios.get(this.state.urlAPI + "/api/messages/?fields=id,title,content,attachment")
                .then(res => {
                    commit('setCurrentPostId', PostId);
                    Counter = res.data.length;
                    for (let i = 0; i < Counter; i++) {
                        if (res.data[i].id == PostId) {
                            commit('setCurrentMtitle', res.data[i].title);
                            commit('setCurrentMcontent', res.data[i].content);
                            commit('setCurrentMattachment', res.data[i].attachment);
                            commit('setMDeleteFile', false);
                        }
                        commit('setLoading', false);
                    }
                })
                .catch(err => {
                    commit('setsubFailure', true);
                    commit('setMSGfaillure', "Le message est introuvable, impossible de le charger.");
                    commit('setLoading', false);
                });
        },
        ModeratePost({ commit, dispatch }) {
            // Initialisation du FormData
            let formData = new FormData();
            // Ajout des autres éléments au FormData ( title, content, attachment, delete )
            formData.append("title", this.state.EditModerate.Mtitle);
            formData.append("content", this.state.EditModerate.Mcontent);
            formData.append("attachment", this.state.EditModerate.Mattachment);
            formData.append("deleted", JSON.parse(this.state.EditModerate.MDeleteFile));

            // Configuration de l'en-tete AXIOS (intégration du token)
            axios.interceptors.request.use(
                config => {
                    config.headers = {
                        'authorization': `Bearer ${this.state.profil.Token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data;boundary="WebKitFormBoundary"'
                    }
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );

            // Initialisation de la promesse vers l'API via AXIOS
            if (this.state.profil.isAdmin) {
                axios.put(this.state.urlAPI + '/api/messages/' + this.state.EditModerate.CurrentPostId + '/moderate', formData)
                    .then(res => {
                        // Envoie des données en base

                        //Sucess
                        document.getElementById('TitleMod').value = '';
                        document.getElementById('ContentMod').value = '';

                        commit('setsubOkay', true);
                        commit('setsubCompleted', true);
                        commit('setLoading', false);

                        // Completed
                        dispatch("ResetFields");

                        $('#ModerateModal').modal('hide');
                        dispatch("WallLoad");
                    })
                    .catch(err => {
                        console.log(err);
                        commit('setsubFailure', true);
                        commit('setMSGfaillure', "Echec de mise à jour du message.");
                        commit('setsubCompleted', true);
                        commit('setLoading', false);
                    });
            } else {
                commit('setsubFailure', true);
                commit('setMSGfaillure', "Vous ne disposez pas des droits de modération.");
                commit('setsubCompleted', true);
                commit('setLoading', false);
            }
        },
        RemoveMAttachment({ commit }) {
            commit('setMDeleteFile', true);
        },

        ResetFields({ commit, dispatch }) {
            if (this.state.NewMessage.Npicture != '') {
                dispatch('EditDeletePreview');
            }

            document.getElementById("EditJoin").checked = false;
            document.querySelector("#EdituploadFile").value = '';
            commit('setCurrentEtitle', '');
            commit('setCurrentEcontent', '');
            commit('setCurrentEattachment', '');
            commit('setEDeleteFile', false);
            commit('setCurrentMtitle', '');
            commit('setCurrentMcontent', '');
            commit('setCurrentMattachment', '');
            commit('setMDeleteFile', false);
            commit('setsubFailure', false);
            commit('setMSGfaillure', "");
            commit('setsubOkay', false);
            commit('setsubCompleted', false);
            commit('setUploadFile', false);
        },

        // Delete Post & Comment
        DeletePost({ dispatch }, PostId) {
            // Configuration de l'en-tete AXIOS (intégration du token)
            axios.interceptors.request.use(
                config => {
                    config.headers.authorization = `Bearer ${this.state.profil.Token}`;
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );
            if (this.state.profil.isAdmin) {
                // Initialisation de la promesse vers l'API via AXIOS
                axios.delete(this.state.urlAPI + '/api/messages/' + PostId + '/moderate')
                    .then(res => {
                        console.log('Post Deleted');
                        // Rechargement du mur après opération
                        dispatch("WallLoad");
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                // Initialisation de la promesse vers l'API via AXIOS
                axios.delete(this.state.urlAPI + '/api/messages/' + PostId)
                    .then(res => {
                        console.log('Post Deleted');
                        // Rechargement du mur après opération
                        dispatch("WallLoad");
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        DeleteComment({ dispatch }, Comment) {
            // Configuration de l'en-tete AXIOS (intégration du token)
            axios.interceptors.request.use(
                config => {
                    config.headers.authorization = `Bearer ${this.state.profil.Token}`;
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );
            if (this.state.profil.isAdmin) {
                axios.delete(this.state.urlAPI + "/api/messages/comment/" + Comment.messageId + "/" + Comment.id + "/moderate/")
                    .then(res => {
                        console.log('commentaire supprimé');

                        // Rechargement du mur après opération
                        dispatch("WallLoad");
                    })
                    .catch(err => {
                        console.log(err);
                    });

            } else {
                axios.delete(this.state.urlAPI + "/api/messages/comment/" + Comment.messageId + "/" + Comment.id)
                    .then(res => {
                        console.log('commentaire supprimé');

                        // Rechargement du mur après opération
                        dispatch("WallLoad");
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
    }
})