<script setup lang="ts">
import { ref,defineProps,computed } from 'vue'
import { axios } from '../api'
import Tracker from '../components/Tracker.vue'
import Profile from '../components/Profile.vue'
import PostCard from '../components/PostCard.vue'
import type {Post, Community} from '../types'
import { useUserStore } from '../store/useStore'

const adding = ref(false)
const props = defineProps<{id:number,show:boolean}>()
const community = ref<Community>({
    id:0,
    attributes:{
        description:'',
        name:'',
        posts:{
            data:[]
        },
        adms:{
            data:[]
        }
    }
})
const useStore = useUserStore()
const titulo = ref('')
const texto = ref('')
const error = ref<Error>()
const posts = ref([] as Post[])

async function getComunities() {
    try{
      const { data } = await axios.get(`/communities/${props.id}`,{
        params:{
          populate:['posts','adms']
        }
      })
      community.value = data.data
    }catch(e){
      console.log(e)
    }
}

const logged = computed(()=>{
  return useStore.jwt != (undefined || '') 
})


function addPost() {
    adding.value = true
}

async function enviar() {
    try{
        const me = await axios.get('/users/me', {
            headers: {
                'Authorization': `Bearer ${useStore.jwt}`
            }
        })

        const comm = await axios.get(`/communities/${props.id}`)
        const {data} = await axios.post('/posts',{
                data:{
                    title:titulo.value,
                    text:texto.value,
                    author:me.data,
                    community:comm.data.data
                }
            } ,{
            headers: {
                Authorization: `Bearer ${useStore.jwt}`
            }
        })
    }catch(e){
        error.value = e as Error
    }
    adding.value = false
}

getComunities()

</script>

Exibir todos os posts de uma comunidade
<template>
    <div class="content">
        <main>
            <section class="info">
                <h1>{{error}}</h1>
                <h2>{{ community.attributes.name }}<span  class="adm" v-for="adm in community.attributes.adms.data">  · {{ adm.attributes.username }}</span></h2>
                <h3>{{ community.attributes.description }}</h3>
            </section>
            <section v-if="logged" class="add">
                <button @click="addPost" v-if="props.show && !adding">Add Post</button>
                <form v-if="adding" @submit.prevent="enviar">
                    <div class="field">
                        
                        <label for="titulo">Título</label>
                        <input id="titulo" type="text" v-model="titulo">
                    
                    </div>
                    <div class="field">
                        <label for="titulo">Mensagem</label>
                        <textarea  v-model="texto"></textarea>
                    </div>
                    <button type="submit">Postar</button>
                    <button @click="adding=false">Cancelar</button>
                </form>
            </section>
            <PostCard v-if="props.show" v-for="post in community.attributes.posts.data" :id="post.id"></PostCard>
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
    margin: 20px;
    min-width: 1000px;
}
form{
    border-radius: 5px;
    padding: 20px;
    background-color: #141414;;
}
.info{
    border-radius: 5px;
    background-color: #141414;
    margin: 20px;
    padding: 20px;
}
.adm{
  color: rgba(109, 109, 109, 0.536);
  font-size: 15px;
}
.add{
    margin: 20px
}
.field{
    margin: 20px;
    display: flex;
    flex-direction: column;
}
.info h3{
    color: #a8a8a8;
}
</style>
