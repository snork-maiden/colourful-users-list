<script setup lang="ts">
import type { AgeRange } from '@/interfaces'
import { computed, ref, type ComputedRef, type Ref } from 'vue'

const props = defineProps<{
  ageRange: AgeRange
}>()

let minAge: Ref<null | string> = ref(null)
let maxAge: Ref<null | string> = ref(null)

let minInMaxAge: ComputedRef<number> = computed(() => {
  if (!minAge.value) return props.ageRange.min
  return +minAge.value > props.ageRange.min ? +minAge.value : props.ageRange.min
})
let maxInMinAge: ComputedRef<number> = computed(() => {
  if (!maxAge.value) return props.ageRange.max
  return +maxAge.value > props.ageRange.max ? +maxAge.value : props.ageRange.max
})
</script>
<template>
  <fieldset class="age">
    <legend class="title">User age ({{ ageRange.min + '-' + ageRange.max }})</legend>

    <label for="min-age" class="age__label">from</label>
    <input
      type="number"
      name="minAge"
      id="min-age"
      :min="ageRange.min"
      :max="maxInMinAge"
      :placeholder="ageRange.min + ''"
      v-model.lazy="minAge"
    />

    <label for="max-age" class="age__label">to</label>
    <input
      type="number"
      name="maxAge"
      id="max-age"
      :min="minInMaxAge"
      :max="ageRange.max"
      :placeholder="ageRange.max + ''"
      v-model.lazy="maxAge"
    />
  </fieldset>
</template>

<style scoped></style>

