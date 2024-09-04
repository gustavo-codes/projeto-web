<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ name: string }>()

const count = ref(0)
const name = ref('Gustavo')
const bio = ref('Developer and computer science student by the federal university of Quixada')
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
