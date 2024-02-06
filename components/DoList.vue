

<template>
<form>
 <div> 
    <label class="btn btn-info mt-3 ml-3">Cree tes taches</label>
    <input id="test" class="form-control ml-3 " name="todo.do" type="text" v-model="todo.do" >
    <button type="submit" @click.prevent="enregistrer()" class="btn btn-success mt-3 ml-3"> {{ todo.index==null? "Creer" : "modifier" }}  </button>
 </div>
 </form>
 <input  v-border:red  type="email" v-model="test" >
<p v-bind:class="myClass"> {{verif}} </p>

<div  class=" card-body border-success  bg-info ml-3 mt-2"  v-for="(ToDo, index) in  tableau"  v-bind:key="index">
        <div v-if="conditionnel(index)  "  > {{ control }} -- {{ ToDo}} 
            <button @click="supprimer(index)"  class="btn btn-danger mr-2 " >X</button>
            <button @click="modifier(ToDo,index)"  class="btn btn-warning " >M</button>
       </div>

</div>
</template>
<!-- eslint-disable vue/multi-word-component-names -->
<script>
export default {
    
    name: 'Todolist',
    data(){
        return{
            tableau:[],
            todo:{
                do:'',
                index:null
            },
            verif:'',
            test:'',
myClass:'',
control:'',
module:false,
        }
    },

    watch:{
control(newval,oldval){
    if(!oldval.includes('@')){
        this.verif='l adress invalide';
     
this.myClass='invalid';
    }
    // eslint-disable-next-line no-dupe-else-if
    else if( newval.includes('@')  ){
                this.verif='l adress est valide';
this.myClass='valid';

    }else{
        this.verif='l adress  est valide';
    }
}
    },

    directives:{
            border: function(el,binding){
              //  console.log(binding)
                el.style.borderColor=binding.arg
            },
         /*   hide: function(el,binding){
                console.log(binding)
                el.style.display=binding.arg
            },*/
            
    },

    methods: {
        enregistrer(){

             if(this.todo.index != null){
                this.tableau[this.todo.index]=this.todo.do;
              this.localStorage()
                return
                     }
              else{
            this.tableau.push(this.todo.do);
 
             this.todo.do= ''
              this.localStorage()
             }

        },

        supprimer: function(index){
            this.tableau.splice(index,1)
             this.localStorage()
        }, 

        modifier(value,index){
            this.todo.do=value
            this.todo.index=index
            console.log( this.todo.index)
        },

        localStorage(){
            localStorage.setItem('todolist', JSON.stringify(this.tableau));
        },

        conditionnel(index){
           
            if((index+1)%3==0 && ( index+1)%5!=0){
                this.control='fise'
                return  this.module=true
    
            }
           else  if(( index+1)%5==0 && ( index+1)%3!=0 ){
                this.control='buzz'
                return this.module=true
            }            
            else  if(( index+1)%3==0 && (index+1)%5==0){
                 this.control='fisebuzz'
                return this.module=true
            }           
            else{
                 this.control= index +1
                return this.module=true;
               
            }
        }
                
    },

      created : function(){
         let DataBD = JSON.parse(localStorage.getItem('todolist'));
          if(DataBD === null){
            this.tableau = [];
          }else{
            this.tableau = DataBD;

          }


           },
        mounted: function() {
           


        },
       
}

</script>
<style scoped>
#test{
    width:25% ;
        
}
form{
font-family: 'Poppins', sans-serif;
}
.card-body {
    width: 25%;
    border-radius: 10px;
    color: aliceblue;
    font-size: 1.3em;
    font-family: 'Poppins', sans-serif;
}
p{
    font-weight: bold;
    font-size: 1.3em;

}
.valid{
    color: aqua;
}
.invalid{
    color: red;
}
</style>


