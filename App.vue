
<script>
/*import Text from './components/contenu.vue'

import forme from './components/form.vue'
import Accueil from './components/Accueil.vue'
import Accueil from './components/Accueil.vue'*/
//import test from './components/text.vue'
import todolist from './components/DoList.vue'
//import HomePage from "./components/homePage.vue";
export default {
  name:'App',
  components: {
   /*Text,
     forme,
     Accueil,
    */
 //test,
 todolist
  }
}
</script>

<template>
 <test/>
<todolist/>
 <router-view/>

</template>

<style>
body{
  margin: 0px;
  font-family: 'Poppins', sans-serif;
}
#app {
 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}

</style>
