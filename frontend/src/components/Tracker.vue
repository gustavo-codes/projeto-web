<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ title: string }>()

const count = ref(0)

</script>

<template>
  <main>
    <h2>{{ title }}</h2>
    <ul>
      <li v-for="i in 30" class="check"></li>
    </ul>
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
