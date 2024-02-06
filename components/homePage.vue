<!-- eslint-disable vue/multi-word-component-names -->
<template>

    <div class="ban container-fluid">
            <header class="navbar fixed-top   bg-primary  " id="navbar">  
          <h2 id="titre"> SEED</h2>
     <button id="admin"  class=" btn btn-success " v-on:click="LinkAdmin()">Admin</button>
    </header  >
        <div   class="date mb-3">{{ formatted }}</div>
        <h2  id="time" >{{ format }}</h2>


       <button  id="connect" class=" btn btn-primary" v-on:click="Link()">Connexion</button>
      </div>
 
       
</template>


<script>
 import { useNow, useDateFormat } from '@vueuse/core'
 

export default {
   
    name :'HomePage',
    data(){
        return{
        
         formatted : useDateFormat(useNow(), ' dddd DD MMMM YYYY  '),
         format : useDateFormat(useNow(), ' HH:mm:ss')
        }
        
    },
    
    methods:  {
        Link(){

            this.$router.push({ name: 'Accueil'})

        },

                LinkAdmin(){

            this.$router.push({ name: 'Admin'})

        }
        

      }

        
    }


</script>
<style scoped src="../assets/style.css" >


/*header{
    width: 100%;
    padding-left: 20px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    background-color:#047ae2 ;
    position: fixed;
}*/

</style>
