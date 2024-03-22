<script setup lang="ts">
import type { Color } from '@/interfaces'
import UsersFiltersColorsItem from './UsersFiltersColorsItem.vue'
 defineProps<{
  colorFilter: Color[] | null
}>()
const colors: Color[] = ['red', 'yellow', 'green', 'blue', 'white', 'black', 'orange', 'brown']
</script>
<template>
  <fieldset class="colors">
    <legend class="legend">User color</legend>
    <div class="wrapper">
      <UsersFiltersColorsItem
        v-for="color of colors"
        :key="color"
        :color="color"
        :checked="!!colorFilter?.includes(color)"
      />
    </div>
  </fieldset>
</template>

<style scoped>
.color-input {
  display: none;
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1em;
  padding: 0.3em;
}

.color {
  display: block;
  width: 30px;
  height: 30px;
  background-color: v-bind('colors[0]');
  /* background-color: #fff; */
  cursor: pointer;
}

@media screen and (hover: hover) {
  .color {
    width: 20px;
    height: 20px;
  }
}
</style>
