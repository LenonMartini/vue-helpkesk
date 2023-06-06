<template>
  <div class="container">
    <h5>Usuários</h5>
    <hr/>
    <div class="card">
      <div class="card-body">

        <div class="row mb-2">
          <div class="col-sm-8"> 
            <button class="btn btn-sm btn-primary" @click="visible = true">Novo</button>
          </div>
          <div class="col-sm-4">
            
            <input class="form-control form-control-sm" v-model="search" placeholder="Buscar" />
           
          </div>
        </div>
        <div class="table-responsive">
          <table class="table text-light table-bordered table-sm">
            <thead class="table-primary">
              <tr>
                <th class="text-center">Código</th>
                <th>Nome</th>
                <th>Email</th>
                <th class="text-center">Status</th>
                <th class="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                  <td class="text-center">{{ user.id }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td class="text-center">
                    <i class="pi pi-fw pi-check text-success" v-if="user.status === 1"></i>
                    <i class="pi pi-fw pi-ban text-danger" v-if="user.status === 0"></i>
                  </td>
                  <td class="text-center">
                      <button class="btn btn-sm">
                        <i class=" pi pi-fw pi-eye text-primary"></i>
                     
                      </button>  
                      <button class="btn btn-sm">
                        <i class=" pi pi-fw pi-pencil text-secondary"></i>
                     
                      </button>
                      <button class="btn btn-sm">
                     
                        <i class=" pi pi-fw pi-trash text-danger"></i>
                      </button>
                    
                  </td>
              </tr>
            </tbody>
          </table>
        </div>     
      </div>
    </div>
    <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50vw' }">
       <form>
          
       </form>
    </Dialog>
  </div>
  
  
</template>
<script setup>
import {ref, onMounted } from 'vue';
import api from '../../../plugins/axios'
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

const visible = ref(false);
const users = ref();

onMounted( () => {
  getUser();
})


const getUser = async() => {
  await api.get('v1/users')
  .then((r) => users.value = r.data);
}
</script>


