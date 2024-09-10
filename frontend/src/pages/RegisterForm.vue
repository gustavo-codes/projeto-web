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
const error = ref<Error>()

const router = useRouter()

async function cadastrar() {
  try{
    console.log("Registrando..")
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
  }catch(e){
    error.value = e as Error
  }
}

</script>

<template>
  <main>
    <h1>{{ error }}</h1>
    <form @submit.prevent="cadastrar">
      <section>
        <label for="user">Nome</label>
        <input id="user" type="text" v-model="nome">
      </section>
      <section>
        <label for="email">Email</label>
        <input id="email" type="text" v-model="email">
      </section>
      <section>
        <label for="password">Senha</label>
        <input id="password" type="password"  v-model="senha">
      </section>
      <section>
        <label for="bio">bio</label>
        <textarea id="bio" v-model="bio"></textarea>
      </section>
        <button>registrar</button> 
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
