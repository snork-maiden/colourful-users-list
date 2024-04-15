<script setup lang="ts">
import type { Color } from '@/interfaces'

defineProps<{
  color: Color
  checked: boolean
}>()
</script>
<template>
  <input
    type="checkbox"
    name="color"
    :value="color"
    :id="'pick-' + color"
    class="color-input"
    :checked="checked"
  />
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
  width: 1.8em;
  aspect-ratio: 1/1;
  background-color: v-bind('color');
  border: 1px solid #858383;
  cursor: pointer;
  transition: transform 0.3s;
}

.color:hover {
  transform: scale(1.1);
}

@media screen and (hover: hover) {
  .color {
    width: 1.5em;
  }
}
</style>
