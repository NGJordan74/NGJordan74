<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<!-- eslint-disable vue/multi-word-component-names -->


<template>
  <header class="navbar fixed-top  navbar-dark bg-primary " id="navbar">  
    <h2 id="titre">SEED</h2>
    <button type="submit" class=" btn btn-success"  v-on:click.prevent="LinkAdmin()"> Deconnexion</button>

</header>
<div class="bannier  ">
  
  <div class="text-center date">{{ formatted }}</div>
  <h2 id="time" >{{ format }}</h2>


 
</div>
<h1 class="mb-5"> Bienvenue Admin</h1>

<div class="alert alert-danger" v-if="TabError.length">
    <p v-for="(error ,index) in TabError" v-bind:key="index" >{{error}}</p>
</div>

<div class="alert alert-danger" v-if="Error.length">
    <p v-for="(error ,index) in Error" v-bind:key="index" >{{error}}</p>
</div>
<form class="form "  >

    <div class="form-group " >
      <label  >firstName :</label>
      <input type="text" class="form-control" id="firstname" v-model="user.firstName"  placeholder="Entrer your's name"   >
    </div> <br/>
    <div class="form-group" >
      <label >lastname :</label>
      <input type="text" class="form-control" id="lastname"  placeholder="Entrer your's lastname" v-model="user.lastName"  >
    </div><br/>
    <div class="form-group ">
        <label  >Login :</label>
        <input type="password" class="form-control" id="login" v-model="user.login"  placeholder="Entrer your's login"   >
      </div> <br/>

      
      <button type="submit"  class=" btn btn-primary" v-on:click.prevent="addUser()">Sign up</button>


  </form>
  <div v-if="hiddenDiv" >
  

</div>
   


</template>

<script>
//import { MongoClient } from 'mongodb';
//import axios from 'axios'
import { useNow, useDateFormat} from '@vueuse/core'
// import { useTimeAgo } from '@vueuse/core'

import store from '../newStore'

export default {
    
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Admin',
  
  components: {
     
  },

    data() {
        return {
            index:0,
            user:{},
            Admin:{
              firstName: "ngassi",
              lastName: "jordan",
              login: "12345"
            },
            result: {},
            
           
               Error:[],
            TabError:[],
          
            formatted : useDateFormat(useNow(), ' dddd DD MMMM YYYY  '),
         format : useDateFormat(useNow(), ' HH:mm:ss'),
         hiddenDiv: false,
        }

    },
    methods: {

       addUser: function(){
           this.Error =[]
        this.TabError =[]
        if(!this.user.firstName){
            this.TabError.push('Firstname requis..!')
        }

        if(!this.user.lastName){
            this.TabError.push('lastname requis..!')
        }
        if(!this.user.login){
            this.TabError.push('login requis..!')
        }

      // string `${this.newUser.H_Arrivée}`

  if((this.Admin.firstName === this.user.firstName)&& 
    (this.Admin.lastName === this.user.lastName) &&
      (this.Admin.login === this.user.login)){

store.commit("setAuthentication", true); 

   // axios.post('http://localhost:7000/admin', this.Admin  )

      this.$router.push({ name: 'Forme'});

  }else{
 this.Error.push('Recommencer la connexion Admin ')

setTimeout(function(){
 window.location.reload();},5000)


}
      //  this.newUser.TimeAgo = useTimeAgo(new Date())
           if(this.TabError.length){
            return false
        }
          if(this.Error.length){
            return false
        }
 //const BD = this.newUser


        this.newUser = {}
        this.TabError = []

    //this.$router.push({ name: 'Forme'})
 this.OnlyUser.concat( this.TabHeure )

    
          localStorage.setItem('1123', JSON.stringify(this.OnlyUser));

    },

         LinkAdmin(){

            this.$router.push({ name: 'HomePage'})

        },
Time: function(){
 this.hiddenDiv=!this.hiddenDiv
},


     



Arrivée(){
//this.$router.push({ name: 'HomePage'})

                this.newUser.heure_A=this.format;
          
                   this.TabHeure.push( this.newUser)
               // this.$router.push({ name: 'HomePage'})
              
                
              
              localStorage.setItem('HeureD', JSON.stringify(this.TabHeure));
        },



        
  
},


created : function(){
 let Dat = JSON.parse(localStorage.getItem('HeureD'));
  if(Dat === null){
    this.TabHeure = [];
  }else{
  this.TabHeure = Dat;
  //  
  }



 let Data = JSON.parse(localStorage.getItem('1123'));
  if(Data === null){
    this.OnlyUser = [];
  }else{
   this.OnlyUser = Data;
  //  
  }

//this.PersonelLoad();

},
mounted : function () {
  

}
 



}
</script>
<style scoped src="../assets/ACC.css">

</style>