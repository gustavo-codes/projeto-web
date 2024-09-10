<script setup lang="ts">
import { ref } from 'vue'
import { axios } from '../api'

const props = defineProps<{ id: number }>()

const title = ref('')
const text = ref('')
const auth = ref('')
const time = ref('')

async function getPost() {
    const {data} = await axios.get(`/posts/${props.id}`,{
      params:{
        populate:'author'
      }
    })
        //Transformer API do strapi n funcionando
        title.value = data.data.attributes.title
        text.value = data.data.attributes.text
        time.value = data.data.attributes.createdAt
        auth.value = data.data.attributes.author.data.attributes.username
    
}

getPost()

</script>

<template>
  <main>
    <section>
      <h3>{{ title }} · {{ time }}</h3>
      <h4>por: {{ auth }}</h4>
    </section>
    <p>{{ text }}</p>
  </main>
</template>

<style scoped>
main{
  border-radius: 10px;
  box-shadow:  0px 0px 10px   #2a1630;
  margin: 20px;
  background-color: #141414;
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

main h2{
  margin-left: 45px;
}
</style>
