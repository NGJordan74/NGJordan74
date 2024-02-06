

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './newStore'
import vuex from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


//createApp.config.productionTip = false

 createApp(App).use(router).use(vuex).use(store).mount('#app')


