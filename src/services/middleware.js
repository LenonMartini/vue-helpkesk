import Cookie from '../services/cookies';
import axios from 'axios';
import store from '../stores/auth';
import api from '../plugins/axios';

export default{
    
    async redirectIfNotAuthenticated(to, from, next){
        const token = Cookie.getToken();      
        if(to.name !== "login" && !token){
            next({ name: 'login' });
        }
        /*Checa se Token é valido*/
        await api.get('v1/me').then((response) => {  
            /*if(!store?.state?.user?.id){
                store.commit('user/STORE_USER', response.data.data);
            }*/
        }).catch(() => {
            Cookie.deleteToken();
            next({ name: 'login' });
        });
        
        next();
          
       
            
    },
    redirectIfAuthenticated(to, from, next){ 
        
        const token = Cookie.getToken();
        let n;

        if(token){
           
          n = { name: 'index' };
        }
        
        next(n);
    },
}