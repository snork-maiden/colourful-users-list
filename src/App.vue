<script setup lang="ts">
import TheUsers from './components/TheUsers.vue'
</script>

<template>
  <main class="main">
    <TheUsers />
  </main>
</template>

<style scoped>
.main {
  display: flex;
  flex-wrap: wrap;
  gap: max(2em, 5vh) max(8vw, 4em);
}

@media screen and (min-width: 1000px) {
  .main {
    margin-top: 5vw;
    margin-left: 3vw;
  }
}
</style>
