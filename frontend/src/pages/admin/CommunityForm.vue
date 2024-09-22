<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { axios } from '../../api'
import {useUserStore} from '../../store/useStore'


const userStore = useUserStore()
const nome = ref('')
const descricao = ref('')
const error = ref<Error>()

const router = useRouter()

async function cadastrar() {
  try{
    console.log("Registrando..")
    const me = await axios.get('/users/me', {
            headers: {
                'Authorization': `Bearer ${userStore.jwt}`
            }
        })
    const { data } = await axios.post('/communities/', {
        data:{
            "name": nome.value,
            "description": descricao.value,
            "adms":[me.data],
            "members":[me.data]
        }
        },{
            headers: {
                Authorization: `Bearer ${userStore.jwt}`
        }})

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
        <label for="descricao">Descrição</label>
        <input id="descricao" type="text" v-model="descricao">
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
