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
import { computed } from 'vue'
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
          urlAPI:this.$store.state.urlAPI,
          userName: this.$store.state.userName,
          Connected: this.$store.state.Connected,
          email:this.$store.state.email,
          bio:this.$store.state.bio,
          Loading: this.$store.state.Loading,
          isAdmin: this.$store.state.isAdmin,
          BioEdit: this.$store.state.BioEdit,
          Token: this.$store.state.Token,
        }
    },

    ReLoadWall(){
      this.$store.commit('setLoading',true);
      console.log(this.Data.Loading);
      // Lors du chargement du composant, appeler les messages dans la BDD
      // Initialisation de la promesse vers l'API via AXIOS
      axios.get(this.urlAPI+'/api/messages/?order=id:ASC')
      .then(res =>{
          // Récupération des messages & likes liées
          this.Posts = res.data;
          console.log(this.Posts);
          for(let i=0; i < this.Posts.length; i++){
            this.PostId = this.Posts[i].id;
            this.LikeCounter = this.Posts[i].likes;
            // Récupération de la date & l'heure du Post
            let date= this.Posts[i].createdAt.split('T')[0];
            this.$store.commit('setPostDate',date);
            console.log(date);
            let time= this.Posts[i].createdAt.split('T')[1];
            let PTime = time.replace('.000Z','');
            this.$store.commit('setPostTime',PTime);
            console.log(PTime);
            if(res.data[i].User.username == this.$store.state.userName){
                this.ownMessage = true;
            }

            if(this.Posts.length == 0){
                this.$store.commit('setNoData', true);
            }
          }

          this.$store.commit('setLoading',false);
          console.log(this.Data.Loading);
          
      })
      .catch(err =>{
          console.log(err);
          this.$store.commit('setLoading',false);
          console.log(this.Data.Loading);
      });

      axios.get(this.urlAPI+'/api/messages/comment?fields=id,messageId,username,comment,createdAt')
          .then(res =>{
            // Récupération des commentaires liées
            this.Comments = res.data;
            console.log(this.Comments);
            for(let i=0; i < this.Comments.length; i++){
                this.CommentId = this.Comments[i].id;
                // console.log(this.CommentId);
                // Récupération de la date & l'heure du message
                let date= this.Comments[i].createdAt.split('T')[0];
                this.CommentDate = date;
                let time= this.Comments[i].createdAt.split('T')[1];
                this.CommentTime = time.replace('.000Z','');

                if(res.data[i].username == this.$store.state.userName){
                    this.ownComment = true;
                }
            }

            this.$store.commit('setLoading',false);
            console.log(this.Data.Loading);

          })
          .catch(err =>{
            console.log(err);
            this.$store.commit('setLoading',false);
            console.log(this.Data.Loading);
          });
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
      // Redirrection vers la page Home...
      // router.push({path:'/Home'});
      this.ReLoadWall;
    }
  }
}
</script>
