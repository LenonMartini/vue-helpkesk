import { createRouter, createWebHistory } from 'vue-router'
import Guard from '../services/guards'
import AppLayout from '@/layout/AppLayout.vue';
import HomeView from '../views/HomeView.vue';
import UsersView from '../views/pages/users/Users.vue';
import Erro from '../views/Page404.vue';


export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
      { 
        path: '/', 
        beforeEnter:Guard.redirectIfNotAuthenticated,
        component: AppLayout,          
        children: [
          { path: '/', name:'home', component: HomeView },
          { path: '/users', name:'users', component: UsersView },
        ]  
         
      },
      {
        path: '/auth/login',
        name: 'login',
        beforeEnter:Guard.redirectIfAuthenticated,
        component: () => import('@/views/pages/auth/Login.vue'),
       
      },
      /*Rota para erro 404*/
      { 
        path: '/:pathMatch(.*)*', 
        name: 'NotFound', 
        component: Erro
        
        
      },
  ]
});

/*
router.beforeEach((to, from) => {
  if(to.meta?.auth){    
    const auth = useAuthStore();
    console.log(auth.user);
    
  }
  

})
*/







/*
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('@/views/pages/auth/Login.vue')
    },
    {
      path: '/',
      component: AppLayout,
      children: [
          {
              path: '/',
              name:'home',
              component: HomeView 
             
          }
        ] 
      
    },
   
  ]
})
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
export default router
*/


