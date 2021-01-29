import { createStore } from 'vuex'

export default createStore({
  state: {
    urlAPI:'http://localhost:3000',
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

    // Edit, Delete & Moderate Posts
    CurrentPostId:0,
    Etitle:'',
    Econtent:'',

    // Delete Comments
    CommentId:0,
    CurrentCommentId:'',

    // Likes
    LikesCounter : 0,

    // Loading
    Loading:false,
    WallReload:false,
    NoData:true,
    PostDate:'',
    PostTime:'',

    CommentDate:'',
    CommentTime:'',

  },
  getters:{
    // Role similaire à computed pour VueX
    // N'oubliez-pas, Ces données devront être appelés depuis les composants
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
    setPostTime(state, newValue){
      state.PostTime = newValue;
    },

    setPostDate(state, newValue){
      state.PostDate = newValue;
    },

    setCommentTime(state, newValue){
      state.CommentTime = newValue;
    },

    setCommentDate(state, newValue){
      state.CommentDate = newValue;
    },

    setCommentForPost(state, newValue){
      state.CommentForPost = newValue;
    },

    setCommentId(state, newValue){
      state.CommentId = newValue;
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


  },
  actions: {
    //
  },
  modules: {
    //
  }
})
