import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
/*import api from '../plugins/axios'*/
import msg from '../utils/menssages'
/*import Cookie from '../services/cookies'*/

export const useAuthStore = defineStore('auth', {
    state: () => ({ 
       user:[],
       message:{
        error: '',
        color: ''
       }
    }),
    getters: {
        getUserLogged(state) { return state.user },
        getAuthMessage(state){ return state.messagem }
    },
    actions: {
        
        setUser(payload){
            this.user = payload;
        },
        setMessage(payload){
            const errorCode = payload?.response?.data?.error || 'ServerError'
            this.message.error = msg[errorCode]
            this.message.color = 'danger'

            setTimeout(() => {
                 
              this.message.error = '';
              this.message.color = '';  

            }, 3000);
        } ,  

        checkToken(){

        },
        


       /* async login(payload){
        
            await api.post('v1/login', payload)
                .then((response) => {                  
                    
                    const token = response.data.access_token;
                    
                    Cookie.setToken(token);

                    this.user = response.data;                   
                })
                .catch( e => {

                   const errorCode = e?.response?.data?.error || 'ServerError';
                   this.message.error = msg[errorCode];
                   this.message.color = 'danger';


                });
           
        }, */





    },



})
