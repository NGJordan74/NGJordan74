<!-- eslint-disable vue/multi-word-component-names -->


<template lang="">

  <header class="navbar fixed-top  navbar-dark bg-primary " id="navbar">  
    <h2 id="titre">SEED</h2>
    <button type="submit" class=" btn btn-success" v-on:click.prevent="LinkAdmin()"> Deconnexion</button>

</header>
<div class="bannier  ">
  
  <div class="text-center date">{{ formatted }}</div>
  <h2 id="time" >{{ format }}</h2>

 
</div>
    <div  class="table-responsive mb-5">
      <!--  <table class="table" > -->
            <table class="table">
                <tr id="t1" class="table-striped " >
                    
                    <td>index </td>
                    <td>firstName</td>
                    <td>lastName</td>
                    <td>login</td>
                    <td>fonction</td>
                    <td>Date</td>
                    <td>heure</td>
                </tr>
                <tr  id="t2" class="info  table-hover  table-active" v-for="(user, index) in users" v-bind:key="index" >

                    <td>{{index + 1}}</td>
                    <td>{{user.firstName}}</td>
                    <td>{{user.lastName}}</td>
                    <td>{{user.login}}</td>
                    <td>{{user.fonction}}</td>
                    <td>{{user.date}}</td>
                    <td>{{user.heure}}</td>
                 
                    <button  type="submit" v-on:click.prevent="DeleteUser(index)" class="btn btn-danger">X</button>
                </tr>
                <tr>
                    <td>Michelle</td>
                    <td>26 ans</td>
                    <td>États-Unis</td>
                </tr>
            </table>

            <div class="alert alert-danger mt-3" v-if="TabError.length">
                <p v-for="(error ,index) in TabError" v-bind:key="index" >{{error}}</p>
            </div>

            <form>
               
                <input type="text"  class="form-control" v-model="newUser.firstName"  placeholder="Entrer  name">
                
                <input type="text" id="lastname" class="form-control" placeholder="Entrer lastname" v-model="newUser.lastName">
             
                <input type="password" id="login" class="form-control" placeholder="Entrer  login"    v-model="newUser.login">

                <select class="form-control"  placeholder="Entrer  fonction" v-model="newUser.fonction" >
                    <option>formateur</option>
                    <option>Employer</option>
                    <option>Stagiaire</option>
                    <option>Apprenant</option>
                </select>

   
                <button type="submit"  v-on:click.prevent="addUser()" class="btn btn-success" >Ajouter</button>
     
             </form>
        
    </div>

<div class="alert alert-danger" v-if="Error.length">
    <p >{{Error}}</p>
</div>

    <form class="search mb-4">
        <label class="btn btn-warning">Recherche</label> 
        <div class="search">
        <input type="text"  class="form-control find" placeholder="Entrer  login" v-model="newUser.id" >
         <input type="date" id="jour" class="form-control find"  v-model="jour"  >
        <button type="submit"  v-on:click.prevent="findPersonnel()" class="btn btn-success ml-3 pb-1 " >consulter</button>
        </div>
    </form>
    <div class="card text-white border-success"   v-for="(user, index) in  userFound"  v-bind:key="index"  >
      <div class="card-header  "  >
    
        <div class=" card-body border-success  bg-info"  >
          index : {{ index +1 }} <br/>
          firstName : {{user.firstName}} <br/>
          lastName :{{user.lastName}} <br/>
          fonction : {{user.fonction}}<br/>
          Date : {{user.date}}<br/>
          heure_Arrivée : {{user.Heure_A}} <br/>
          heure_Depart: {{user.Heure_D}}<br/>
       Heure_Intervalle: {{ user.timeAgo }}
      </div> 
    </div>
  </div>
</template>
<script>
 import { useNow, useDateFormat } from '@vueuse/core'
import axios from 'axios'
export default{
    // eslint-disable-next-line vue/multi-word-component-names
    name : 'Forme',
    data(){
        return{
            index:0,
            max: 6,
            newUser:{
                id:"",
                
            },
            userFound:[],
            id:"",
            auth:"",
            Error:"",
            TabError:[],
            formatted : useDateFormat(useNow(), ' dddd DD MMMM YYYY  '),
         format : useDateFormat(useNow(), ' HH:mm:ss'),
         
         users: [],
         jour:""
          
        }
    },

    methods: {

        addUser: function(){
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

            if(this.TabError.length){
                return false
            }


                this.newUser.heure =  this.format;
        this.newUser.date = this.formatted;

    axios.post('http://localhost:7000/AdminUser', this.newUser  )
    .then(res =>{
      console.log(res)
    }, err =>{
       
              if(err.response.request.status === 401){
          console.log(err.response)
        this.auth= err.response.data.error 
    }
             if(err.response.request.status === 402){
          console.log(err.response)
        this.auth= err.response.data.error 
    }
    })
         this.findUser();

           
           this.newUser = {}
            this.TabError = []
           
        },

        findUser(){
              axios.post('http://localhost:7000/findAdminUser', this.newUser  )
    .then(res =>{
      console.log(res)
    }, err =>{
       console.log(err.response)
        this.users=err.response.data.data;
        localStorage.setItem('Seed', JSON.stringify(this.users));
    })  
        },


        DeleteUser: function(index){
const identifiant = this.users[index]._id;
console.log(identifiant)
              axios.post('http://localhost:7000/deleteAdminUser', identifiant )
    .then(res =>{
      console.log(res)
    }, err =>{
       console.log(err.response)
       

    }) 
   
            this.users.splice(index, 1)
            localStorage.setItem('Seed', JSON.stringify(this.users)); 

            
        this.findUser();
        },
        
         LinkAdmin(){

            this.$router.push({ name: 'HomePage'})

        },

findPersonnel() {
            this.Error ="";
            

            console.log(this.jour)
            if(!this.newUser.id){
                this.Error='login requis..!';
            }else{
              axios.post('http://localhost:7000/findPersonnel', this.newUser )
    .then(res =>{
      console.log(res)
    }, err =>{
       console.log(err.response)
this.userFound = err.response.data.data ;
if(this.userFound===[]){
 this.Error='Aucun personnel trouvée..!';
}
 localStorage.setItem('userFound', JSON.stringify(this.userFound));

       })
            }



}
    },
    created : function(){
         let DataBD = JSON.parse(localStorage.getItem('Seed'));
          if(DataBD === null){
            this.users = [];
          }else{
            this.users = DataBD;
          }

    let Datas = localStorage.getItem('userFound');
          if(Datas === null){
            this.userFound = [];
             
          }else{
            this.userFound = Datas;
          }
          
        },
         
mounted() {
  this.findUser();
    this.userFound = [];
},



}



</script>
<style scoped src="../assets/form.css">

</style>