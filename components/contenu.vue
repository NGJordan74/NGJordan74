<!-- eslint-disable vue/multi-word-component-names -->

<script>
    import Liste from './text.vue'
    import { mapGetters, mapState } from 'vuex'
export default{
    name:'contenu',
    data(){
        return{
            text: "je texte",
            count: 0,
            toggleColor: true
        }
        
    },
    computed: {
        objtCSS: function(){
            return{
                box:true,
                red: this.toggleColor
            }
        },
        ...mapState({
            name: 'firstName',
            lastName : 'lastName',
            F : 'fonction'
        }),
        ...mapGetters(['formatUser'])
    },
    components: {
       Liste,
    }
}
</script>
<style>
    .box{
        width: 250px;
        height: 250px;
        border: 2px solid #202020;
   background-color: cadetblue;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .red{
        background-image: URL("../assets/logo.png");
    }
    .change{
        transition-property: translate();
        transition-duration: 1s;

        transition-timing-function: ease-in-out;
   
    }
    .change:hover{
        transform: translate(50%, 0);
        background-color: red;
    }
</style>
<template>
    <div class="hello">
        <h1>{{ text }} 
            </h1>
        <button v-on:click="count++"> augmenter</button>
        <button v-on:click="count--"> diminuer</button>
        <h1>compteur: {{ count }}</h1>
    </div>
    <button class="change" v-on:click="toggleColor=!toggleColor">change</button>
    <div  v-bind:class="[objtCSS ]"  > </div>
    <div> contenu vuex {{ name }}--{{ lastName }}--{{ F }} <br/> -- {{ formatUser }}</div>
    <liste></liste>

</template>
