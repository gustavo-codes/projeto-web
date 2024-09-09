<script setup lang="ts">
import { ref } from 'vue'
import { axios } from '../api'

const props = defineProps<{ id: number }>()

const title = ref('')
const text = ref('')

async function getPost() {
    await axios.get(`/posts/${props.id}`).then((response)=>{
        //Transformer API do strapi n funcionando
        console.log(response.data.data.attributes.text)
        title.value = response.data.data.attributes.title
        text.value = response.data.data.attributes.text
    })
}

getPost()

</script>

<template>
  <main>
    <h3>{{ title }}</h3>
    <p>{{ text }}</p>
  </main>
</template>

<style scoped>
main{
  margin: 20px;
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

.check{
  background-color: green;
}

main h2{
  margin-left: 45px;
}
</style>
