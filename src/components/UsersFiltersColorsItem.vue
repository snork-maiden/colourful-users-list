<script setup lang="ts">
import type { Color } from '@/interfaces'

defineProps<{
  color: Color
}>()
</script>
<template>
  <input type="checkbox" name="color" :value="color" :id="'pick-' + color" class="color-input" />
  <label :for="'pick-' + color" class="color"
    ><span class="visually-hidden">
      {{ color }}
    </span></label
  >
</template>

<style scoped>
.color-input {
  display: none;
}

.color-input:checked + .color {
  box-shadow: var(--checked-checkbox-shadow);
}

.color {
  display: block;
  width: 30px;
  height: 30px;
  background-color: v-bind('color');
  border: 1px solid #858383;
  cursor: pointer;
}

@media screen and (hover: hover) {
  .color {
    width: 25px;
    height: 25px;
  }
}
</style>
