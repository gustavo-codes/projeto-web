<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Tracker from '../components/Tracker.vue'
import Profile from '../components/Profile.vue'
import { axios } from '../api'

const ident = ref('')
const pass = ref('')
const loading = ref(false)
const error = ref<Error>()

const router = useRouter()

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
                Authorization: `Bearer ${jwt}`
            }
        })

        sessionStorage.setItem("jwt", jwt);
        
        router.push('/profile')
        router.go(1)

    }catch(e){
        error.value = e as Error
    }finally{
        loading.value = true
    }
}

</script>




<template>
  <main>
    <form @submit.prevent="autenticate">
        
        <h1 v-if="error">{{ error.message }}</h1>
        <label for="email">Email</label>
        <input id="email" type="text" v-model="ident">
        <label for="password">Senha</label>
        <input id="password" type="password" v-model="pass">
        <button>Logar</button> 
    </form>
  </main>
</template>

<style scoped>

</style>
