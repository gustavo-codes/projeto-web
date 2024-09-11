<script setup lang="ts">
import { ref } from 'vue'
import { axios } from '../api'
import Tracker from '../components/Tracker.vue'
import Profile from '../components/Profile.vue'
import PostCard from '../components/PostCard.vue'
import CommunityCard from '../components/CommunityCard.vue'
import type {Post, Community} from '../types'
import { useRoute } from 'vue-router'

const communities = ref([] as Community[])
const route = useRoute()

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

getComunities()

</script>

<template>
    <CommunityCard :id="Number(route.params.id)" :show="true"></CommunityCard>
</template>

<style scoped>

</style>
