<script setup lang="ts">
import { ref } from 'vue'
import { axios } from '../../api'
import CommunityCard from '../../components/CommunityCard.vue'
import type {Post, Community} from '../../types'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../store/useStore'

const adding = ref([] as Boolean[])
const communities = ref([] as Community[])
const route = useRouter()
const nome = ref("")
const texto = ref("")

const userStore = useUserStore()

async function getComunities() {
    try{
      const { data } = await axios.get('/communities',{
        params:{
          populate:'posts'
        }
      })
      console.log(data.data)
      communities.value = data.data
      
    }catch(e){
      console.log(e)
    }
}

function redirecionar(id:number){
  route.push(`/community/${id}`) 
}

function criarcomunidade(){
  route.push(`/community/create`) 
}

function addPost(id:number) {
    adding.value[id] = true
}


async function update(id:Number) {
    const {data} = await axios.put(`/communities/${id}`,{
                data:{
                    name:nome.value,
                    description:texto.value,
                }
            } ,{
            headers: {
                Authorization: `Bearer ${userStore.jwt}`
            }
        })
        const updatedCommunityId = data.data.id
        console.log(updatedCommunityId)
    const index = communities.value.findIndex((m) => m.id == updatedCommunityId)
    console.log(index)
    console.log( communities.value[index])
    communities.value[index].name = nome.value
    communities.value[index].description = texto.value
}

async function remove(id:Number) {
    const {data} = await axios.delete(`/communities/${id}`, {
                headers: {
                    Authorization: `Bearer ${userStore.jwt}`
                }
            })
    const deletedCommunity = data.data
    const index = communities.value.findIndex((m) => m.id == deletedCommunity.id)
    communities.value.splice(index, 1)
}


getComunities()

</script>

Exibir todos os posts de uma comunidade
<template>
    <main>
        <section  v-for="community in communities">
            <button id="delete" @click="remove(community.id)">
                X
            </button>
            <button @click="addPost(community.id)" v-if=" !adding[community.id]"><img src="../../../public/pen.svg" width="10px" ></img> Editar</button>
            <form v-if="adding[community.id]" @submit.prevent="update(community.id)">
                    <div class="field">                  
                        <label for="titulo">Título</label>
                        <input id="titulo" type="text" v-model="nome">
                    </div>
                    <div class="field">
                        <label for="titulo">Mensagem</label>
                        <textarea  v-model="texto"></textarea>
                    </div>
                    <button type="submit">Postar</button>
                    <button @click="adding[community.id]=false">Cancelar</button>
                </form>
              <CommunityCard  @click="redirecionar(community.id)" :id="community.id" :show=false></CommunityCard>
        </section>
        <div id="btn">
            <button @click="criarcomunidade()">Criar Comunidade +</button>
        </div>
    </main>
</template>

<style scoped>
main{
    display: flex;
    flex-direction: column;
    align-items: center;
}
#btn:active{
    background-color: rebeccapurple;
}
#btn:active{
    background-color: rebeccapurple;
}
</style>
