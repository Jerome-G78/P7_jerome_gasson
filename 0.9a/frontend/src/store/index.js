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
    userName(state){
      return state.userName;
    },

    userID(state){
      return state.userId;
    },

    userToken(state){
      return state.Token;
    },

    Connected(state){
      return state.Connected;
    },

    BioEdit(state){
      return state.BioEdit;
    },

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

    //
  },
  modules: {
    //
  }
})
