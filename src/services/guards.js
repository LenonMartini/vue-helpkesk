import api from '../plugins/axios';
import Cookie from '../services/cookies'
import { useAuthStore } from '@/stores/auth'

const redirectIfNotAuthenticated = (to, from, next) => {

    const token = Cookie.getToken();     
    
    if(to.name !== "login" && !token){
        next({ name: 'login' });    
    }
        /*Checa se Token é valido*/
    
    api.get('v1/me').then((response) => {         
       const auth = useAuthStore();
       if(!auth?.user?.id){
            auth.user = response.data;
       }
      
    }).catch(() => {

        Cookie.deleteToken();
        next({ name: 'login' });
    });
    
    next();
          
};
  
const redirectIfAuthenticated = (to, from, next) => {
        const token = Cookie.getToken();
        
        let n;

        if(token){
           
          n = { name: 'home' };
        }
        
        next(n);
};

export default {redirectIfNotAuthenticated, redirectIfAuthenticated}