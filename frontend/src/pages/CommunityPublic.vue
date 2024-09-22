<script setup lang="ts">
import { ref } from 'vue'
import { axios } from '../api'
import Tracker from '../components/Tracker.vue'
import Profile from '../components/Profile.vue'
import PostCard from '../components/PostCard.vue'
import CommunityCard from '../components/CommunityCard.vue'
import type {Post, Community} from '../types'
import { useRouter } from 'vue-router'

const communities = ref([] as Community[])
const route = useRouter()


async function getComunities() {
    try{
      const { data } = await axios.get('/communities',{
        params:{
          populate:'posts'
        }
      })
      communities.value = data.data
    }catch(e){
      console.log(e)
    }
}

function redirecionar(id:number){
  route.push(`/community/${id}`) 
}

getComunities()

</script>

Exibir todos os posts de uma comunidade
<template>
  <section  @click="redirecionar(community.id)" v-for="community in communities">
    <CommunityCard :id="community.id" :show=false></CommunityCard>
  </section>
</template>

<style scoped>

</style>
