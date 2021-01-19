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
  }
}
</script>
