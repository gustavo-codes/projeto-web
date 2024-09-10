<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { axios } from './api'
import { useUserStore } from './store/useStore'
import router from './router';


const req = ref({})
const route = useRoute()
const nome = computed(()=>{
  return userStore.username
})
const logged = computed(()=>{
  return userStore.jwt != (undefined || '') 
})

const userStore = useUserStore()


async function getProfiles(){
  await axios.get('/users').then((response)=>req.value = response.data)
}

getProfiles()

function logout(){
  userStore.jwt = ''
  userStore.username = ''
  router.push('/')
  router.go(1)
}

</script>

<template>
  <header>
    <section class="applink">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/comunity">Comunidades</RouterLink>
    </section>
    <section class="loginlink">
      <h3 v-if="logged">{{ nome }}</h3>
      <RouterLink to="/login" v-if="!logged">Login</RouterLink>
      <RouterLink to="/register" v-if="!logged">Registrar</RouterLink>
      <RouterLink to="/profile" v-if="logged">Perfil</RouterLink>
      <button @click="logout" v-if="logged">Logout</button>
    </section>
  </header>
  <RouterView></RouterView>
</template>

<style scoped>
  header{
    display: flex;
    height: 10vh;
    background-color: #141414;
    justify-content: space-between;
    align-items: center;
  }
  a{
    margin: 20px;
  }
  section{
    display: flex;
    align-items: center;
    justify-content: center;
    margin:20px
  }
  
</style>
