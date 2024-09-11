<script setup lang="ts">
import { ref } from 'vue'
import { axios } from '../api'
import Tracker from '../components/Tracker.vue'
import Profile from '../components/Profile.vue'
import PostCard from '../components/PostCard.vue'
import { useUserStore } from '../store/useStore'
import type {Post, User} from '../types/index'

const loading = ref(true)
const ident = ref(1)
const error = ref<Error>()
const jwt = useUserStore().jwt
const posts = ref([] as Post[])
const user = ref<User>({
    attributes:{
        username:'',
        posts:{
            data:[]
        }
    }
})

async function getUser() {
    try{
        const res = await axios.get('/users/me', {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },params:{
                    populate:'posts'
                }
            })
        user.value = res.data
        posts.value = res.data.posts
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
    <div class="content">
        <main>
        <h1>{{ error }}</h1>
        <Profile v-if="!loading" :id="ident"></Profile>
        <PostCard  v-for="post in posts" :id="post.id"></PostCard>
        </main>
    </div>
</template>

<style scoped>
.content{
    display: flex;
    align-items: center;
    justify-content: center;
}
main{
    max-width: 60vw;
}
</style>
