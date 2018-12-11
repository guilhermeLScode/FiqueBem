<template>
  <div id="app">
    <head>
      <link href="https://fonts.googleapis.com/css?family=Reem+Kufi" rel="stylesheet"> 
    </head>
    <Header :Width="windowWidth" :Height="windowHeight" :Tela="Tela"/>
    <router-view class="conteudo">
    </router-view>
    <Footer :Width="windowWidth" :Height="windowHeight" :Tela="Tela"/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  data() {
    return {
      windowWidth: 0,
      windowHeight: 0,
      Tela: 'Centros de Ajuda'
    }
  },
  components : {
    Header: Header,
    Footer: Footer
  },
  watch: {
    '$route'(to, from){
      if(to.name == 'Habitos'){
        this.Tela = 'Hábitos e Atividades'
      }else if(to.name == 'Revista'){
        this.Tela = 'Psicotropéia'
      }else{
        this.Tela = 'Centros de Ajuda'
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      window.addEventListener('resize', this.getWindowHeight);
      this.getWindowWidth()
      this.getWindowHeight()
    })
    if(this.$route.name == 'Habitos'){
      this.Tela = 'Hábitos e atividades'
    }else if(this.$route.name == 'Revista'){
      this.Tela = 'Psicotropeia'
    }
    this.$router.push({name: 'Mapa'})
  },

  methods: {
    getWindowWidth(event) {
        this.windowWidth = document.documentElement.clientWidth;
      },

      getWindowHeight(event) {
        this.windowHeight = document.documentElement.clientHeight;
      }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth);
    window.removeEventListener('resize', this.getWindowHeight);
  }
}
</script>


<style lang="scss">
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Reem Kufi', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.Tela{
  margin-top: 10vh;
}
</style>
