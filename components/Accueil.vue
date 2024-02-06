
<!-- eslint-disable vue/multi-word-component-names -->


<template>
  <header class="navbar fixed-top  navbar-dark bg-primary " id="navbar">  
    <h2 id="titre">SEED</h2>
    <button type="submit" class=" btn btn-success" v-on:click.prevent="LinkAdmin()" > Deconnexion</button>

</header>
<div class="bannier  ">
  
  <div class="text-center date">{{ formatted }}</div>
  <h2 id="time" >{{ format }}</h2>


 
</div>

<div class="alert alert-success" v-if="veriGood.length">
    <p >{{veriGood}}</p>
</div>

  <div class="text-center mb-4">

   <button type="submit" class=" btn btn-success  "  v-on:click.prevent="formArrivee()" >  Arrivé</button>
    <button type="submit"  class=" btn btn-warning   ml-3 " v-on:click.prevent="AffiForm()">Départ</button>

  </div>

<div class="alert alert-danger" v-if="TabError.length">
    <p v-for="(error ,index) in TabError" v-bind:key="index" >{{error}}</p>
</div>

<div class="alert alert-danger" v-if="authen.length">
    <p >{{authen}}</p>
</div>

<div class="alert alert-danger" v-if="authenPerson.length">
    <p >{{authenPerson}}</p>
</div>


<div class="alert alert-danger" v-if="alertDepart.length">
    <p >{{alertDepart}}</p>
</div>

<div class="multiForm">
<form class="form " v-show="hidden" >
    <div class="form-group ">
      <label  >firstName :</label>
      <input type="text" class="form-control" id="firstname" v-model="newUser.firstName"  placeholder="Entrer your's name"   >
    </div> <br/>
    <div class="form-group" >
      <label >lastname :</label>
      <input type="text" class="form-control" id="lastname"  placeholder="Entrer your's lastname" v-model="newUser.lastName"  >
    </div><br/>
    <div class="form-group ">
        <label  >Login :</label>
        <input type="password" class="form-control" id="login" v-model="newUser.login"  placeholder="Entrer your's login"   >
      </div> <br/>
    <div class="form-group">
        <label >Fonction :</label>
        <select class="form-control"  placeholder="Entrer your's fonction" v-model="newUser.fonction" >
          <option>formateur</option>
          <option>Employer</option>
          <option>Stagiaire</option>
          <option>Apprenant</option>
        </select>
      </div>
      
      <button type="submit"  class=" btn btn-primary" v-on:click.prevent="Authentifier()">Marque ton Depart</button>
   
      <button type="submit"  class=" btn btn-success  ml-3" v-on:click.prevent="Time()">Afficher</button>

  </form>
  <form class="form " v-show="hide" >
    <div class="form-group ">
      <label  >firstName :</label>
      <input type="text" class="form-control" id="firstname" v-model="result.firstName"  placeholder="Entrer your's name"   >
    </div> <br/>
    <div class="form-group" >
      <label >lastname :</label>
      <input type="text" class="form-control" id="lastname"  placeholder="Entrer your's lastname" v-model="result.lastName"  >
    </div><br/>
    <div class="form-group ">
        <label  >Login :</label>
        <input type="password" class="form-control" id="login" v-model="result.login"  placeholder="Entrer your's login"   >
      </div> <br/>
    <div class="form-group">
        <label >Fonction :</label>
        <select class="form-control"  placeholder="Entrer your's fonction" v-model="result.fonction" >
          <option>formateur</option>
          <option>Employer</option>
          <option>Stagiaire</option>
          <option>Apprenant</option>
        </select>
      </div>
      
      <button type="submit"  class=" btn btn-primary" v-on:click.prevent="Arrivée()">Marque ton Arrivé</button>
   
  </form>

</div>

  <div v-if="hiddenDiv"  >
  

    
    <div class="card text-white border-success"   v-for="(user, index) in OnlyUser"  v-bind:key="index"  >
      <div class="card-header  " v-if="(user.login === newUser.login) && (user.firstName === newUser.firstName) "  >
    
        <div class=" card-body border-success  bg-info"  >
          index : {{ index +1 }} <br/>
          firstName : {{user.firstName}} <br/>
          lastName :{{user.lastName}} <br/>
          fonction : {{user.fonction}}<br/>
          Date : {{user.date}}<br/>
          heure_Arrivée : {{user.Heure_A}} <br/>
          heure_Depart: {{user.Heure_D}}<br/>
       Temps de Travail: {{ user.TempsTravail }}<br/>
        heure d absence d'arrivee : {{user.TimeAgo_Arrivee}}<br/>
         heure d absence de depart : {{user.timeAgo_Depart}}<br/>
      </div> 
    </div>
  </div>
</div>
   


</template>

<script>
//import { MongoClient } from 'mongodb';
import axios from 'axios'
 import { useNow, useDateFormat } from '@vueuse/core'
 import { useTimeAgo } from '@vueuse/core'



export default {
    
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Accueil',
  
  components: {
     
  },

    data() {
        return {
            index:0,
            
            newUser:{
              id: "",
            },
            result: {},
            time: "",
            authen: "",
            TabHeure:[],
            TabError:[],
            formatted : useDateFormat(useNow(), ' dddd DD MMMM YYYY  '),
            D: useDateFormat(useNow(), ' YYYY-M-D'),
         format : useDateFormat(useNow(), ' HH:mm:ss'),
        timeAgo : useTimeAgo(new Date()),
         OnlyUser:[],
hidden: false,
         hiddenDiv: false,
         hide:false,
         heure_def: "08:30",
         heure_depart:"18:30",
         veriGood:"",
         authenPerson:"",
         alertDepart:"",
         heure_A:""
        }

    },
    methods: {

     /*  addUser: function(){
          
        this.TabError =[]
        if(!this.newUser.firstName){
            this.TabError.push('Firstname requis..!')
        }

        if(!this.newUser.lastName){
            this.TabError.push('lastname requis..!')
        }
        if(!this.newUser.login){
            this.TabError.push('login requis..!')
        }
        if(!this.newUser.fonction){
            this.TabError.push('Fonction requis..!')
        }
        
        // string `${this.newUser.H_Arrivée}`
      
      this.newUser.heure_D =  this.format;
        this.newUser.date = this.formatted;
     const dat= this.D.split('-')
parseInt(dat)   
 const H= this.newUser.heure_A.split(':')
parseInt(H)

console.log(H[1])
        this.newUser.TimeAgo = useTimeAgo(new Date(dat[0],dat[1]-1,dat[2],H[0],H[1]))
        console.log(this.newUser.TimeAgo)
           if(this.TabError.length){
            return false
        }
        
 //const BD = this.newUser 

    // this.OnlyUser.push(this.newUser)

    axios.post('http://localhost:7000/Accueil', this.newUser  )
    .then(res =>{
      console.log(res.response)
    }, err =>{
       console.log(err.response)
    })

        this.newUser = {}
        this.TabError = []

    //this.$router.push({ name: 'Forme'})
    v-on:click.prevent="Arrivée()"

    },   v-on:click.prevent="AffiForm()"*/

Authentifier(){
  this.TabError =[]
        if(!this.newUser.firstName){
            this.TabError.push('Firstname requis..!')
        }

        if(!this.newUser.lastName){
            this.TabError.push('lastname requis..!')
        }
        if(!this.newUser.login){
            this.TabError.push('login requis..!')
        }
        if(!this.newUser.fonction){
            this.TabError.push('Fonction requis..!')
        }
/* l authentification dans la bd du personnel cree par l admin*/


console.log(this.newUser)


         axios.post('http://localhost:7000/Authentifier', this.newUser)
    .then(res =>{
     console.log(res)
this.authen="";
    }, err =>{
       
       if(err.response.request.status === 601){
        
      console.log(err.response)

     

        this.newUser.heure_D =  this.format;
        this.newUser.date = this.formatted;
      /* apres authentification , le personnel marque son depart 
      apres avoir marque son arriver . tres important  */


   this.result.heure_D =  this.format;
        this.result.date = this.formatted;
console.log(this.result)
         

            const dat= this.D.split('-')
        parseInt(dat)   
      try {
                      const H =this.result.heure_A.split(':')
                parseInt(H)
                 this.result.TempsTravail = useTimeAgo(new Date(dat[0],dat[1]-1,dat[2],H[0],H[1]))
        
          
      } catch (error) {
        this.alertDepart="tu n as pas marque ton arrivé";
          setTimeout(function(){
 window.location.reload();},5000)
      }

                /*    */
        
       
      
       const VD = this. heure_depart.split(':')
          parseInt(VD)
       

         this.result.TimeAgo_Depart = useTimeAgo(new Date(dat[0],dat[1]-1,dat[2],VD[0],VD[1]))
   // envoie des donnees du personnel pour save
    axios.post('http://localhost:7000/Accueil', this.result  )
    .then(res =>{
      console.log(res.response)
    }, err =>{
       console.log(err.response)
    })
        
        
        
    }
    // si l authen est fausse , renvoie un message 'Erreur'
       if(err.response.request.status === 700){
          console.log(err.response)
        this.authen= err.response.data.error
       
    }
      
     
    })
   
               if(this.TabError.length){
            return false
        }
        this.TabError = []  
        this.newUser = {}
},

AffiForm(){

  this.hidden=!this.hidden;
},
formArrivee(){

  this.hide=!this.hide;
},
Time: function(){
 this.hiddenDiv=!this.hiddenDiv;

        this.TabError =[]
        if(!this.newUser.firstName){
            this.TabError.push('Firstname requis..!')
        }

        if(!this.newUser.lastName){
            this.TabError.push('lastname requis..!')
        }
        if(!this.newUser.login){
            this.TabError.push('login requis..!')
        }
        if(!this.newUser.fonction){
            this.TabError.push('Fonction requis..!')
        }
        
   axios.post('http://localhost:7000/find',this.newUser)
    .then(res =>{
      console.log(res.response)
    }, err =>{
       console.log(err.response);
this.OnlyUser = err.response.data.data ;
 localStorage.setItem('1123', JSON.stringify(this.OnlyUser));
    })
     if(this.TabError.length){
            return false
        }

            this.TabError = [];
          
            
},


     

DeleteUser: function(index){
    this.users.splice(index, 1)
    localStorage.setItem(this.login, JSON.stringify(this.OnlyUser));   
},

Arrivée(){
//this.$router.push({ name: 'HomePage'})

this.TabError =[]
        if(!this.result.firstName){
            this.TabError.push('Firstname requis..!')
        }

        if(!this.result.lastName){
            this.TabError.push('lastname requis..!')
        }
        if(!this.result.login){
            this.TabError.push('login requis..!')
        }
        if(!this.result.fonction){
            this.TabError.push('Fonction requis..!')
        }
/* l authentification dans la bd du personnel cree par l admin*/

         axios.post('http://localhost:7000/Authentifier', this.result)
    .then(res =>{
     console.log(res)
this.authen="";
    }, err =>{
       
       if(err.response.request.status === 601){
        
      console.log(err.response)

      /* apres authentification , le personnel marque son arrivée
       */
            const dat= this.D.split('-')
        parseInt(dat)   
  
              
     
        const VHA = this.heure_def.split(':') //VHA = vrai heure arrivee
          parseInt(VHA)
      

        this.result.TimeAgo_Arrivee = useTimeAgo(new Date(dat[0],dat[1]-1,dat[2],VHA[0],VHA[1]))

                this.result.heure_A=this.format;
              
   //   this.heure_A= this.result.heure_A;
                   this.TabHeure.push( this.result)
               // this.$router.push({ name: 'HomePage'})
              
                
              
              localStorage.setItem('HeureA', JSON.stringify(this.TabHeure));

        
           if(this.TabError.length){
            return false
        }

this.veriGood="Vous avez marqué votre arrivé avec succes "
                 /* setTimeout(function(){
 window.location.reload();},5000)*/
    }
    // si l authen est fausse , renvoie un message 'Erreur'
       if(err.response.request.status === 700){
          console.log(err.response)
        this.authen= err.response.data.error
       
    }
      
     
    })
               if(this.TabError.length){
            return false
        }
        this.TabError = []  
this.newUser = {}

      setTimeout(this.formArrivee(),50000)
        },

                LinkAdmin(){

            this.$router.push({ name: 'HomePage'})

        }

        
  
},


created : function(){
 let Dat = JSON.parse(localStorage.getItem('HeureD'));
  if(Dat === null){
    this.TabHeure = [];
  }else{
  this.TabHeure = Dat;
  //  
  }



 let Data = localStorage.getItem('1123');
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