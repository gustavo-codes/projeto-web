<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Tracker from '../components/Tracker.vue'
import Profile from '../components/Profile.vue'
import { axios } from '../api'


const nome = ref('')
const email = ref('')
const senha = ref('')
const bio = ref('')

const router = useRouter()

async function cadastrar() {
    const { data } = await axios.post('/users/', {
            "username": nome.value,
            "email": email.value,
            "password":senha.value,
            "confirmed": true,
            "bio": bio.value,
            "role" : "1"
        })
    router.push('/login')
    router.go(1)
}

</script>

<template>
  <main>
    <form @submit.prevent="cadastrar">
        <label for="user">Nome</label>
        <input id="user" type="text" v-model="nome">
        <label for="email">Email</label>
        <input id="email" type="text" v-model="email">
        <label for="password">Senha</label>
        <input id="password" type="password"  v-model="senha">
        <label for="bio">bio</label>
        <textarea id="bio" v-model="bio"></textarea>
        <button>Logar</button> 
    </form>
  </main>
</template>

<style scoped>

</style>
