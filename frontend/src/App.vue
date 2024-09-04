<script setup lang="ts">
import Tracker from './components/Tracker.vue'
import Profile from './components/Profile.vue'
</script>

<template>
  <Profile></Profile>
  <Tracker title="Comida"></Tracker>
  <Tracker title="Programar"></Tracker>
  <Tracker title="Dormir 8h"></Tracker>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
