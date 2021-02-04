<template>
  <div class="Welcome">
    <HeaderNav/>
    <SignIn/>
    <Login/>
    <NewMessage/>
    <Profil/>
    <Wall/>
    <WallEditPost/>
    <WallModeratePost/>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderNav from '@/components/HeaderNav.vue'
import SignIn from '@/components/SignIn.vue'
import Login from '@/components/Login.vue'
import NewMessage from '@/components/NewMessage.vue'
import Profil from '@/components/Profil.vue'
import Wall from '@/components/Wall.vue'
import WallEditPost from '@/components/WallEditPost.vue'
import WallModeratePost from '@/components/WallModeratePost.vue'
import Footer from '@/components/Footer.vue'
// import { computed } from 'vue'
// import router from '@/router/index.js'

export default {
  name: 'Welcome',
  components: {
    HeaderNav, SignIn, Login, NewMessage, Profil, Wall, WallEditPost, WallModeratePost, Footer
  },
  data(){
    return{
      // Variables local
      urlAPI:this.$store.state.urlAPI,
    }
  },

  computed:{
    Data(){
        return {
          userName: this.$store.state.userName,
          Connected: this.$store.state.Connected,
          email:this.$store.state.email,
          bio:this.$store.state.bio,
          Loading: this.$store.state.Loading,
          isAdmin: this.$store.state.isAdmin,
          BioEdit: this.$store.state.BioEdit,
          Token: this.$store.state.Token,
          WallReload: this.$store.state.WallReload,
        }
    },
  },

  mounted(){
    // Vérifier si l'utilisateur est déjà connécté
    let AlreadyConnected = localStorage.getItem("Connected");
    console.log(AlreadyConnected);
    if(AlreadyConnected != null){
      // Chargement des paramètres utilisateur...
      this.$store.commit('setLoading', true);
      this.$store.commit('setConnected', localStorage.getItem("Connected"));
      this.$store.commit('setEmail', localStorage.getItem("Email"));
      this.$store.commit('setUserName', localStorage.getItem("userName"));
      this.$store.commit('setUserID', localStorage.getItem("userId"));
      this.$store.commit('setToken', localStorage.getItem("Token"));
      this.$store.commit('setIsAdmin', localStorage.getItem("isAdmin"));
      this.$store.commit('setLoading', false);
      // Rechargement du mur de messages
      this.$store.commit('setWallReload', true);
    }
  }
}
</script>

<style>

@font-face 
{
    font-family: 'Trueno';
    src: url('../fonts/TruenoLt.woff') format('woff');
}

#app
{
  font-family: 'Trueno';
}

.alert
{
  font-size: 14px;
}

h5, .Comment, .Content
{
  text-align: left;
}

.inf
{
  text-align: right;
  font-size: 13px;
}

.labelsAlign
{
  text-align: left;
}

.Mbody
{
  box-shadow:0 0 16px #d2515b;
}

img
{
  margin: auto;
}


</style>