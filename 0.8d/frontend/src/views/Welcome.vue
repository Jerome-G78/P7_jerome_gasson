<template>
  <div class="Welcome">
    <HeaderNav/>
    <SignIn/>
    <Login/>
    <Wall/>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderNav from '@/components/HeaderNav.vue'
import SignIn from '@/components/SignIn.vue'
import Login from '@/components/Login.vue'
import Wall from '@/components/Wall.vue'
import Footer from '@/components/Footer.vue'
import router from '@/router/index.js'

export default {
  name: 'Welcome',
  components: {
    HeaderNav, SignIn, Login, Wall, Footer
  },
  data(){
    return{
    // Récupération des variables globales dans vue X
    Connected: this.$store.state.Connected,
    }
  },

  computed:{
    data(){
      return{
      // Récupération des variables globales dans vue X
      Connected: this.$store.state.Connected,
      }
    }
  },

  mounted(){
    // Vérifier si l'utilisateur est déjà connécté
    let AlreadyConnected = localStorage.getItem("Connected");
    let Store = this.$store.state;
    console.log(AlreadyConnected);
    if(AlreadyConnected != null){
      console.log('In IF');
      // Chargement des paramètres utilisateur...
      this.$store.commit('setLoading',this.Loading = true);
      this.$store.commit('setConnected', localStorage.getItem("Connected"));
      this.$store.commit('setEmail', localStorage.getItem("Email"));
      this.$store.commit('setUserName', localStorage.getItem("userName"));
      this.$store.commit('setUserID', localStorage.getItem("userId"));
      this.$store.commit('setToken', localStorage.getItem("Token"));
      this.$store.commit('setIsAdmin', localStorage.getItem("isAdmin"));
      // console.log(Store.Connected, Store.email, Store.userName, Store.userId, Store.Token, Store.isAdmin);
      this.$store.commit('setLoading',this.Loading = false);
      // Redirrection vers la page Home...
      router.push({path:'/Home'});
    }
  }
}
</script>
