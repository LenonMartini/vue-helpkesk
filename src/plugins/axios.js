import axios from 'axios'
import Cookie from '../services/cookies';


const api = axios.create({
 baseURL: "http://127.0.0.1:8000/api/",
 headers: {
    "Content-type": "application/json",
    "Accept": "application/json",
    "Access-Control-Allow-Origin": "http://127.0.0.1:8000" 
  }
});

api.interceptors.request.use((config) => {
    const token = Cookie.getToken();
    
    if(token){
      /*config.headers.common['Authorization'] = `Bearer ${token}`;*/
      config.headers.Authorization =  token
    }
    
    return config;
 },
 (error) => {
   return Promise.reject(error);
 }
);

export default api;
