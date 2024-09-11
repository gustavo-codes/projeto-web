<script setup lang="ts">
import { ref } from 'vue'
import Tracker from '../components/Tracker.vue'
import Profile from '../components/Profile.vue'
import PostCard from '../components/PostCard.vue'
import { axios } from '../api'
import type { Post } from '../types/index.ts'

const posts = ref([] as Post[])

async function getPosts() {
  try{
    const {data} = await axios.get('/posts')
    posts.value = data.data
  }catch(e){

  }
}

getPosts()


</script>


<template>
  <main>
    <section>
      <PostCard v-for="post in posts":id="post.id"></PostCard>
    </section>
  </main>
</template>

<style scoped>
  main{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;  
  }
</style>
