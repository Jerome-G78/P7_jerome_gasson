import { createStore } from 'vuex'


export default createStore({
  state: {
    urlAPI:'http://shadsoft.no-ip.org:3000',
    footer:'Groupomania 2020 - Tout drois résérvés',
    // Déclaration des données du "store" de vue X
    Connected: false,
    isAdmin: false,
    ownMessage: false,
    ownComment: false,
    Token:'',

    // Profil
    userId:0,
    userName:'',
    email:'',
    bio:'Non renseigné',
    BioEdit : false,

    // SignIn
    CHKeMail:false,
    CHKpassword:false,
    ComparePwds:false,
    CHKuserName:false,

    // New Message
    Ntitle:'',
    Ncontent:'',
    Nattachment: 0,
    Npicture:'', // Bug Chrome : impossible de charger un fichier image local - d:\fakepath... 
    chkCompleted:false,
    uploadFile:false,

    // Posts & Comments
    Posts:[],
    Comments:[],

    ValueComment:false,

    // Edit, Delete & Moderate Posts
    CurrentPostId:0,
    Etitle:'',
    Econtent:'',

    Mtitle:'',
    Mcontent:'',

    // Likes
    LikesCounter : 0,
    Liked:false,

    // Loading
    Loading:false,
    WallReload:false,
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
      state.CHKuserName = newValue;
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

    setBioEdit(state, newValue){
      state.BioEdit = newValue;
    },
    setBio(state, newValue){
      state.bio = newValue;
    },

    // New Message
    setNtitle(state, newValue){
      state.Ntitle = newValue;
    },
    setNcontent(state, newValue){
      state.Ncontent = newValue;
    },
    setNattachment(state, newValue){
      state.Nattachment = newValue;
    },
    setNpicture(state, newValue){
      state.Npicture = newValue;
    },

    // Edit & Moderate Posts
    setCurrentPostId(state, newValue){
      state.CurrentPostId = newValue;
    },
    setCurrentEtitle(state, newValue){
      state.Etitle = newValue;
    },
    setCurrentEcontent(state, newValue){
      state.Econtent = newValue;
    },
    setCurrentMtitle(state, newValue){
      state.Mtitle = newValue;
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

    // NoMessage
    setNoData(state, newValue){
      state.NoData = newValue;
    },

    // Wall Load
    setCommentForPost(state, newValue){
      state.CommentForPost = newValue;
    },

    // Reload
    setWallReload(state, newValue){
      state.WallReload = newValue;
    },

    // Own Message & Own Comment

    setOwnMessage(state, newValue){
      state.ownMessage = newValue;
    },
    setOwnComment(state, newValue){
      state.ownComment = newValue;
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
  },

  getters:{
    // Role similaire à computed pour VueX

    urlAPI(state){
      return state.urlAPI;
    },
    NoData(state){
      return state.NoData;
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
    Nattachment(state){
      return state.Nattachment;
    },
    uploadFile(state){
      return state.uploadFile;
    },

    // Edit Post | Moderate post
    EditTitle(state){
      return state.Etitle;
    },
    EditContent(state){
      return state.Econtent;
    },
    ModerateTitle(state){
      return state.Mtitle;
    },
    ModerateContent(state){
      return state.Mcontent;
    },

    // Comments
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

    ownMessage(state){
      return state.ownMessage;
    },
    ownComment(state){
      return state.ownComment;
    },

    // Status
    Loading(state){
      return state.Loading;
    },
    WallReload(state){
      return state.WallReload;
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
      console.log(Email, Pwd, PwdC, Name);


      if(Email !=''){
          commit('setCHKeMail', true);

      } else {
          commit('setCHKeMail', false);
      }

      if(Name !=''){
          commit('setCHKuserName', true);
      } else {
          commit('setCHKuserName', false);
      }

      if(Pwd !='' && PwdC !='' && (Pwd == PwdC)){
          commit('setComparePwds', false);
          commit('setCHKpassword', true);
      }
      if(Pwd !='' && PwdC !='' && (Pwd != PwdC)){
          commit('setComparePwds', true);
      }
      if(Pwd=='' || PwdC=='') {
          commit('setCHKpassword', false);
      }
    },
    Subscribe({commit}){
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
      }).then(res => {
          console.log(res);
          this.state.subOkay = true;
          // Cleaning
          document.getElementById('Semail').value = '';
          document.getElementById('Spwd').value = '';
          document.getElementById('SpwdC').value = '';
          document.getElementById('Sname').value = '';
          document.getElementById('SBio').value = '';

          // Completed
          this.state.subCompleted = true;
          commit('setLoading', false);
          console.log(this.state.Loading);

          // Masquer la fenêtre Modal
          $('#registrationModal').modal('hide');
      })
      .catch(err => {
      //WIP
      console.log(err);
      this.state.subFailure = true;
      // Cleaning
      document.getElementById('Spwd').value = '';
      document.getElementById('SpwdC').value = '';
      commit('setLoading', false);

      // Completed
      this.state.subCompleted = true;
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
      this.state.subFailure = false;
      this.state.subOkay = false;
      this.state.subCompleted = false;
      commit('setCHKeMail', false);
      commit('setCHKpassword', false);
      commit('setCHKuserName', false);
    },

    //Login
    LogInVerify({commit}){
      let Email = document.getElementById('Lemail').value;
      let Pwd = document.getElementById('Lpwd').value;

      if(Email !=''){
          commit('setCHKeMail', true);
      } else {
          commit('setCHKeMail', false);
      }

      if(Pwd!='') {
          commit('setCHKpassword', true);
      } else {
          commit('setCHKpassword', false);
      }

    },

    LogIn({commit}){
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
          this.state.subOkay = true;
          this.state.subCompleted = true;
          commit('setConnected', true);
          localStorage.setItem("Connected", true);
          console.log("Connected : "+ this.state.Connected);
          commit('setEmail', res.data.email);
          localStorage.setItem("Email", this.state.email);
          // console.log(this.state.email);
          document.getElementById('Lemail').value = '';
          document.getElementById('Lpwd').value = '';
          commit('setUserName', res.data.userName);
          localStorage.setItem("userName", this.state.userName);
          // console.log("userName : "+this.state.userName);
          commit('setUserID', res.data.userId);
          localStorage.setItem("userId", this.state.userId);
          // console.log(this.state.userId);
          commit('setToken', res.data.token);
          localStorage.setItem("Token", this.state.Token);
          // console.log("User Token : "+this.state.Token);
          commit('setIsAdmin', res.data.isAdmin);
          localStorage.setItem("isAdmin", this.state.isAdmin);
          // console.log("User is Admin : "+this.state.isAdmin);
          commit('setLoading',this.Loading = false);
          console.log(this.state.Loading);

          // Completed
          this.state.subOkay = false;
          this.state.subCompleted = false;
          commit('setConnected', true);
          console.log("User Connected : "+ this.state.Connected);
          // Masquer la fenêtre Modal
          $('#logginModal').modal('hide');

          // Recharger le mur
          commit('setWallReload', true);
          console.log(this.state.WallReload);
      })
      .catch(err =>{
          //WIP
          console.log(err);
          this.state.subFailure = true;
          // this.subFail = err.error;
          this.state.Loading = false;
          commit('setLoading', false);
          console.log(this.state.Loading);
      });

    },

    ResetLoginStats(){
      document.getElementById('Lemail').value = '';
      document.getElementById('Lpwd').value = '';
      this.state.subFailure = false;
      this.state.CHKeMail = false
      this.state.CHKpassword = false;
      this.state.subOkay = false;
      this.state.subCompleted = false;
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
          this.state.subOkay = true;
          this.state.subCompleted = true;
          commit('setLoading', false);
          console.log(this.state.Loading);

          // Completed
          document.getElementById('Bio').value = '';
          this.state.subCompleted = true;
          commit('setLoading', false);
          console.log(this.state.Loading);
      })
      .catch(err =>{
          //WIP
          console.log(err);
          this.state.subFailure = true;
          commit('setLoading', false);
          console.log(this.state.Loading);
      });

    },
    Unsubscribe({commit}){
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
          this.state.subOkay = false;
          this.state.subCompleted = false;
          commit('setConnected', false);
          localStorage.removeItem('Connected');
          console.log("Connected : "+ this.state.Connected);
          commit('setEmail', '');
          localStorage.removeItem('Email');
          console.log(this.state.email);
          commit('setUserName', '');
          localStorage.removeItem('userName');
          console.log(this.state.userName);
          commit('setUserID', 0);
          localStorage.removeItem('userId');
          console.log(this.state.userId);
          commit('setToken', '');
          localStorage.removeItem('Token');
          console.log(this.state.Token);
          commit('setIsAdmin', false);
          localStorage.removeItem('isAdmin');
          console.log(this.state.isAdmin);
          commit('setLoading', false);
          console.log(this.state.Loading);

          // Recharger la page
          dispatch("WallLoad");
          commit('setWallReload', true);
          console.log(this.state.WallReload);
      })
      .catch(err =>{
          console.log(err);
      });

    },
    AlreadyConnected(){
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
          this.state.bio = res.data.bio;
      })
      .catch(err =>{
          console.log(err);
      });
    },
    ResetProfilStats(){
      document.getElementById('Search').value = '';
      document.getElementById('Bio').value = '';
      this.state.BioEdit = false;
      this.state.findUser = false;
      this.state.findUserAdmin = false;
      this.state.findedUser = '';
      this.state.subOkay = false;
      this.state.subFailure = false;
      this.state.subCompleted = false;
      this.state.RightAdded = false;
      this.state.RightRemoved = false;
    },
    GoOut({commit}){
      // Réinitialisation des paramètres Vue X...
      // Supression des informations de session utilisateur...
      this.state.subOkay = false;
      this.state.subCompleted = false;
      commit('setEmail', '');
      localStorage.removeItem('Email');
      console.log(this.state.email);
      commit('setUserName', '');
      localStorage.removeItem('userName');
      console.log(this.state.userName);
      commit('setUserID', 0);
      localStorage.removeItem('userId');
      console.log(this.state.userId);
      commit('setToken', '');
      localStorage.removeItem('Token');
      console.log(this.state.Token);
      commit('setIsAdmin', false);
      localStorage.removeItem('isAdmin');
      console.log(this.state.isAdmin);
      commit('setConnected', false);
      localStorage.removeItem('Connected');
      console.log("Connected : "+ this.state.Connected);
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
              this.state.findUser = true;
              this.state.findUserAdmin = res.data.isAdmin;
          })
          .catch(err=>{
              console.log('Not Found! ' + err);
          });
      } else {
          // Ne rien faire
          this.state.findUser = false;
          this.state.findUserAdmin = false;
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
          this.state.RightAdded = true;
          this.state.findUser = false;
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
          this.state.RightRemoved = true;
          this.state.findUser = false;
          document.getElementById('Search').value = '';
      })
      .catch(err=>{
          console.log(err);
      });
    },

    // New Message
    MsgVerify({commit}){
      let CHKtitle = document.getElementById("Title").value;
      let CHKContent = document.getElementById("Content").value;
      console.log(CHKtitle, CHKContent);

      if(CHKtitle !=''){
          commit('setNtitle', CHKtitle);
      } else {
          commit('setNtitle', '');
      }

      if(CHKContent !=''){
        commit('setNcontent', CHKContent);
      } else {
        commit('setNcontent', '');
      }

      if(CHKtitle !='' && CHKContent !=''){
          this.state.chkCompleted = true;
      } else {
          this.state.chkCompleted = false;
      }

    },
    JoinPict({commit}){
      if(this.state.uploadFile){
        this.state.uploadFile = false;
        this.state.Nattachment = 0;
        commit('setNattachment', 0);
        commit('setNpicture','');
        console.log(this.state.Nattachment);

      } else {
          this.state.uploadFile = true;
          this.state.Nattachment = 1;
          commit('setNattachment', 1);
          console.log(this.state.Nattachment);
      }
    },
    PostPict({commit, dispatch}){
      console.log(this.state.Ntitle, this.state.Ncontent, this.state.uploadFile, this.state.Nattachment);
      commit('setLoading', true);
      console.log(this.state.Loading);

      if(this.state.Nattachment == 1){
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
              this.state.subOkay = true;
              this.state.chkCompleted = false;

              // Completed
              document.getElementById("Join").checked = false;
              document.getElementById("Title").value = '';
              document.getElementById("Content").value ='';
              this.state.subCompleted = true;
              this.state.Nattachment = 0;
              this.state.chkCompleted = false;
              this.state.subFailure = false;
              this.state.uploadFile = false;
              this.state.subOkay = false;
              this.state.subCompleted = false;
              dispatch("ResetNewMsgStats");

              commit('setLoading', false);
              console.log(this.state.Loading);

              $('#NewMessage').modal('hide');
              dispatch("WallLoad");
              commit('setWallReload', true);
              console.log(this.state.WallReload);

          })
          .catch(err =>{
              console.log(err);
              this.state.subFailure = true;
              // this.subFail = err.error;
              commit('setLoading', false);
              console.log(this.state.Loading);
          });

      } else {
          console.log('NoAttatched');
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
              title: document.getElementById("Title").value,
              content: document.getElementById("Content").value
          })
          .then(res =>{
              // Sucess
              this.state.subOkay = true;
              this.state.chkCompleted = false;

              // Completed
              document.getElementById("Join").checked = false;
              document.getElementById("Title").value = '';
              document.getElementById("Content").value ='';
              this.state.subCompleted = true;

              commit('setLoading', false);
              console.log(this.state.Loading);
              dispatch("ResetNewMsgStats");

              $('#NewMessage').modal('hide');

              // Recharger le mur
              dispatch("WallLoad");
              commit('setWallReload', true);
              console.log(this.state.WallReload);

          })
          .catch(err =>{
              console.log(err);
              this.state.subFailure = true;
              // this.subFail = err.error;
              commit('setLoading', false);
              console.log(this.state.Loading);
          });

      }      
    },
    ResetNewMsgStats({commit}){
      document.getElementById('Title').value = '';
      document.getElementById('Content').value = '';
      console.log('Reset...');
      commit('setNtitle', '');
      console.log(this.state.Ntitle);
      commit('setNcontent', '');
      console.log(this.state.Ncontent);
      document.getElementById("Join").checked = false;
      this.state.Nattachment = 0,
      this.state.chkCompleted = false;
      this.state.subFailure = false;
      this.state.uploadFile = false
      this.state.subOkay = false;
      this.state.subCompleted = false;
      commit('setLoading',false);
    },

    // Edit Post | Moderate Post
    WallEditPost({commit},PostId){
      let Counter = 0;
      // Chargement du post (Axios)
      axios.get(this.state.urlAPI+"/api/messages/?fields=id,title,content")
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
          }
        }
      })
      .catch(err =>{
          console.log(err);
      });
    },
    WallModeratePost({commit},PostId){
      let Counter = 0;
      // Chargement du post (Axios)
      axios.get(this.state.urlAPI+"/api/messages/?fields=id,title,content")
      .then(res =>{
        console.log(res);
        commit('setCurrentPostId',PostId);
        Counter = res.data.length;
        for(let i=0; i < Counter; i++){
          // console.log('B-For');
          if(res.data[i].id == PostId){
            commit('setCurrentMtitle',res.data[i].title);
            console.log(this.state.Mtitle);
            commit('setCurrentMcontent',res.data[i].content);
            console.log(this.state.Mcontent);
          }
        }
      })
      .catch(err =>{
          console.log(err);
      });
    },

    EditPost({commit, dispatch}){
      let TitleEdit = document.getElementById('TitleEdit').value;
      let Content = document.getElementById('ContentEdit').value;
      console.log(this.state.CurrentPostId);

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
          content : Content
          })
      .then(res =>{
          // Envoie des données en base
          console.log(res);

          //Sucess
          this.state.subOkay = true;
          this.state.subCompleted = true;
          commit('setLoading', false);
          console.log(this.state.Loading);

          // Completed
          document.getElementById('TitleEdit').value = '';
          document.getElementById('ContentEdit').value = '';
          commit('setLoading', false);
          dispatch("ResetFields");

          $('#EditModal').modal('hide');
          dispatch("WallLoad");
          commit('setWallReload', true);
          console.log(this.state.WallReload);
      })
      .catch(err =>{
          //WIP
          console.log(err);
          this.state.subFailure = true;
          this.state.subCompleted = true;
          commit('setLoading', false);
          console.log(this.state.Loading);
      });

    },
    ModeratePost({commit, dispatch}){
      let TitleMod = document.getElementById('TitleMod').value;
      let ContentMod = document.getElementById('ContentMod').value;
      console.log(this.state.CurrentPostId);

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
        content : ContentMod
        })
        .then(res =>{
          // Envoie des données en base
          console.log(res);

          //Sucess
          this.state.subOkay = true;
          this.state.subCompleted = true;
          commit('setLoading', false);
          console.log(this.state.Loading);

          // Completed
          document.getElementById('TitleMod').value = '';
          document.getElementById('ContentMod').value = '';
          commit('setLoading', false);
          dispatch("ResetFields");

          $('#ModerateModal').modal('hide');
          dispatch("WallLoad");
          commit('setWallReload', true);
          console.log(this.state.WallReload);
        })
        .catch(err =>{
          //WIP
          console.log(err);
          this.state.subFailure = true;
          this.state.subCompleted = true;
          commit('setLoading', false);
          console.log(this.state.Loading);
        });

      } else {
        this.state.subFailure = true;
        this.state.subCompleted = true;
        commit('setLoading',false);
        console.log(this.state.Loading);
      }

    },

    ResetFields({commit}){
      commit('setCurrentEtitle','');
      commit('setCurrentEcontent','');
      commit('setCurrentMtitle','');
      commit('setCurrentMcontent','');
      this.state.subFailure = false;
      this.state.subOkay = false;
      this.state.subCompleted = false;
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
          commit('setWallReload', true);
          console.log(this.state.WallReload);
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
              commit('setWallReload', true);
              console.log(this.state.WallReload);
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
            commit('setWallReload', true);
            console.log(this.state.WallReload);
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
            commit('setWallReload', true);
            console.log(this.state.WallReload);
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
        this.state.ValueComment = false;
        this.state.subOkay = true;
        this.state.subCompleted = true;

        // Rechargement du mur après opération
        commit('setWallReload', true);
        console.log(this.state.WallReload);
        this.state.subOkay = false;
        this.state.subCompleted = false;
        this.state.ValueComment = false;
        dispatch("WallLoad");

      })
      .catch(err =>{
        // Faillure
        this.state.subFailure = true;
        this.state.subCompleted = true;
      });

    },

    // Set OwnComment
    SetOwnComment({},Username){
      console.log('Methode - SetOwnComment : '+ Username);
      if(Username == this.state.userName){
          console.log(this.state.userName);
          this.state.ownComment = true;
          console.log("Own Comment!");
          return Username;

      } else {
          console.log(this.state.userName);
          this.state.ownComment = false;
          console.log("No Own Comment");
          return Username;
      }
    },

    // Set OwnComment
    SetOwnMessage({},Username){
      console.log('Methode - SetOwnMessage : '+ Username);
      if(Username == this.state.userName){
          console.log(this.state.userName);
          this.state.ownMessage = true;
          console.log("Own Message!");
          return Username;

      } else {
          console.log(this.state.userName);
          this.state.ownMessage = false;
          console.log("No Own Message");
          return Username;
      }
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
            commit('setWallReload', true);
            console.log(this.state.WallReload);
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
          commit('setWallReload', true);
          console.log(this.state.WallReload);
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
        axios.get(this.state.urlAPI+'/api/messages/?order=updatedAt:DESC'),
        axios.get(this.state.urlAPI+'/api/messages/comment?fields=id,messageId,username,comment,updatedAt&order=updatedAt:DESC')
      ])
      .then(responseArr => {

        commit('setLoading',true);
        console.log(this.state.Loading);
        this.state.Posts = responseArr[0].data;
        console.log("Numbers of Posts: "+this.state.Posts.length);
        console.log(this.state.Posts);
        this.state.Comments = responseArr[1].data;
        console.log("Numbers of Comments: "+this.state.Comments.length);
        console.log(this.state.Comments);

        if(this.state.Posts !=""){
            commit('setNoData', false);
            console.log("NoData : "+this.state.NoData);
        }

        commit('setLoading',false);
        console.log(this.state.Loading);
        commit('setWallReload', false);
      })
      .catch(err =>{
        console.log(err);
        commit('setLoading',false);
        console.log(this.state.Loading);
        commit('setWallReload', false);
      });
    }

    //
  },
  modules: {
    //
  }
})
