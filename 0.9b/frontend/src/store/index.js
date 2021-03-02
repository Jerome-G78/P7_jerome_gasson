import { resolveTransitionHooks } from 'vue';
import { createStore } from 'vuex'


export default createStore({
  state: {
    urlAPI:'http://localhost:3000',
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

    // Delete Comments
    setCurrentCommentId(state, newValue){
      state.CurrentCommentId = newValue;
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
    }

    // N'oubliez-pas, Ces données devront être appelés depuis les composants et/ou Actions
  },

  actions: {

    // Singin
    SignInVerify({commit}){
      let Email = document.getElementById('Semail').value;
      let Pwd = document.getElementById('Spwd').value;
      let PwdC = document.getElementById('SpwdC').value;
      let Name = document.getElementById('Sname').value;
      // console.log(Email, Pwd, PwdC, Name);

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
      console.log(this.state.Loading);
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
        console.log(res);
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
      //WIP
      console.log(err);
      commit('setsubFailure', true);
      // Cleaning
      document.getElementById('Spwd').value = '';
      document.getElementById('SpwdC').value = '';
      commit('setLoading', false);

      // Completed
      commit('setsubCompleted', true);
      commit('setLoading', false);
      console.log(this.state.Loading);
      });
    },
    ResetSignInStats({commit}){
      document.getElementById('Semail').value = '';
      document.getElementById('Spwd').value = '';
      document.getElementById('SpwdC').value = '';
      document.getElementById('Sname').value = '';
      document.getElementById('SBio').value = '';
      commit('setsubFailure', false);
      commit('setsubOkay', false);
      commit('setsubCompleted', false);
      commit('setCHKeMail', false);
      commit('setCHKpassword', false);
      commit('setCHKuserName', false);
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
        console.log(res);
        commit('setsubOkay', true);
        commit('setsubCompleted', true);
        console.log("Connected : "+ this.state.Connected);
        commit('setEmail', res.data.email);
        console.log("E-Mail : "+this.state.email);
        commit('setUserName', res.data.username);
        console.log("userName : "+this.state.userName);
        commit('setUserID', res.data.id);
        console.log("userId : "+this.state.userId);
        commit('setIsAdmin', res.data.isAdmin);
        console.log("User is Admin : "+this.state.isAdmin);

        // Completed
        commit('setsubOkay', false);
        commit('setsubCompleted', false);
        commit('setLoading', false);
        console.log(this.state.Loading);
      })
      .catch(err =>{
        localStorage.removeItem("Connected");
        commit('setConnected', false);
        commit('setTokenExpired', true);
        console.log(err);
      });
    },

    LogInVerify({commit}){
      let Email = document.getElementById('Lemail').value;
      let Pwd = document.getElementById('Lpwd').value;

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
      console.log("Loading : "+this.state.Loading);
      let Email = document.getElementById('Lemail').value;
      let Pwd = document.getElementById('Lpwd').value;

      // Initialisation de la promesse vers l'API via AXIOS
      axios.post(this.state.urlAPI+'/api/users/login/', {
        email: Email,
        password: Pwd
      })
      .then(res =>{
        // Récupération des information du compte de l'utilisateur
        // console.log(res);
        commit('setsubOkay', true);
        commit('setsubCompleted', true);
        commit('setConnected', true);
        localStorage.setItem("Connected", true);
        console.log("Connected : "+ this.state.Connected);
        commit('setEmail', res.data.email);
        console.log("Adress Mail : "+this.state.email);
        document.getElementById('Lemail').value = '';
        document.getElementById('Lpwd').value = '';
        commit('setUserName', res.data.userName);
        console.log("userName : "+this.state.userName);
        commit('setUserID', res.data.userId);
        console.log("user Id : "+this.state.userId);
        commit('setToken', res.data.token);
        localStorage.setItem("Token", this.state.Token);
        console.log("User Token : "+this.state.Token);
        commit('setIsAdmin', res.data.isAdmin);
        console.log("User is Admin : "+this.state.isAdmin);
        commit('setLoading', false);
        console.log(this.state.Loading);

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
          //WIP
          console.log(err);
          localStorage.removeItem("Connected");
          commit('setConnected', false);
          commit('setLoading', false);
          console.log(this.state.Loading);
      });
    },

    ResetLoginStats(){
      document.getElementById('Lemail').value = '';
      document.getElementById('Lpwd').value = '';
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

        // console.log(UserProfil);
        // Sucess
        commit('setUserID',UserProfil.userID);
        commit('setUserName',UserProfil.UserName);
        commit('setEmail',UserProfil.Email);
        commit('setBio',UserProfil.Bio);
        console.log('API - UserProfil : Completed!');
    })
    .catch(err =>{
        console.log(err);
        commit('setLoading', false);
        console.log(this.state.Loading);
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
        console.log(res);
        this.bio = BioArea;

        //SubOkay
        commit('setBio', BioArea);
        commit('setsubOkay', true);
        commit('setsubCompleted', true);
        commit('setLoading', false);
        console.log(this.state.Loading);

        // Completed
        document.getElementById('Bio').value = '';
        commit('setsubCompleted', true);
        commit('setLoading', false);
        console.log(this.state.Loading);
      })
      .catch(err =>{
        console.log(err);
        commit('setsubFailure', true);
        commit('setLoading', false);
        console.log(this.state.Loading);
      });

    },

    CheckConfirm({commit}){
      let Confirm = document.getElementById("Confirmation").value;

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
        console.log("Connected : "+ this.state.Connected);
        commit('setEmail', '');
        console.log(this.state.email);
        commit('setUserName', '');
        console.log(this.state.userName);
        commit('setUserID', 0);
        console.log(this.state.userId);
        commit('setToken', '');
        localStorage.removeItem('Token');
        console.log(this.state.Token);
        commit('setIsAdmin', false);
        console.log(this.state.isAdmin);
        commit('setLoading', false);
        console.log(this.state.Loading);

        // Recharger la page
        dispatch("WallLoad");
      })
      .catch(err =>{
        console.log(err);
      });

    },

    ResetProfilStats(){
      document.getElementById('Search').value = '';
      document.getElementById('Bio').value = '';
      document.getElementById('Confirmation').value = '';
      commit('setBioEdit', false);
      commit('setfindUser', false);
      commit('setfindUserAdmin', false);
      commit('setfindedUser', '');
      commit('setsubOkay', false);
      commit('setsubFailure', false);
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
      console.log(this.state.email);
      commit('setUserName', '');
      console.log(this.state.userName);
      commit('setUserID', 0);
      console.log(this.state.userId);
      localStorage.removeItem('Token');
      commit('setToken', '');
      console.log(this.state.Token);
      commit('setIsAdmin', false);
      console.log(this.state.isAdmin);
      localStorage.removeItem('Connected');
      commit('setConnected', false);
      console.log(this.state.Connected);
      commit('setLoading', false);
      console.log(this.state.Loading);

      // Recharger la page internet
      document.location.reload();
    },

    // Profil (Administration)
    CheckNameExist(){
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
          console.log('finded!');
          commit('setfindUser', true);
          commit('setfindUserAdmin', res.data.isAdmin);
        })
        .catch(err=>{
          console.log('Not Found! ' + err);
        });
      } else {
        // Ne rien faire
        commit('setfindUser', false);
        commit('setfindUserAdmin', false);
        console.log('Not Found!');
      }
    },
    addRight(){
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
        console.log(res);
        commit('setRightAdded', true);
        commit('setfindUser', false);
        document.getElementById('Search').value = '';
      })
      .catch(err=>{
        console.log(err);
      });
    },
    removeRight(){
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
        console.log(res);
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
      console.log("InMsgVerify");
      let CHKtitle = document.getElementById("Title").value;
      let CHKContent = document.getElementById("Content").value;
      console.log("MSG VERIFY : " + CHKtitle, CHKContent);

      if(CHKtitle.length > 2 && CHKContent.length > 4){
        commit('setNtitle', CHKtitle);
        commit('setNcontent', CHKContent);
        commit('setchkCompleted', true);
        dispatch('PostPict');
      } else {
        commit('setsubFailure', true);
        commit('setchkCompleted', false);
      }
    },
    MsgVerifyFail({commit}){
      commit('setsubFailure', false);
    },

    UploadPreview({commit}){
      let CHKtitle = document.getElementById("Title").value;
      let CHKContent = document.getElementById("Content").value;
      console.log(CHKtitle, CHKContent);
      commit('setNtitle', CHKtitle);
      commit('setNcontent', CHKContent);

      let Status = document.getElementById("Join").checked;
      console.log("Status : "+Status);
      
      if(Status){
        commit('setUploadFile', true);
        console.log("Upload :" + this.state.uploadFile)
      }
      
      let formData = new FormData();
      let imageFile = document.querySelector("#uploadFile");
      console.log(imageFile.value, imageFile.files[0]);
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
        console.log(res);
        commit("setNpicture",res.data);
        console.log(this.state.Npicture);

        // Completed
        console.log("Completed");
      })
      .catch(err =>{
        console.log(err);
      });
    },
    DeletePreview({commit}){
      let CHKtitle = document.getElementById("Title").value;
      let CHKContent = document.getElementById("Content").value;
      console.log(CHKtitle, CHKContent);
      commit('setNtitle', CHKtitle);
      commit('setNcontent', CHKContent);

      let Status = document.getElementById("Join").checked;
      console.log("Status : "+Status);
      
      if(!Status){
        commit('setUploadFile', false);
        console.log("Upload : " + this.state.uploadFile)
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
        console.log(res);
        commit("setNpicture",'');
        console.log(this.state.Npicture);

        // Completed
        console.log("Completed");
      })
      .catch(err =>{
        console.log(err);
      });
    },

    PostPict({commit, dispatch}){
      console.log("InPostPict");
      console.log(this.state.Ntitle, this.state.Ncontent, this.state.uploadFile);
      commit('setLoading', true);
      console.log(this.state.Loading);

      if(this.state.uploadFile){
        console.log('Attatched');
        // Récupération du fichier Image
        let formData = new FormData();
        let imageFile = document.querySelector("#uploadFile");
        // console.log(imageFile.value, imageFile.files[0]);
        formData.append("image",imageFile.files[0]);
        // Ajout des autres éléments au FormData ( title, content, attachment )
        formData.append("title",document.getElementById("Title").value);
        formData.append("content",document.getElementById("Content").value);
        formData.append("attachment",true);
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
        axios.post(this.state.urlAPI+'/api/messages/new/',formData)
        .then(res =>{
          console.log(res);
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
          console.log(this.state.Loading);
        });

      } else {
        console.log('NoAttatched');
        console.log(this.state.Ntitle, this.state.Ncontent);
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
        axios.post(this.state.urlAPI+'/api/messages/new/', {
          title: this.state.Ntitle,
          content: this.state.Ncontent,
          attachment : false
        })
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
      console.log('Reset...');
      commit('setNtitle', '');
      commit('setNcontent', '');
      commit('setNpicture','');
      commit('setchkCompleted', false);
      commit('setsubFailure', false);
      commit('setUploadFile', false);
      commit('setsubOkay', false);
      commit('setsubCompleted', false);
      commit('setLoading',false);
      console.log(this.state.Loading);
    },

    // Edit Post | Moderate Post

    VerifyEditPost({commit,dispatch}){
      let CHKtitle = document.getElementById("TitleEdit").value;
      let CHKContent = document.getElementById("ContentEdit").value;
      console.log(CHKtitle, CHKContent);

      if(CHKtitle.length > 2 && CHKContent.length > 4){
        commit('setCurrentEtitle', CHKtitle);
        commit('setCurrentEcontent', CHKContent);
        dispatch("EditPost");
      } else {
        commit('setchkEdit', false);
        console.log(this.state.chkEdit);
      }
    },

    VerifyModeratePost({commit,dispatch}){
      let CHKtitle = document.getElementById("TitleMod").value;
      let CHKContent = document.getElementById("ContentMod").value;
      console.log(CHKtitle, CHKContent);

      if(CHKtitle.length > 2 && CHKContent.length > 4){
        commit('setCurrentMtitle', CHKtitle);
        commit('setCurrentMcontent', CHKContent);
        dispatch("ModeratePost");
      } else {
        commit('setchkModerate', false);
        console.log(this.state.chkModerate);
      }
    },

    WallEditPost({commit},PostId){
      commit('setLoading',true);
      let Counter = 0;
      // Chargement du post (Axios)
      axios.get(this.state.urlAPI+"/api/messages/?fields=id,title,content,attachment")
      .then(res =>{
        console.log(res);
        commit('setCurrentPostId',PostId);
        Counter = res.data.length;
        for(let i=0; i < Counter; i++){
          if(res.data[i].id == PostId){
            commit('setCurrentEtitle',res.data[i].title);
            console.log(this.state.Etitle);
            commit('setCurrentEcontent',res.data[i].content);
            console.log(this.state.Econtent);
            commit('setCurrentEattachment',res.data[i].attachment);
            console.log(this.state.Eattachment);
            commit('setEDeleteFile', false);
          }
        }
        commit('setLoading',false);
      })
      .catch(err =>{
        console.log(err);
        commit('setLoading',false);
      });
    },
    WallModeratePost({commit},PostId){
      commit('setLoading',true);
      let Counter = 0;
      // Chargement du post (Axios)
      axios.get(this.state.urlAPI+"/api/messages/?fields=id,title,content,attachment")
      .then(res =>{
        console.log(res);
        commit('setCurrentPostId',PostId);
        Counter = res.data.length;
        for(let i=0; i < Counter; i++){
          if(res.data[i].id == PostId){
            commit('setCurrentMtitle',res.data[i].title);
            console.log(this.state.Mtitle);
            commit('setCurrentMcontent',res.data[i].content);
            console.log(this.state.Mcontent);
            commit('setCurrentMattachment',res.data[i].attachment);
            console.log(this.state.Mattachment);
            commit('setMDeleteFile',false);
          }
          commit('setLoading',false);
        }
      })
      .catch(err =>{
        console.log(err);
        commit('setLoading',false);
      });
    },

    EditPost({commit, dispatch}){
      let TitleEdit = this.state.Etitle;
      let ContentEdit = this.state.Econtent;
      let AttachmentEdit = this.state.Eattachment;
      let Deleted = JSON.parse(this.state.EDeleteFile);
      console.log(this.state.CurrentPostId);
      console.log(TitleEdit, ContentEdit, AttachmentEdit, Deleted);

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
      axios.put(this.state.urlAPI+'/api/messages/'+this.state.CurrentPostId,{
        title : TitleEdit,
        content : ContentEdit,
        attachment : AttachmentEdit,
        deleted : Deleted
      })
      .then(res =>{
        // Envoie des données en base
        console.log(res);

        //Sucess
        commit('setsubOkay', true);
        commit('setsubCompleted', true);
        commit('setLoading', false);
        console.log(this.state.Loading);

        // Completed
        document.getElementById('TitleEdit').value = '';
        document.getElementById('ContentEdit').value = '';
        commit('setLoading', false);
        dispatch("ResetFields");

        $('#EditModal').modal('hide');
        dispatch("WallLoad");
      })
      .catch(err =>{
        console.log(err);
        commit('setsubFailure', true);
        commit('setsubCompleted', true);
        commit('setLoading', false);
        console.log(this.state.Loading);
      });

    },
    RemoveEAttachment({commit}){
      commit('setEDeleteFile', true);
    },

    ModeratePost({commit, dispatch}){
      let TitleMod = this.state.Mtitle;
      let ContentMod = this.state.Mcontent;
      let AttachmentMod = this.state.Mattachment;
      let Deleted = JSON.parse(this.state.MDeleteFile);
      console.log(this.state.CurrentPostId);
      console.log(TitleMod,ContentMod,AttachmentMod,Deleted);

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
      if(this.state.isAdmin){
        axios.put(this.state.urlAPI+'/api/messages/'+this.state.CurrentPostId+'/moderate',{
        title : TitleMod,
        content : ContentMod,
        attachment : AttachmentMod,
        deleted : Deleted,
        })
        .then(res =>{
          // Envoie des données en base
          console.log(res);

          //Sucess
          commit('setsubOkay', true);
          commit('setsubCompleted', true);
          commit('setLoading', false);
          console.log(this.state.Loading);

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
          commit('setsubCompleted', true);
          commit('setLoading', false);
          console.log(this.state.Loading);
        });
      } else {
        commit('setsubFailure', true);
        commit('setsubCompleted', true);
        commit('setLoading',false);
        console.log(this.state.Loading);
      }
    },
    RemoveMAttachment({commit}){
      commit('setMDeleteFile', true);
    },

    ResetFields({commit}){
      commit('setCurrentEtitle','');
      commit('setCurrentEcontent','');
      commit('setCurrentEattachment','');
      commit('setEDeleteFile', false);
      commit('setCurrentMtitle','');
      commit('setCurrentMcontent','');
      commit('setCurrentMattachment','');
      commit('setMDeleteFile',false);
      commit('setsubFailure', false);
      commit('setsubOkay', false);
      commit('setsubCompleted', false);
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
        console.log(res);
        commit('setLiked', true);
        commit('setLikes', this.state.LikeCounter +=1);
        console.log(this.state.LikeCounter);

        // Rechargement du mur après opération
        dispatch("WallLoad");
      })
      .catch(err =>{
        axios.post(this.state.urlAPI+"/api/messages/"+PostId+"/vote/dislike")
        .then(res=>{
          // Dislike le post
          console.log('Disliked');
          console.log(res);
          commit('setLiked', false);
          commit('setLikes', this.state.LikeCounter -=1);
          console.log(this.state.LikeCounter);

          // Rechargement du mur après opération
          dispatch("WallLoad");
        })
      });

    },

    DeletePost({commit,dispatch},PostId){
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
          console.log(res);

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
          console.log(res);
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
      console.log(comment);
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
        commit('setsubFailure', true);
        commit('setsubCompleted', true);
      });

    },

    // Delete Comment
    DeleteComment({commit,dispatch},Comment){
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
          console.log(res);
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
          console.log(res);
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
        console.log(this.state.Loading);
        commit('setPosts', responseArr[0].data);
        // this.state.Posts = responseArr[0].data;
        console.log("Numbers of Posts: "+this.state.Posts.length);
        console.log(this.state.Posts);
        commit('setComments', responseArr[1].data);
        console.log("Numbers of Comments: "+this.state.Comments.length);
        console.log(this.state.Comments);

        if(this.state.Posts !=""){
          commit('setNoData', false);
          console.log("NoData : "+this.state.NoData);
        }

        commit('setLoading',false);
        console.log(this.state.Loading);
      })
      .catch(err =>{
        console.log(err);
        commit('setLoading',false);
        console.log(this.state.Loading);
      });
    },

  },
  modules: {
    //
  }
})
