import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import {router} from './router'
import PrimeVue from 'primevue/config';


import "bootstrap/dist/css/bootstrap.min.css";


/*import './assets/main.css'*/
import '@/assets/styles.scss';

import "bootstrap/dist/js/bootstrap.js"



const app = createApp(App)
app.use(router)
app.use(PrimeVue, {ripple: true});
app.use(createPinia())
app.mount('#app')
