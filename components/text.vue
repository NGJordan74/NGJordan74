<!-- eslint-disable vue/multi-word-component-names -->
<script>
export default {
    name :'Text',
    data(){
        return{
            fruits: ['orange','pomme', 'fraise','anana'],
            obj:{
                value:'',
                index:null
            },
           
        }
        
    },
    methods: {
        add: function(){
            if(this.obj.index!=null){
                this.fruits[this.obj.index]=this.obj.value
                return
            }else{
            this.fruits.push(this.obj.value)
            this.obj.value=''
            }



        },
        modifier(val,index){
this.obj.value=val;
this.obj.index=index
        }
    },
}
</script>
<style>
    .Liste{
        list-style: none;
        display: flex;
    }
    .Liste li{
        padding-right: 10px;
    }
</style>
<template>
   <input type="text" v-model="obj.value"> 

   <button v-on:click="add()">{{obj.index==null? "creer" : "modifier"}}</button>

<ul class="Liste">
    <li v-for=" ( fruit , index) in fruits " v-bind:key="index">{{ fruit }} <button v-on:click="modifier(fruit,index)">M</button></li>

</ul>
</template>