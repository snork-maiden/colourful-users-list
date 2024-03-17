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
  gap: 2em 4em;
}
</style>
