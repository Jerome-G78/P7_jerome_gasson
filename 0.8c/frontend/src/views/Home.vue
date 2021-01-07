<template>
  <div class="home">
    <HeaderNav/>
    <SignIn/>
    <Wall/>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderNav from '@/components/HeaderNav.vue'
import SignIn from '@/components/SignIn.vue'
import Wall from '@/components/Wall.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    HeaderNav, SignIn, Wall, Footer
  }
}
</script>
