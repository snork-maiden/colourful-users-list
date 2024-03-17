<script setup lang="ts">
import type { Color } from '@/interfaces'

const colors: Color[] = ['red', 'yellow', 'green', 'blue', 'white', 'black', 'orange', 'brown']
</script>
<template>
  <fieldset class="colors">
    <legend class="title">User color</legend>
    <template v-for="color of colors" :key="color">
      <input type="checkbox" name="color" :value="color" :id="'pick-' + color" class="color" />
      <label :for="'pick-' + color" class="visually-hidden">{{ color }}</label>
    </template>
  </fieldset>
</template>

<style scoped></style>
./icons/IconLockedLock.vue
