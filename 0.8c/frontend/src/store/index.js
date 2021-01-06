import { createStore } from 'vuex'

export default createStore({
  state: {
    // Déclaration des données du "store" de vue X
    Connected: false,
    isAdmin: true,
    ownMessage: false,
    userId:0,
    userName:'Poppy',

    // SignIn
    CHKeMail:false,
    CHKpassword:false,
    ComparePwds:false,
    CHKuserName:false,

    // Loading
    Loading:false

  },
  getters:{
    // Role similaire à computed pour VueX
    // N'oubliez-pas, Ces données devront être appelés depuis les composants
  },
  mutations: {
    // Permet de mettre a jour les données dans le store (state)
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
    }
  },
  actions: {
    //
  },
  modules: {
    //
  }
})
