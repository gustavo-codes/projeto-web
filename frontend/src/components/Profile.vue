<script setup lang="ts">
import { ref } from 'vue'
import { axios } from '../api'

const props = defineProps<{id:number}>()

const name = ref('')
const bio = ref('')

async function getUser() {
    await axios.get(`/users/${props.id}`).then((response)=>{
        name.value = response.data["username"]
        bio.value = response.data["bio"]
    })
}

getUser()

</script>

<template>
    <main>
        <img src="../assets/blank.png">
        <section>
            <h1>{{ name }}</h1>
            <p>{{ bio }}</p>
        </section>
    </main>
</template>

<style scoped>
main{
    display: flex;
    margin: 50px;
}
section{
    margin-left: 40px;
    font-size: 20px;
}
</style>
