<template>
  <div class="home">
    <HeaderNav/>
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
import Login from '@/components/Login.vue'
import NewMessage from '@/components/NewMessage.vue'
import Profil from '@/components/Profil.vue'
import Wall from '@/components/Wall.vue'
import WallEditPost from '@/components/WallEditPost.vue'
import WallModeratePost from '@/components/WallModeratePost.vue'
import Footer from '@/components/Footer.vue'


export default {
  name: 'Home',
  components: {
    HeaderNav, Login, NewMessage, Profil, Wall, WallEditPost, WallModeratePost, Footer
  },
  data(){
    return{
    // Récupération des variables globales dans vue X
    Connected: this.$store.state.Connected,
    }
  }
}
</script>
