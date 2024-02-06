import vuex from 'vuex';


const store = new vuex.Store (
    {
        state: {
            authenticated:false
        },
        mutations:{
            setAuthentication(state, status){
                state.authenticated = status;
            }
        }
    }
 );

 export default store;