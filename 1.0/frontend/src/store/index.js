import { resolveTransitionHooks } from 'vue';
import { createStore } from 'vuex'


export default createStore({
  state: {
    urlAPI:'https://shadsoft.fr:3443',
    footer:'Groupomania 2020 - Tout drois résérvés',
    // Déclaration des données du "store" de vue X

    // Profil
    Connected: false,
    isAdmin: false,
    Token:'',
    TokenExpired:false,
    userId:0,
    userName:'',
    email:'',
    bio:'Non renseigné',
    BioEdit : false,
    UConfirm: false,

    // SignIn
    CHKeMail:false,
    CHKpassword:false,
    ComparePwds:false,
    CHKuserName:false,

    // New Message
    Ntitle:'',
    Ncontent:'',
    Npicture:'',
    chkCompleted:false,
    uploadFile:false,

    // Posts & Comments
    Posts:[],
    Comments:[],
    ValueComment:false,

    // Edit, Delete & Moderate Posts
    CurrentPostId:0,
    chkEdit:false,
    Etitle:'',
    Econtent:'',
    Eattachment:'',
    EDeleteFile:false,

    chkModerate:false,
    Mtitle:'',
    Mcontent:'',
    Mattachment:'',
    MDeleteFile:false,

    // Likes
    LikesCounter : 0,
    Liked:false,

    // Loading
    Loading:false,
    NoData:true,

    // Status
    subOkay: false,
    subFailure: false,
    subCompleted: false,
    MSGfaillure:'',

    // Admin Right
    RightAdded:false,
    RightRemoved:false,

    // FindUser
    findUser:false,
    findUserAdmin:false,
    findedUser:'',
  },
  
  mutations: {
    // Permet de mettre a jour les données dans le store (state)

    // SignIn
    setCHKeMail(state, newValue){
      state.CHKeMail = newValue;
    },
    setCHKpassword(state, newValue){
      state.CHKpassword = newValue;
    },
    setComparePwds(state, newValue){
      state.ComparePwds = newValue;
    },
    setCHKuserName(state, newValue){
      state.CHKuserName = newValue;
    },
    setLoading(state, newValue){
      state.Loading = newValue;
    },
    setConnected(state, newValue){
      state.Connected = newValue;
    },

    // Profil
    setUserID(state, newValue){
      state.userId = newValue;
    },

    setUserName(state, newValue){
      state.userName = newValue;
    },

    setEmail(state, newValue){
      state.email = newValue;
    },

    setIsAdmin(state, newValue){
      state.isAdmin = newValue;
    },

    setToken(state, newValue){
      state.Token = newValue;
    },

    setTokenExpired(state, newValue){
      state.TokenExpired = newValue;
    },

    setBioEdit(state, newValue){
      state.BioEdit = newValue;
    },
    setBio(state, newValue){
      state.bio = newValue;
    },
    setChkConfirm(state, newValue){
      state.UConfirm = newValue;
    },

    // New Message
    setNtitle(state, newValue){
      state.Ntitle = newValue;
    },
    setNcontent(state, newValue){
      state.Ncontent = newValue;
    },
    setNpicture(state, newValue){
      state.Npicture = newValue;
    },
    setUploadFile(state, newValue){
      state.uploadFile = newValue;
    },
    setchkCompleted(state, newValue){
      state.chkCompleted = newValue;
    },

    // Edit & Moderate Posts
    setCurrentPostId(state, newValue){
      state.CurrentPostId = newValue;
    },
    setchkEdit(state, newValue){
      state.chkEdit = newValue;
    },
    setCurrentEtitle(state, newValue){
      state.Etitle = newValue;
    },
    setCurrentEattachment(state, newValue){
      state.Eattachment = newValue;
    },
    setEDeleteFile(state, newValue){
      state.EDeleteFile = newValue;
    },
    setCurrentEcontent(state, newValue){
      state.Econtent = newValue;
    },

    setchkModerate(state, newValue){
      state.chkModerate = newValue;
    },
    setCurrentMtitle(state, newValue){
      state.Mtitle = newValue;
    },
    setCurrentMattachment(state, newValue){
      state.Mattachment = newValue;
    },
    setMDeleteFile(state, newValue){
      state.MDeleteFile = newValue
    },
    setCurrentMcontent(state, newValue){
      state.Mcontent = newValue;
    },

    // Likes
    setLikes(state, newValue){
      state.LikesCounter =+ newValue;
    },

    setLiked(state, newValue){
      state.Liked = newValue;
    },

    // NoMessage & No Comments
    setNoData(state, newValue){
      state.NoData = newValue;
    },

    // Set Posts & Comments Table
    setPosts(state, newValue){
      state.Posts = newValue;
    },

    setComments(state, newValue){
      state.Comments = newValue;
    },

    setValueComment(state, newValue){
      state.ValueComment = newValue;
    },

    // Admin Right
    setRightAdded(state, newValue){
      state.RightAdded = newValue;
    },

    setRightRemoved(state, newValue){
      state.RightRemoved = newValue;
    },

    // UserFound
    setfindUser(state, newValue){
      state.findUser = newValue;
    },
    setfindUserAdmin(state, newValue){
      state.findUserAdmin = newValue;
    },
    setfindedUser(state, newValue){
      state.findedUser = newValue;
    },

    // Status
    setsubOkay(state, newValue){
      state.subOkay = newValue;
    },
    setsubCompleted(state, newValue){
      state.subCompleted = newValue;
    },
    setsubFailure(state, newValue){
      state.subFailure = newValue;
    },

    setMSGfaillure(state,newValue){
      state.MSGfaillure = newValue;
    }
  },

  getters:{
    // Role similaire à computed pour VueX

    urlAPI(state){
      return state.urlAPI;
    },
    NoData(state){
      return state.NoData;
    },
    Footer(state){
      return state.footer;
    },

    //SignIn
    CHKeMail(state){
      return state.CHKeMail;
    },
    CHKpassword(state){
      return state.CHKpassword;
    },
    ComparePwds(state){
      return state.ComparePwds;
    },
    CHKuserName(state){
      return state.CHKuserName;
    },

    // Profil
    Connected(state){
      return state.Connected;
    },
    userName(state){
      return state.userName;
    },
    userID(state){
      return state.userId;
    },
    userToken(state){
      return state.Token;
    },
    TokenExpired(state){
      return state.TokenExpired;
    },
    Bio(state){
      return state.bio;
    },
    Email(state){
      return state.email;
    },
    isAdmin(state){
      return state.isAdmin;
    },
    BioEdit(state){
      return state.BioEdit;
    },
    ChkConfirm(state){
      return state.UConfirm;
    },

    // Administration
    findUser(state){
      return state.findUser;
    },
    findUserAdmin(state){
      return state.findUserAdmin;
    },
    findedUser(state){
      return state.findedUser;
    },
    RightAdded(state){
      return state.RightAdded;
    },
    RightRemoved(state){
      return state.RightRemoved;
    },

    // New Message
    Ntitle(state){
      return state.Ntitle;
    },
    Ncontent(state){
      return state.Ncontent;
    },
    chkCompleted(state){
      return state.chkCompleted;
    },
    Npicture(state){
      return state.Npicture;
    },
    uploadFile(state){
      return state.uploadFile;
    },
    

    // Edit Post | Moderate post
    chkEdit(state){
      return state.chkEdit;
    },
    EditTitle(state){
      return state.Etitle;
    },
    EditAttachment(state){
      return state.Eattachment;
    },
    EDeleteFile(state){
      return state.EDeleteFile;
    },
    EditContent(state){
      return state.Econtent;
    },

    chkModerate(state){
      return state.chkModerate;
    },
    ModerateTitle(state){
      return state.Mtitle;
    },
    ModerateAttachment(state){
      return state.Mattachment;
    },
    MDeleteFile(state){
      return state.MDeleteFile;
    },
    ModerateContent(state){
      return state.Mcontent;
    },

    ValueComment(state){
      return state.ValueComment;
    },

    // Liked Disliked
    Liked(state){
      return state.Liked;
    },
    LikesCounter(state){
      return state.LikesCounter;
    },

    // Wall Load
    Posts(state){
      return state.Posts;
    },
    Comments(state){
      return state.Comments;
    },

    // Status
    Loading(state){
      return state.Loading;
    },
    subOkay(state){
      return state.subOkay;
    },
    subFailure(state){
      return state.subFailure;
    },
    subCompleted(state){
      return state.subCompleted;
    },

    MSGfaillure(state){
      return state.MSGfaillure;
    }

    // N'oubliez-pas, Ces données devront être appelés depuis les composants et/ou Actions
  },

  actions: {

    // Singin
    SignInVerify({commit}){
      commit('setsubFailure', false);
      let Email = document.getElementById('Semail').value;
      let Pwd = document.getElementById('Spwd').value;
      let PwdC = document.getElementById('SpwdC').value;
      let Name = document.getElementById('Sname').value;

      if(Email !=''){
        commit('setCHKeMail', true);
      } else {
        commit('setCHKeMail', false);
      }

      if(Name.length > 4){
        commit('setCHKuserName', true);
      } else {
        commit('setCHKuserName', false);
      }

      if(Pwd.length >= 8 && PwdC.length >= 8 && (Pwd == PwdC)){
        commit('setComparePwds', false);
        commit('setCHKpassword', true);
      }
      if(Pwd !='' && PwdC !="" && (Pwd != PwdC)){
        commit('setComparePwds', true);
      }
      if(Pwd=='' || PwdC=='') {
        commit('setCHKpassword', false);
      }
    },
    Subscribe({commit,dispatch}){
      commit('setLoading', true);
      let Email = document.getElementById('Semail').value;
      let Pwd = document.getElementById('Spwd').value;
      let Name = document.getElementById('Sname').value;
      let Bio = document.getElementById('SBio').value;

      // Initialisation de la promesse vers l'API via AXIOS
      axios.post(this.state.urlAPI+'/api/users/register/', {
        email : Email,
        username : Name,
        password : Pwd,
        bio : Bio
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
        console.log(this.state.Loading);

        // Masquer la fenêtre Modal
        $('#registrationModal').modal('hide');
        dispatch('ResetSignInStats');
      })
      .catch(err => {
      commit('setMSGfaillure', "Veillez a bien remplir les champs du formulaire d'inscription.");
      commit('setsubFailure', true);

      // Cleaning
      document.getElementById('Spwd').value = '';
      document.getElementById('SpwdC').value = '';
      
      // Completed
      commit('setsubCompleted', true);
      commit('setLoading', false);
      });
    },
    ResetSignInStats({commit}){
      document.getElementById('Semail').value = '';
      document.getElementById('Spwd').value = '';
      document.getElementById('SpwdC').value = '';
      document.getElementById('Sname').value = '';
      document.getElementById('SBio').value = '';
      commit('setsubFailure', false);
      commit('setMSGfaillure','');
      commit('setsubOkay', false);
      commit('setsubCompleted', false);
      commit('setCHKeMail', false);
      commit('setCHKpassword', false);
      commit('setCHKuserName', false);
      commit('setLoading', false);
    },

    //Login
    AlreadyConnected({commit}){
      // Configuration de l'en-tete AXIOS (intégration du token)
      axios.interceptors.request.use(
        config => {
          config.headers.authorization = `Bearer ${this.state.Token}`;
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      );

      axios.get(this.state.urlAPI+"/api/users/me")
      .then(res =>{
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
      .catch(err =>{
        localStorage.removeItem("Connected");
        commit('setConnected', false);
        commit('setTokenExpired', true);
      });
    },

    LogInVerify({commit}){
      let Email = document.getElementById('Lemail').value;
      let Pwd = document.getElementById('Lpwd').value;
      commit('setsubFailure', false);

      if(Email !=''){
        commit('setCHKeMail', true);
      } else {
        commit('setCHKeMail', false);
      }

      if(Pwd.length >= 8) {
        commit('setCHKpassword', true);
      } else {
        commit('setCHKpassword', false);
      }

    },

    LogIn({commit,dispatch}){
      commit('setLoading', true);
      let Email = document.getElementById('Lemail').value;
      let Pwd = document.getElementById('Lpwd').value;

      // Initialisation de la promesse vers l'API via AXIOS
      axios.post(this.state.urlAPI+'/api/users/login/', {
        email: Email,
        password: Pwd
      })
      .then(res =>{
        // Récupération des information du compte de l'utilisateur
        commit('setsubOkay', true);
        commit('setsubCompleted', true);
        commit('setConnected', true);
        localStorage.setItem("Connected", true);
        commit('setEmail', res.data.email);
        document.getElementById('Lemail').value = '';
        document.getElementById('Lpwd').value = '';
        commit('setUserName', res.data.userName);
        commit('setUserID', res.data.userId);
        commit('setToken', res.data.token);
        localStorage.setItem("Token", this.state.Token);
        commit('setIsAdmin', res.data.isAdmin);
        commit('setLoading', false);

        // Completed
        commit('setTokenExpired', false);
        commit('setsubOkay', false);
        commit('setsubCompleted', false);
        
        // Masquer la fenêtre Modal
        $('#logginModal').modal('hide');

        // Recharger le mur
        dispatch("WallLoad");
      })
      .catch(err =>{
        commit('setMSGfaillure','E-mail ou Mot de passe incorrect');
        commit('setsubFailure', true);
        localStorage.removeItem("Connected");
        commit('setConnected', false);
        commit('setLoading', false);
      });
    },

    ResetLoginStats({commit}){
      document.getElementById('Lemail').value = '';
      document.getElementById('Lpwd').value = '';
      commit('setMSGfaillure','');
      commit('setsubFailure', false);
      commit('setCHKeMail', false);
      commit('setCHKpassword', false);
      commit('setsubOkay', false);
      commit('setsubCompleted', false);
    },

    // Profil
    checkBio({commit}){
      let BioArea = document.getElementById("Bio").value;

      if(BioArea != ''){
        commit('setBioEdit', true);
      } else {
        commit('setBioEdit', false);
      }
    },
    GetProfil({commit}){
      axios.interceptors.request.use(
        config => {
          config.headers.authorization = `Bearer ${this.state.Token}`;
          return config;
        },
        error => {
          return Promise.reject(error);
        }
    );

    axios.get(this.state.urlAPI+'/api/users/me')
    .then(res =>{
      // console.log(res)
      let UserProfil = {
        'userID': res.data.id,
        'UserName': res.data.username,
        'Email': res.data.email,
        'Bio': res.data.bio
      };

      if(res.data.bio != ''){
        commit('setBio',UserProfil.Bio);
      }

      // Sucess
      commit('setUserID',UserProfil.userID);
      commit('setUserName',UserProfil.UserName);
      commit('setEmail',UserProfil.Email);
    })
    .catch(err =>{
      commit('setsubFailure', true);
      commit('setMSGfaillure',"Votre profil n'as pas été récupéré!");
      commit('setLoading', false);
    });
    },
    BioUpdate({commit}){
      let BioArea = document.getElementById("Bio").value;
      commit('setLoading', true);
      commit('setBioEdit', false);

      // Configuration de l'en-tete AXIOS (intégration du token)
      axios.interceptors.request.use(
        config => {
          config.headers.authorization = `Bearer ${this.state.Token}`;
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      );

      // Initialisation de la promesse vers l'API via AXIOS
      axios.put(this.state.urlAPI+'/api/users/me/',{
        bio: BioArea,
      })
      .then(res =>{
        // Envoie des données en base
        this.bio = BioArea;

        //SubOkay
        commit('setBio', BioArea);
        commit('setsubOkay', true);
        commit('setsubCompleted', true);
        commit('setLoading', false);

        // Completed
        document.getElementById('Bio').value = '';
        commit('setsubCompleted', true);
        commit('setLoading', false);
      })
      .catch(err =>{
        commit('setsubFailure', true);
        commit('setMSGfaillure',"Votre profil n'as pas été mis à jour!");
        commit('setLoading', false);
      });

    },

    CheckConfirm({commit}){
      let Confirm = document.getElementById("Confirmation").value;
      console.log(Confirm);

      if(Confirm == "J'accepte"){
        commit("setChkConfirm",true);
      } else {
        commit("setChkConfirm",false);
      }
    },
    Unsubscribe({commit,dispatch}){
      // Authentification de l'utilisateur...

      // Configuration de l'en-tete AXIOS (intégration du token)
      axios.interceptors.request.use(
        config => {
          config.headers.authorization = `Bearer ${this.state.Token}`;
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      );

      // Suppression du compte utilisateur...
      axios.delete(this.state.urlAPI+"/api/users/unsubscribe/")
      .then(res =>{
        localStorage.clear();
        commit('setsubOkay', false);
        commit('setsubCompleted', false);
        commit('setConnected', false);
        localStorage.removeItem('Connected');
        commit('setEmail', '');
        commit('setUserName', '');
        commit('setUserID', 0);
        commit('setToken', '');
        localStorage.removeItem('Token');
        commit('setIsAdmin', false);
        commit('setLoading', false);

        // Recharger la page
        dispatch("WallLoad");
      })
      .catch(err =>{
        commit('setsubFailure', false);
        commit('setMSGfaillure',"Erreur lors de la désinscription!");
        console.log(err);
      });

    },

    ResetProfilStats({commit}){
      document.getElementById('Search').value = '';
      document.getElementById('Bio').value = '';
      document.getElementById('Confirmation').value = '';
      commit('setBioEdit', false);
      commit('setfindUser', false);
      commit('setfindUserAdmin', false);
      commit('setfindedUser', '');
      commit('setsubOkay', false);
      commit('setsubFailure', false);
      commit('setMSGfaillure',"");
      commit('setsubCompleted', false);
      commit('setRightAdded', false);
      commit('setRightRemoved', false);
      commit('setChkConfirm', false);
    },
    GoOut({commit}){
      // Réinitialisation des paramètres Vue X...
      // Supression des informations de session utilisateur...
      commit('setsubOkay', false);
      commit('setsubCompleted', false);
      commit('setsubFailure', false);
      commit('setEmail', '');
      commit('setUserName', '');
      commit('setUserID', 0);
      localStorage.removeItem('Token');
      commit('setToken', '');
      commit('setIsAdmin', false);
      localStorage.removeItem('Connected');
      commit('setConnected', false);
      commit('setLoading', false);

      // Recharger la page internet
      document.location.reload();
    },

    // Profil (Administration)
    CheckNameExist({commit}){
      let searchName = document.getElementById("Search").value;

      axios.interceptors.request.use(
          config => {
            config.headers.authorization = `Bearer ${this.state.Token}`;
            return config;
          },
          error => {
            return Promise.reject(error);
          }
      );

      if(searchName !=''){
        console.log(searchName);
        // Code faire une recherche dans la BDD
        axios.post(this.state.urlAPI+"/api/users/",{
          Username: searchName,
        })
        .then(res=>{
          commit('setfindUser', true);
          commit('setfindUserAdmin', res.data.isAdmin);
        })
        .catch(err=>{
          console.log('Not Found!');
        });
      } else {
        // Ne rien faire
        commit('setfindUser', false);
        commit('setfindUserAdmin', false);
        console.log('Not Found!');
      }
    },
    addRight({commit}){
      let searchName = document.getElementById("Search").value;

      axios.interceptors.request.use(
        config => {
          config.headers.authorization = `Bearer ${this.state.Token}`;
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      );

      axios.put(this.state.urlAPI+"/api/users/add",{
        Username : searchName,
      })
      .then(res=>{
        commit('setRightAdded', true);
        commit('setfindUser', false);
        document.getElementById('Search').value = '';
      })
      .catch(err=>{
        console.log(err);
      });
    },
    removeRight({commit}){
      let searchName = document.getElementById("Search").value;

      axios.interceptors.request.use(
        config => {
          config.headers.authorization = `Bearer ${this.state.Token}`;
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      );

      axios.put(this.state.urlAPI+"/api/users/remove",{
          Username : searchName,                
      })
      .then(res=>{
        commit('setRightRemoved', true);
        commit('setfindUser', false);
        document.getElementById('Search').value = '';
      })
      .catch(err=>{
        console.log(err);
      });
    },

    // New Message
    MsgVerify({commit,dispatch}){
      let CHKtitle = document.getElementById("Title").value;
      let CHKContent = document.getElementById("Content").value;

      if(CHKtitle.length > 2 && CHKContent.length > 4){
        commit('setNtitle', CHKtitle);
        commit('setNcontent', CHKContent);
        commit('setchkCompleted', true);
        dispatch('PostPict');
      } else {
        commit('setsubFailure', true);
        commit('setMSGfaillure',"Veuillez vérifier le(s) champ(s) de formulaire");
        commit('setchkCompleted', false);
      }
    },
    MsgVerifyFail({commit}){
      commit('setsubFailure', false);
      commit('setMSGfaillure',"");
    },

    UploadPreview({commit}){
      let CHKtitle = document.getElementById("Title").value;
      let CHKContent = document.getElementById("Content").value;
      commit('setNtitle', CHKtitle);
      commit('setNcontent', CHKContent);

      let Status = document.getElementById("Join").checked;
      
      if(Status){
        commit('setUploadFile', true);
      }
      
      // Initialisation du FormData
      let formData = new FormData();
      let imageFile = document.querySelector("#uploadFile");
      formData.append("image",imageFile.files[0]);

      // Configuration de l'en-tete AXIOS (intégration du token)
      axios.interceptors.request.use(
        config => {
            config.headers = {
              'authorization': `Bearer ${this.state.Token}`,
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
      axios.post(this.state.urlAPI+'/api/messages/new/preview',formData)
      .then(res =>{
        commit("setNpicture",res.data);

        // Completed
        console.log("Completed");
      })
      .catch(err =>{
        commit('setsubFailure', true);
        commit('setMSGfaillure',"Imposible de charger l'image selectionnée (Format supportés : jpg, jpeg, png)");
      });
    },
    DeletePreview({commit}){
      let CHKtitle = document.getElementById("Title").value;
      let CHKContent = document.getElementById("Content").value;
      commit('setNtitle', CHKtitle);
      commit('setNcontent', CHKContent);

      let Status = document.getElementById("Join").checked;
      
      if(!Status){
        commit('setUploadFile', false);
      }

      // Configuration de l'en-tete AXIOS (intégration du token)
      axios.interceptors.request.use(
        config => {
          config.headers = {
            'authorization': `Bearer ${this.state.Token}`,
          }
          return config;
        },
        error => {
            return Promise.reject(error);
        }
      );

      console.log(this.state.Npicture);

      // Initialisation de la promesse vers l'API via AXIOS
      axios.delete(this.state.urlAPI+'/api/messages/new/preview?image='+this.state.Npicture)
      .then(res =>{
        commit("setNpicture",'');

        // Completed
        commit('setUploadFile', false);
      })
      .catch(err =>{
        commit('setsubFailure', true);
        commit('setMSGfaillure',"Imposible de supprimer le preview (fichier introuvable)");
      });
    },

    PostPict({commit, dispatch}){
      commit('setLoading', true);

      if(this.state.uploadFile){
        console.log('Attatched');
        // Récupération du fichier Image
        let formData = new FormData();
        let imageFile = document.querySelector("#uploadFile");
        formData.append("image",imageFile.files[0]);

        // Ajout des autres éléments au FormData ( title, content, attachment )
        formData.append("title",document.getElementById("Title").value);
        formData.append("content",document.getElementById("Content").value);
        formData.append("attachment",true);

        // Configuration de l'en-tete AXIOS (intégration du token)
        axios.interceptors.request.use(
          config => {
            config.headers = {
              'authorization': `Bearer ${this.state.Token}`,
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
        axios.post(this.state.urlAPI+'/api/messages/new/',formData)
        .then(res =>{
          // Sucess
          commit('setsubOkay', true);

          // Completed
          document.getElementById("Join").checked = false;
          document.getElementById("Title").value = '';
          document.getElementById("Content").value ='';
          document.querySelector("#uploadFile").value = '';
          commit('setsubCompleted', true);
          dispatch("ResetNewMsgStats");

          $('#NewMessage').modal('hide');
          dispatch("WallLoad");
        })
        .catch(err =>{
          console.log(err);
          commit('setsubFailure', true);
          document.getElementById("Join").checked = false;
        });

      } else {
        console.log('NoAttatched');
        console.log(this.state.Ntitle, this.state.Ncontent);

        let formData = new FormData();
        formData.append("title",document.getElementById("Title").value);
        formData.append("content",document.getElementById("Content").value);
        formData.append("attachment",false);
        // console.log(FormData);

        // Configuration de l'en-tete AXIOS (intégration du token)
        axios.interceptors.request.use(
          config => {
            config.headers = {
              'authorization': `Bearer ${this.state.Token}`,
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
        axios.post(this.state.urlAPI+'/api/messages/new/', formData)
        .then(res =>{
        // Sucess
        commit('setsubOkay', true);

        // Completed
        document.getElementById("Title").value = '';
        document.getElementById("Content").value ='';
        dispatch("ResetNewMsgStats");

        $('#NewMessage').modal('hide');

        // Recharger le mur
        dispatch("WallLoad");
        })
        .catch(err =>{
          console.log(err);
          commit('setsubFailure', true);
          commit('setLoading', false);
          console.log(this.state.Loading);
        });

      }      
    },
    ResetNewMsgStats({commit}){
      document.getElementById('Title').value = '';
      document.getElementById('Content').value = '';
      document.getElementById("Join").checked = false;
      document.querySelector("#uploadFile").value = '';
      commit('setNtitle', '');
      commit('setNcontent', '');
      commit('setNpicture','');
      commit('setchkCompleted', false);
      commit('setsubFailure', false);
      commit('setMSGfaillure',"");
      commit('setUploadFile', false);
      commit('setsubOkay', false);
      commit('setsubCompleted', false);
      commit('setLoading',false);
    },

    // Edit Post | Moderate Post
    VerifyEditPost({commit,dispatch}){
      let CHKtitle = document.getElementById("TitleEdit").value;
      let CHKContent = document.getElementById("ContentEdit").value;

      if(CHKtitle.length > 2 && CHKContent.length > 4){
        commit('setCurrentEtitle', CHKtitle);
        commit('setCurrentEcontent', CHKContent);
        dispatch("EditPost");
      } else {
        commit('setsubFailure', true);
        commit('setMSGfaillure',"Veuillez vérifier le(s) champ(s) de formulaire");
        commit('setchkEdit', false);
      }
    },
    VerifyModeratePost({commit,dispatch}){
      let CHKtitle = document.getElementById("TitleMod").value;
      let CHKContent = document.getElementById("ContentMod").value;

      if(CHKtitle.length > 2 && CHKContent.length > 4){
        commit('setCurrentMtitle', CHKtitle);
        commit('setCurrentMcontent', CHKContent);
        dispatch("ModeratePost");
      } else {
        commit('setsubFailure', true);
        commit('setMSGfaillure',"Veuillez vérifier le(s) champ(s) de formulaire");
        commit('setchkModerate', false);
      }
    },

    WallEditPost({commit},PostId){
      commit('setLoading',true);
      let Counter = 0;

      // Chargement du post (Axios)
      axios.get(this.state.urlAPI+"/api/messages/?fields=id,title,content,attachment")
      .then(res =>{
        commit('setCurrentPostId',PostId);
        Counter = res.data.length;
        for(let i=0; i < Counter; i++){
          if(res.data[i].id == PostId){
            commit('setCurrentEtitle',res.data[i].title);
            commit('setCurrentEcontent',res.data[i].content);
            commit('setCurrentEattachment',res.data[i].attachment);
            commit('setEDeleteFile', false);
          }
        }
        commit('setLoading',false);
      })
      .catch(err =>{
        commit('setsubFailure', true);
        commit('setMSGfaillure',"Le message est introuvable, impossible de le charger.");
        commit('setLoading',false);
      });
    },
    WallModeratePost({commit},PostId){
      commit('setLoading',true);
      let Counter = 0;

      // Chargement du post (Axios)
      axios.get(this.state.urlAPI+"/api/messages/?fields=id,title,content,attachment")
      .then(res =>{
        commit('setCurrentPostId',PostId);
        Counter = res.data.length;
        for(let i=0; i < Counter; i++){
          if(res.data[i].id == PostId){
            commit('setCurrentMtitle',res.data[i].title);
            commit('setCurrentMcontent',res.data[i].content);
            commit('setCurrentMattachment',res.data[i].attachment);
            commit('setMDeleteFile',false);
          }
          commit('setLoading',false);
        }
      })
      .catch(err =>{
        commit('setsubFailure', true);
        commit('setMSGfaillure',"Le message est introuvable, impossible de le charger.");
        commit('setLoading',false);
      });
    },

    EditPost({commit, dispatch}){

      let formData = new FormData();
      // Ajout des éléments au FormData ( title, content, attachment )
      formData.append("title",this.state.Etitle);
      formData.append("content",this.state.Econtent);
      formData.append("attachment",this.state.Eattachment);
      formData.append("deleted",JSON.parse(this.state.EDeleteFile));

      // Configuration de l'en-tete AXIOS (intégration du token)
      axios.interceptors.request.use(
        config => {
          config.headers = {
            'authorization': `Bearer ${this.state.Token}`,
            'Accept': 'application/json',
            'Content-Type':'multipart/form-data;boundary="WebKitFormBoundary"'
          }
          // config.headers.authorization = `Bearer ${this.state.Token}`;
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      );

      // Initialisation de la promesse vers l'API via AXIOS
      axios.put(this.state.urlAPI+'/api/messages/'+this.state.CurrentPostId,formData)
      .then(res =>{
        // Envoie des données en base

        //Sucess
        commit('setsubOkay', true);
        commit('setsubCompleted', true);
        commit('setLoading', false);

        // Completed
        document.getElementById('TitleEdit').value = '';
        document.getElementById('ContentEdit').value = '';
        commit('setLoading', false);
        dispatch("ResetFields");

        $('#EditModal').modal('hide');
        dispatch("WallLoad");
      })
      .catch(err =>{
        commit('setsubFailure', true);
        commit('setMSGfaillure',"Echec de mise à jour du message.");
        commit('setsubCompleted', true);
        commit('setLoading', false);
      });
    },

    EditUploadPreview({commit}){
      let CHKtitle = document.getElementById("TitleEdit").value;
      let CHKContent = document.getElementById("ContentEdit").value;
      commit('setCurrentEtitle', CHKtitle);
      commit('setCurrentEcontent', CHKContent);

      let Status = document.getElementById("EditJoin").checked;
      
      if(Status){
        commit('setUploadFile', true);
      }
      // Ajout des éléments au FormData (image)
      let formData = new FormData();
      let imageFile = document.querySelector("#EdituploadFile");
      formData.append("image",imageFile.files[0]);

      // Configuration de l'en-tete AXIOS (intégration du token)
      axios.interceptors.request.use(
        config => {
            config.headers = {
              'authorization': `Bearer ${this.state.Token}`,
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
      axios.post(this.state.urlAPI+'/api/messages/new/preview',formData)
      .then(res =>{
        commit('setCurrentEattachment',res.data);

        // Completed
        console.log("Completed");
      })
      .catch(err =>{
        commit('setsubFailure', true);
        commit('setMSGfaillure',"Imposible de charger l'image selectionnée (Format supportés : jpg, jpeg, png)");
      });
    },
    EditDeletePreview({commit}){
      let CHKtitle = document.getElementById("TitleEdit").value;
      let CHKContent = document.getElementById("ContentEdit").value;
      commit('setCurrentEtitle', CHKtitle);
      commit('setCurrentEcontent', CHKContent);

      let Status = document.getElementById("EditJoin").checked;
      
      if(!Status){
        commit('setUploadFile', false);
      }

      // Configuration de l'en-tete AXIOS (intégration du token)
      axios.interceptors.request.use(
        config => {
          config.headers = {
            'authorization': `Bearer ${this.state.Token}`,
          }
          return config;
        },
        error => {
            return Promise.reject(error);
        }
      );

      console.log(this.state.Npicture);

      // Initialisation de la promesse vers l'API via AXIOS
      axios.delete(this.state.urlAPI+'/api/messages/new/preview?image='+this.state.Npicture)
      .then(res =>{
        commit("setNpicture",'');

        // Completed
        console.log("Completed");
      })
      .catch(err =>{
        commit('setsubFailure', true);
        commit('setMSGfaillure',"Imposible de supprimer le preview (fichier introuvable)");
      });
    },
    RemoveEAttachment({commit}){
      commit('setEDeleteFile', true);
    },

    ModeratePost({commit, dispatch}){
      // Initialisation du FormData
      let formData = new FormData();
      // Ajout des autres éléments au FormData ( title, content, attachment, delete )
      formData.append("title",this.state.Mtitle);
      formData.append("content",this.state.Mcontent);
      formData.append("attachment",this.state.Mattachment);
      formData.append("deleted",JSON.parse(this.state.MDeleteFile));

      // Configuration de l'en-tete AXIOS (intégration du token)
      axios.interceptors.request.use(
        config => {
          config.headers = {
            'authorization': `Bearer ${this.state.Token}`,
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
      if(this.state.isAdmin){
        axios.put(this.state.urlAPI+'/api/messages/'+this.state.CurrentPostId+'/moderate',formData)
        .then(res =>{
          // Envoie des données en base

          //Sucess
          commit('setsubOkay', true);
          commit('setsubCompleted', true);

          // Completed
          document.getElementById('TitleMod').value = '';
          document.getElementById('ContentMod').value = '';
          commit('setLoading', false);
          dispatch("ResetFields");

          $('#ModerateModal').modal('hide');
          dispatch("WallLoad");
        })
        .catch(err =>{
          console.log(err);
          commit('setsubFailure', true);
          commit('setMSGfaillure',"Echec de mise à jour du message.");
          commit('setsubCompleted', true);
          commit('setLoading', false);
        });
      } else {
        commit('setsubFailure', true);
        commit('setMSGfaillure',"Vous ne disposez pas des droits de modération.");
        commit('setsubCompleted', true);
        commit('setLoading',false);
      }
    },
    ModerateDeletePreview({commit}){
      let CHKtitle = document.getElementById("TitleEdit").value;
      let CHKContent = document.getElementById("ContentEdit").value;
      commit('setCurrentEtitle', CHKtitle);
      commit('setCurrentEcontent', CHKContent);

      let Status = document.getElementById("EditJoin").checked;
      
      if(!Status){
        commit('setUploadFile', false);
      }

      // Configuration de l'en-tete AXIOS (intégration du token)
      axios.interceptors.request.use(
        config => {
          config.headers = {
            'authorization': `Bearer ${this.state.Token}`,
          }
          return config;
        },
        error => {
            return Promise.reject(error);
        }
      );

      console.log(this.state.Npicture);

      // Initialisation de la promesse vers l'API via AXIOS
      axios.delete(this.state.urlAPI+'/api/messages/new/preview?image='+this.state.Npicture)
      .then(res =>{
        commit("setNpicture",'');

        // Completed
        console.log("Completed");
      })
      .catch(err =>{
        commit('setsubFailure', true);
        commit('setMSGfaillure',"Imposible de supprimer le preview (fichier introuvable)");
      });
    },
    RemoveMAttachment({commit}){
      commit('setMDeleteFile', true);
    },

    ResetFields({commit}){
      document.getElementById("EditJoin").checked = false;
      document.querySelector("#EdituploadFile").value = '';
      commit('setCurrentEtitle','');
      commit('setCurrentEcontent','');
      commit('setCurrentEattachment','');
      commit('setEDeleteFile', false);
      commit('setCurrentMtitle','');
      commit('setCurrentMcontent','');
      commit('setCurrentMattachment','');
      commit('setMDeleteFile',false);
      commit('setsubFailure', false);
      commit('setMSGfaillure',"");
      commit('setsubOkay', false);
      commit('setsubCompleted', false);
      commit('setUploadFile', false);
    },

    // Like & Dislike Post
    LikePost({commit,dispatch},PostId){
      // Configuration de l'en-tete AXIOS (intégration du token)
      axios.interceptors.request.use(
        config => {
          config.headers.authorization = `Bearer ${this.state.Token}`;
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      );

      axios.post(this.state.urlAPI+"/api/messages/"+PostId+"/vote/like")
      .then(res =>{
        // Like le post
        console.log('Liked');
        commit('setLiked', true);
        commit('setLikes', this.state.LikeCounter +=1);

        // Rechargement du mur après opération
        dispatch("WallLoad");
      })
      .catch(err =>{
        axios.post(this.state.urlAPI+"/api/messages/"+PostId+"/vote/dislike")
        .then(res=>{
          // Dislike le post
          console.log('Disliked');
          commit('setLiked', false);
          commit('setLikes', this.state.LikeCounter -=1);

          // Rechargement du mur après opération
          dispatch("WallLoad");
        })
      });

    },

    DeletePost({dispatch},PostId){
      // Configuration de l'en-tete AXIOS (intégration du token)
      axios.interceptors.request.use(
        config => {
          config.headers.authorization = `Bearer ${this.state.Token}`;
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      );
      if(this.state.isAdmin){
        // Initialisation de la promesse vers l'API via AXIOS
        axios.delete(this.state.urlAPI+'/api/messages/'+PostId+'/moderate')
        .then(res =>{
          // Rechargement du mur après opération
          dispatch("WallLoad");
        })
        .catch(err =>{
          console.log(err);
        });
        console.log('Post Deleted');
      } else {
        // Initialisation de la promesse vers l'API via AXIOS
        axios.delete(this.state.urlAPI+'/api/messages/'+PostId)
        .then(res =>{
          // Rechargement du mur après opération
          dispatch("WallLoad");
        })
        .catch(err =>{
          console.log(err);
        });
        console.log('Post Deleted');
      }      
    },

    // Send Comments
    CommentVerify({commit},PostId){
      let Comment = document.getElementById('CP'+PostId).value;

      if(Comment !=''){
        commit('setValueComment', true);
      } else {
        commit('setValueComment', false);
      }
    },

    SubmitComment({commit,dispatch},Post){
      // Configuration de l'en-tete AXIOS (intégration du token)
      axios.interceptors.request.use(
        config => {
          config.headers.authorization = `Bearer ${this.state.Token}`;
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      );

      let comment = document.getElementById('CP'+Post.id).value;
      axios.post(this.state.urlAPI+"/api/messages/comment/"+Post.id+"/new/",{
        comment : comment
      })
      .then(res =>{
        // Sucess
        document.getElementById('CP'+Post.id).value = '';
        commit('setValueComment', false);
        commit('setsubOkay', true);
        commit('setsubCompleted', true);

        // Rechargement du mur après opération
        commit('setsubOkay', false);
        commit('setsubCompleted', false);
        commit('setValueComment', false);
        dispatch("WallLoad");
      })
      .catch(err =>{
        // Faillure
        console.log(err);
        commit('setsubFailure', true);
        commit('setsubCompleted', true);
      });
    },

    // Delete Comment
    DeleteComment({dispatch},Comment){
      // Configuration de l'en-tete AXIOS (intégration du token)
      axios.interceptors.request.use(
        config => {
          config.headers.authorization = `Bearer ${this.state.Token}`;
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      );
      if(this.state.isAdmin){
        axios.delete(this.state.urlAPI+"/api/messages/comment/"+Comment.messageId+"/"+Comment.id+"/moderate/")
        .then(res=>{
          console.log('commentaire supprimé');

          // Rechargement du mur après opération
          dispatch("WallLoad");
        })
        .catch(err =>{
          console.log(err);
        });

      } else {
        axios.delete(this.state.urlAPI+"/api/messages/comment/"+Comment.messageId+"/"+Comment.id)
        .then(res=>{
          console.log('commentaire supprimé');
          // Rechargement du mur après opération
          dispatch("WallLoad");
        })
        .catch(err =>{
          console.log(err);
        });
      }
    },

    // Load & Reload Wall
    WallLoad({commit}){
      // Lors du chargement du composant, appeler les messages dans la BDD
      // Initialisation de la promesse vers l'API via AXIOS

      axios.all([
        axios.get(this.state.urlAPI+'/api/messages/?order=createdAt:DESC'),
        axios.get(this.state.urlAPI+'/api/messages/comment?fields=id,messageId,username,comment,createdAt&order=createdAt:DESC')
      ])
      .then(responseArr => {
        commit('setLoading',true);
        commit('setPosts', responseArr[0].data);
        commit('setComments', responseArr[1].data);

        if(this.state.Posts !=""){
          commit('setNoData', false);
        }

        commit('setLoading',false);
      })
      .catch(err =>{
        console.log(err);
        commit('setLoading',false);
      });
    },

  },
  modules: {
    //
  }
})
