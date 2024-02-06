
import Vuex from 'vuex'


export default new Vuex.Store({
    state : {
        firstName: "jordan",
        lastName : "NG",
        fonction : "",
        login : "",
        Users : []
    },
    getters : {
        formatUser: state =>{
            return `${state.firstName}  ${state.lastName}--${state.fonction}`
        }
    },
    mutations: {

    },
    actions : {

    }
});