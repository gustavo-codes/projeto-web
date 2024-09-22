<script setup lang="ts">
import { ref } from 'vue'
import { axios } from '../api'
import Tracker from '../components/Tracker.vue'
import Profile from '../components/Profile.vue'
import PostCard from '../components/PostCard.vue'
import { useUserStore } from '../store/useStore'
import {Community, type Post, type User} from '../types/index'

const titulo = ref("")
const texto = ref("")
const adding = ref([] as Boolean[])
const loading = ref(true)
const ident = ref(1)
const error = ref<Error>()
const jwt = useUserStore().jwt
const posts = ref([] as Post[])
const user = ref<User>({
        username:'',
        id:0,
        email:'',
        role:{
            name:'unk'
        }
})

async function getUser() {
    try{
        const res = await axios.get('/users/me', {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },params:{
                    populate:{
                        posts:{
                            populate: 'community'
                        }
                    }
                }
            })
        user.value.username = res.data.username
        posts.value = res.data.posts
        ident.value = res.data.id   
        console.log(posts.value)
    }catch(e){
        error.value = e as Error
    }finally{
        loading.value = false
    }    
}


async function remove(id:Number) {
    const {data} = await axios.delete(`/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
    const deletedPost = data.data
    const index = posts.value.findIndex((m) => m.id == deletedPost.id)
    posts.value.splice(index, 1)
}

function addPost(id:number) {
    adding.value[id] = true
}


async function update(id:Number) {
    const {data} = await axios.put(`/posts/${id}`,{
                data:{
                    title:titulo.value,
                    text:texto.value,
                }
            } ,{
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
    const deletedPostId = data.data.id
    const index = posts.value.findIndex((m) => m.id == deletedPostId)
    posts.value[index].title = titulo.value
    posts.value[index].text = texto.value
}

getUser()



</script>

<template>
    <div class="content">
        <main>
        <h1>{{ error }}</h1>
        <Profile v-if="!loading" :id="ident"></Profile>
        <section  v-for="post in posts">
            <button @click="remove(post.id)">x</button>
            <button @click="addPost(post.id)" v-if=" !adding[post.id]"><img src="../../public/pen.svg" width="10px" ></img> Editar</button>
            <form v-if="adding[post.id]" @submit.prevent="update(post.id)">
                    <div class="field">                  
                        <label for="titulo">Título</label>
                        <input id="titulo" type="text" v-model="titulo">
                    </div>
                    <div class="field">
                        <label for="titulo">Mensagem</label>
                        <textarea  v-model="texto"></textarea>
                    </div>
                    <button type="submit">Postar</button>
                    <button @click="adding[post.id]=false">Cancelar</button>
                </form>
            <PostCard :id="post.id" :title = "post.title" :text = "post.text" :time = "post.publishedAt" :auth="user" :community="post.community"></PostCard>
        </section>
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
button:active{
    background-color: red;
}
</style>
