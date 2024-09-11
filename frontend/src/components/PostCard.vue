<script setup lang="ts">
import { ref } from 'vue'
import { axios } from '../api'

const props = defineProps<{ id: number }>()

const title = ref('')
const text = ref('')
const auth = ref('')
const time = ref('')
const community = ref('')

async function getPost() {
    const {data} = await axios.get(`/posts/${props.id}`,{
      params:{
        populate:['author','community']
      }
    })
        //Transformer API do strapi n funcionando
        title.value = data.data.attributes.title
        text.value = data.data.attributes.text
        time.value = data.data.attributes.createdAt
        auth.value = data.data.attributes.author.data.attributes.username
        community.value = data.data.attributes.community.data.attributes.name
    
}

getPost()

</script>

<template>
  <main>
    <section>
      <h3>{{ title }} <span class="date"> · {{ time }}</span></h3>
      <h4>por: <span>{{ auth }}</span>  de: <span>{{ community }}</span></h4>
      <p>{{ text }}</p>
    </section>
  </main>
</template>

<style scoped>
main{
  border-radius: 5px;
  margin: 20px;
  padding: 20px;
  border:1px solid rebeccapurple;
  background-color: #141414;
  max-width: 60vw;
}
ul{
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
}

li{
  border-radius: 4px;
  margin: 5px;
  height: 2vw;
  width: 2vw;
}

section{
  padding: 20px
}

section h4{
  margin-top: 0;
}

section h3{
  margin: 0;
}

.check{
  background-color: green;
}
.date{
  color: rgba(109, 109, 109, 0.536);
  font-size: 15px;
}
section span{
  color: rgba(156, 110, 255, 0.536);
}
main h2{
  margin-left: 45px;
}
</style>
