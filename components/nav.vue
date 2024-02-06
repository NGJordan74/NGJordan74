<!-- eslint-disable vue/multi-word-component-names -->
<script>
 import { useNow, useDateFormat } from '@vueuse/core'
 

export default {
   
    name :'Nav',
    data(){
        return{
            Choixs: ['Ajouter','Supprimer', 'A propos','Deconnexion'],
            date: '',
          time: '',
          year: '',
         formatted : useDateFormat(useNow(), ' dddd DD MMMM YYYY  '),
         format : useDateFormat(useNow(), ' HH:mm:ss')
        }
        
    },
    
    methods:  {
        depart(){
                this.time=this.format;
                console.log(this.time)
               // this.$router.push({ name: 'HomePage'})
                this.$emit('HeureD', this.time)
        }
        

      }

        
    }


</script>
<style scoped src="../assets/nav.css">

</style>
<template>
    <header class="navbar fixed-top  navbar-dark bg-primary " id="navbar">  
          <h2 id="titre">SEED</h2>
          <button class=" btn btn-success" v-on:click.prevent="depart()"> Deconnexion</button>

    </header>
    <div class="bannier  ">
        
        <div class="text-center date">{{ formatted }}</div>
        <h2 id="time" >{{ format }}</h2>


       
      </div>
 

</template>