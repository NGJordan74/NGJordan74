import {createWebHistory, createRouter} from 'vue-router'
import Contenu from './components/contenu.vue'
//import Nav from './components/nav.vue'
import Forme from './components/form.vue'
import Accueil from './components/Accueil.vue'
import HomePage from "./components/homePage.vue";
//import ban from './components/ban.vue'
import Admin from './components/admin.vue'
//import vuex from 'vuex';

import store from './newStore'




const routes = [
    {
        path: "/",
        name: "HomePage",
        component: HomePage
    },

   {
        path: "/Accueil",
        name: "Accueil",
        component: Accueil
    },

    {
        path: "/admin",
        name: "Admin",
        component: Admin,


    },

    {
        path: "/forme",
        name: "Forme",
        component: Forme,
        beforeEnter: (to, from, next) => {
            if(store.state.authenticated == false){
                alert('Tu pars ou!!  toi aussi ')
                next('/admin');
            }else{
                next()
            }
        } 

    },

    {
        path: "/text",
        name: "Text", 
        component: Contenu 
    },
];

const router = createRouter({
    history:
    createWebHistory(),
    routes,
    
});


export default router;
