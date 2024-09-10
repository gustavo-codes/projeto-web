<script setup lang="ts">
import { ref } from 'vue'
import { axios } from '../api'
import Tracker from '../components/Tracker.vue'
import Profile from '../components/Profile.vue'
import Post from '../components/PostCard.vue'

async function getPosts() {
    try{
      axios.get('/posts')
    }catch(e){
      console.log(e)
    }
}


</script>

<template>
  <h1>Comunidades</h1>
  <Post :id="1"></Post>
</template>

<style scoped>

</style>
