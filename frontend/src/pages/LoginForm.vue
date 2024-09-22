<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Tracker from '../components/Tracker.vue'
import Profile from '../components/Profile.vue'
import { axios } from '../api'
import {useUserStore} from '../store/useStore'

const ident = ref('')
const pass = ref('')
const loading = ref(false)
const error = ref<Error>()

const router = useRouter()
const userStore = useUserStore()

async function autenticate() {
    try{
        loading.value = true
        error.value = undefined
        
        const { data } = await axios.post('/auth/local/', {
            identifier: ident.value,
            password: pass.value
        })

        const {jwt} = data
        
        const res = await axios.get('/users/me', {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            params: {
                populate: 'role'
            }
        })

        console.log(res.data)
        userStore.authenticaded(res.data, jwt)   

        if(userStore.role == 'admin'){
            router.push('/community/adm')
        }else{
            router.push('/profile')
        }
        
        router.go(1)

    }catch(e){
        console.error(e)
        error.value = e as Error
    }finally{
        loading.value = true
    }
}

</script>




<template>
  <main>
    <h1 v-if="error">{{ error.message }}</h1>
    <form @submit.prevent="autenticate">
        <section> 
            <label for="email">Email</label>
            <input id="email" type="text" v-model="ident">
        </section>
        <section>  
            <label for="password">Senha</label>
            <input id="password" type="password" v-model="pass">
        </section>
        <button>Logar</button> 
    </form>
  </main>
</template>

<style scoped>
    main{
        height: 90vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    form{
        box-shadow:  0px 0px 10px   #2a1630;
        border-radius: 10px;
        background-color: #141414;
    }
    section{
        margin: 20px;
        display: flex;
        flex-direction: column;
    }
    button{
        margin: 20px
    }
</style>
