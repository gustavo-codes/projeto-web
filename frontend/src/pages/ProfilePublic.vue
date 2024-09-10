<script setup lang="ts">
import { ref } from 'vue'
import { axios } from '../api'
import Tracker from '../components/Tracker.vue'
import Profile from '../components/Profile.vue'
import { useUserStore } from '../store/useStore'

const loading = ref(true)
const ident = ref(1)
const error = ref<Error>()
const jwt = useUserStore().jwt

async function getUser() {
    try{
        const res = await axios.get('/users/me', {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
       
        ident.value = res.data.id
    }catch(e){
        error.value = e as Error
    }finally{
        loading.value = false
    }    
}

getUser()


</script>

<template>
  <main>
    <h1>{{ error }}</h1>
    <Profile v-if="!loading" :id="ident"></Profile>
  </main>
</template>

<style scoped>

</style>
