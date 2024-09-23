<script setup lang="ts">
import _ from 'lodash'
import { ref,defineProps,computed } from 'vue'
import { axios } from '../api'
import PostCard from '../components/PostCard.vue'
import type {Post, Community, User} from '../types'
import { useUserStore } from '../store/useStore'

const adding = ref(false)
const props = defineProps<{id:number,show:boolean}>()
const thisCommunity = ref<Community>({
    id:0,
    description:'',
    name:'',
    posts:[] as Post[],
    adms:[] ,
    members:[] as User[]
}
)
const useStore = useUserStore()
const titulo = ref('')
const texto = ref('')
const error = ref<Error>()


const logged = computed(()=>{
  return useStore.jwt != (undefined || '') 
})

async function getComunities() {
    try{
      const { data } = await axios.get(`/communities/${props.id}`,{
        params:{
          populate:['posts.author','members.role']
        }
      })
      
      thisCommunity.value.id = data.data.id
      thisCommunity.value.description = data.data.attributes.description
      thisCommunity.value.name = data.data.attributes.name
    for (let i in data.data.attributes.posts.data){
        const dataPosts = data.data.attributes.posts.data
        const post:Post = {
            id:dataPosts[Number(i)].id,
            title:dataPosts[Number(i)].attributes.title,
            text:dataPosts[Number(i)].attributes.text,
            publishedAt:dataPosts[Number(i)].attributes.publishedAt,
            community:thisCommunity.value,
            auth:dataPosts[Number(i)].attributes.author.data.attributes,
            
        }
        thisCommunity.value.posts.push(post)
    }

    for (let i in data.data.attributes.members.data){
        const dataMembers = data.data.attributes.members.data
        
        const member:User = {
            id:dataMembers[Number(i)].id,
            email:dataMembers[Number(i)].attributes.email,
            username:dataMembers[Number(i)].attributes.username,
            role:{
                name:useStore.user.role.name    
            }
        }
        thisCommunity.value.members.push(member)
    }
    }catch(e){
      console.log(e)
    }
}

const isMember = computed(()=>{
    console.log(thisCommunity.value.members)
    if(useStore.jwt != (undefined || '') ){
        let i
        for (i=0; i < thisCommunity.value.members.length; i++){
            if(_.isEqual(thisCommunity.value.members[i], useStore.user)){
                return true
            }
        }
        return false
    }else{
        return false
    }
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
        
        const dataPosts = data.data
        
        const newPost:Post = {
            id:dataPosts.id,
            title:dataPosts.attributes.title,
            text:dataPosts.attributes.text,
            publishedAt:dataPosts.attributes.publishedAt,
            community:thisCommunity.value,
            auth:me.data,
        }
        
        thisCommunity.value.posts.push(newPost)
    }catch(e){
        error.value = e as Error
    }
    adding.value = false
}

async function entrar(){
    console.log(thisCommunity.value.members)
    const me = await axios.get('/users/me',{
        headers: {
            Authorization: `Bearer ${useStore.jwt}`
        }
    })

    const dataMembers = me.data
    const member:User = {
            id:dataMembers.id,
            email:dataMembers.email,
            username:dataMembers.username,
            role:{
                name:useStore.user.role.name    
            }
        }
    
    //thisCommunity.value.members.push(member)

    const req = await axios.get(`/communities/${thisCommunity.value.id}`,{
        params:{
            populate:'members'
        }
    })
    
    const newArr = [...req.data.data.attributes.members.data,me.data]
    const {data} = await axios.put(`/communities/${thisCommunity.value.id}`,{
            data:{
                members:newArr      
            },headers:{
                Authorization: `Bearer ${useStore.jwt}`
            }
        })

}

getComunities()

</script>

Exibir todos os posts de uma comunidade
<template>
    <div class="content">
        <main>
            <section class="info">
                <div v-if="logged">
                    <h1 id="logged" v-if="isMember">Membro</h1>
                    <h1 id="notlogged"v-else>Não membro</h1>
                </div>
                <h1>{{error}}</h1>
                <h2>{{ thisCommunity.name }}<span  class="adm" v-for="adm in thisCommunity.adms">  · {{ adm.username }}</span></h2>
                <h3>{{ thisCommunity.description }}</h3>
            </section>
            <section v-if="logged && isMember" class="add">
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
            <section v-if="logged && !isMember"@click="entrar"><button>Entrar na comunidade</button></section>
            <PostCard v-if="props.show" v-for="post in thisCommunity.posts" :id="post.id" :title = "post.title" :text = "post.text" :time = "post.publishedAt" :auth="post.auth" :community="post.community"></PostCard>
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
#logged{
    color:chartreuse
}
#notlogged{
    color:rgb(244, 94, 121)
}
</style>
