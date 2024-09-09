<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { axios } from './api'


const req = ref({})
const route = useRoute()
const nome = ref<string|null>('')

console.log(route.fullPath)

async function getProfiles(){
  await axios.get('/users').then((response)=>req.value = response.data)
}

getProfiles()


</script>

<template>
  <header>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/comunity">Comunidades</RouterLink>
    <RouterLink to="/login">Login</RouterLink>
    <RouterLink to="/register">Registrar</RouterLink>
    <RouterLink to="/profile">Perfil</RouterLink>
  </header>
  <RouterView></RouterView>
</template>

<style scoped>
  
</style>
