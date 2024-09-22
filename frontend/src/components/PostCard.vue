<script setup lang="ts">
import { ref } from 'vue'
import { axios } from '../api'
import type{ User,Community } from '../types';
import { RefSymbol } from '@vue/reactivity';

const props = defineProps<{ id: number, title:string,text:string,time:string,auth:User,community:Community}>()


const time = ref('')
time.value = convert_date(props.time)



function convert_date(old_date: string):string{

  const year = old_date.slice(0,4);

  const month = old_date.slice(5,7);

  const day = old_date.slice(8,10);

  const hour = old_date.slice(11,16);

  return `${day}/${month}/${year} ${hour}`;

}


</script>

<template>
  <main>
    <section>
      <h3>{{ props.title }} <span class="date"> · {{  time }}</span></h3>
      <h4>por: <span>{{ props.auth.username }}</span>  de: <span>{{ props.community.name }}</span></h4>
      <p>{{props.text }}</p>
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
