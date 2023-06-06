import { defineStore } from 'pinia'


export const useLoaddingStore = defineStore('loadding', {
    state: () => ({ 
       isLoadding: false
    }),
    getters: {
        getLoadding(state) { return state.isLoadding }
    },
    actions: {
        setIsLoadding(payload){
            this.isLoadding = payload
            setTimeout(() => {
                 
              
                this.isLoadding = false
  
            }, 5000);
        }   
              

    },



})
