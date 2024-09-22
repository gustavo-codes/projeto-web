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
    const {data} = await axios.get('/posts',{
      params:{
        populate:['author','community']
      }
  })
  for (let i in data.data){
    const dataPosts = data.data
    const post:Post = {
        id:dataPosts[Number(i)].id,
        title:dataPosts[Number(i)].attributes.title,
        text:dataPosts[Number(i)].attributes.text,
        publishedAt:dataPosts[Number(i)].attributes.publishedAt,
        community:dataPosts[Number(i)].attributes.community.data.attributes,
        auth:dataPosts[Number(i)].attributes.author.data.attributes,
    }
    posts.value.push(post)
  }
  }catch(e){
    console.log(e)
  }
}

getPosts()


</script>


<template>
  <main>
    <section>
      <PostCard v-for="post in posts":id="post.id" :title = "post.title" :text = "post.text" :time = "post.publishedAt" :auth="post.auth" :community="post.community"></PostCard>
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
