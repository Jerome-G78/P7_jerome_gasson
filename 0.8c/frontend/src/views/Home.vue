<template>
  <div class="home">
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
  name: 'Home',
  components: {
    HeaderNav, SignIn, Login, Wall, Footer
  }
}
</script>
