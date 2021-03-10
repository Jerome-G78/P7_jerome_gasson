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
import { mapGetters } from 'vuex'

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

export default {
  name: 'Welcome',
  components: {
    HeaderNav, SignIn, Login, NewMessage, Profil, Wall, WallEditPost, WallModeratePost, Footer
  },

  computed:{

    ...mapGetters([
        
      // Utilisateur
      'Connected',

      // Status
      'Loading',

    ]),
  },

  mounted(){
    // Vérifier si l'utilisateur est déjà connecté
    if(JSON.parse(localStorage.getItem("Connected"))){
      // Chargement des paramètres utilisateur...
      console.log("Chargement des paramètres utilisateur...");
      this.$store.commit('setLoading', true);
      this.$store.commit('setConnected', JSON.parse(localStorage.getItem("Connected")));
      this.$store.commit('setToken', localStorage.getItem("Token"));
      this.$store.dispatch("AlreadyConnected");
      this.$store.commit('setLoading', false);
      this.$store.dispatch("WallLoad");
    } else {
      this.$store.dispatch("WallLoad");
    }
  },
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
  word-wrap: break-word;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
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