import { createStore } from 'vuex'
import { mapGetters } from 'vuex'


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

    // Posts & Comments
    Posts:[],
    Comments:[],

    // Edit, Delete & Moderate Posts
    CurrentPostId:0,
    Etitle:'',
    Econtent:'',

    // Likes
    LikesCounter : 0,

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

    // Delete Comments
    setCurrentCommentId(state, newValue){
      state.CurrentCommentId = newValue;
    },

    // Likes
    setLikes(state, newValue){
      state.LikesCounter =+ newValue;
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

    // Profil
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
          // this.subFail = err.error;
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
    ResetStats(){
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

    // Administration
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
          console.log(res);
          this.state.RightAdded = true;
          this.state.findUser = false;
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
          console.log(res);
          this.state.RightRemoved = true;
          this.state.findUser = false;
          document.getElementById('Search').value = '';
      })
      .catch(err=>{
          console.log(err);
      });
    }

    //
  },
  modules: {
    //
  }
})
