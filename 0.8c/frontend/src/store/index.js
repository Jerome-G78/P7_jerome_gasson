import { createStore } from 'vuex'

export default createStore({
  state: {
    // Déclaration des données du "store" de vue X
    Connected: true,
    isAdmin: false,
    // ownMessage: false,
    // ownComment: false,
    userId:5,
    Token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2MTA0NDEzNDMsImV4cCI6MTYxMDQ4NDU0M30.YtzHuxt9XYunvIVxGc6bcT6C6DcmZCEhvnFnTBbDE1Q',

    // Profil
    userName:'Teddy5',
    email:'Teddy@runner.com',
    bio:'TesT',
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
    Npicture:'',

    // Likes
    LikesCounter : 0,

    // Loading
    Loading:false

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

    // Likes
    setLikes(state, newValue){
      state.LikesCounter =+ newValue;
    },

  },
  actions: {
    //
  },
  modules: {
    //
  }
})
