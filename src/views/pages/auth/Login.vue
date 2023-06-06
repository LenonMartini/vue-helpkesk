<template>
    <div class="container">
        
        <div class="row mb-5">
            <div class="col-md-5 m-auto mt-5 card-form">
                
                <div class="card">
                    <h4 class="card-header" v-if="((loadding.isLoadding) ? title='Carregando...' : title = 'Login')">
                        {{ title }}
                    </h4>
                    <div class="row">
                        <div class="col-md-12">
                            <div v-if="store.message.error" :class="`border-${store.message.color} alert text-${store.message.color}`">
                                {{store.message.error}}
                            </div>
                        </div>
                    </div>
            

                    <div class="card-body">
                        <Form @submit="login" :validation-schema="schema">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-12">
                                        <label>Email :</label>
                                        <Field type="text"
                                            class="form-control form-control-sm"    
                                            name="email"
                                            placeholder="E-mail"
                                            autocomplete="off"
                                            :disabled="loadding.isLoadding"
                                            
                                        /> 
                                        <ErrorMessage name="email" class="text-danger" />
                                    </div>
                                    <div class="col-md-12 mt-2">
                                        <label>Senha :</label>
                                        <Field type="password"
                                            class="form-control form-control-sm" 
                                            name="password"
                                            placeholder=""
                                            autocomplete="off"
                                            :disabled="loadding.isLoadding"
                                        /> 
                                       
                                        <ErrorMessage name="password" class="text-danger" />
                                    </div>
                                    <div class="col-md-12 mt-3 d-grid gap-2">
                                        <button class="btn btn-primary"  :disabled="loadding.isLoadding">
                                            <Spinner v-show="loadding.isLoadding"/>
                                            <i class="fas fa-logout"></i> Acessar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                        
                    </div>
                </div>
            </div>
        </div>
      
    </div>
   
   
</template>

<script setup>

import { Form, Field, ErrorMessage } from 'vee-validate';
import { ref } from 'vue'
import * as yup from 'yup';
import { useAuthStore } from '../../../stores/auth'
import { useLoaddingStore } from '../../../stores/loadding'
import { useRouter } from 'vue-router'
import api from '../../../plugins/axios'
import Cookie from '../../../services/cookies'
import Spinner from '../../../components/Spinner.vue';


const myRouter = useRouter();
const response = { color:'', message:'' };
const title = ref('');

const schema = yup.object({
    email: yup.string()
           .required('Erro: O campo de E-mail é obrigatório')
           .email('Erro: O E-mail informado deve ser um email valido!!!'),
    password: yup.string()
            .required('Erro: O campo de Senha é obrigatório')
            .min(8),
});
/*Store*/
const store = useAuthStore();
const loadding = useLoaddingStore();



const login = async(user) => {
    if(!user){return;}

    const payload  = {
        email: user.email,
        password: user.password
    }

    loadding.setIsLoadding(true);
    await api.post('v1/login', payload)
    .then((response) => {                  
        
        const token = `${response.data.token_type} ${response.data.access_token}`;        
        Cookie.setToken(token);
        store.setUser(response.data);

        myRouter.push({name: 'home'});
    })
    .catch( e => {store.setMessage(e)});

    setTimeout({})

 
}

</script>

<style scoped>
.card-form{
    margin-top: 200px !important;
}

</style>
