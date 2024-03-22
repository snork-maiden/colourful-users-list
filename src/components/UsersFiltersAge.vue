<script setup lang="ts">
import type { AgeRange } from '@/interfaces'
import { computed, ref, type ComputedRef, type Ref, onMounted, watch } from 'vue'

const props = defineProps<{
  ageRange: AgeRange
  ageFilter: AgeRange | null
}>()

let minAge: Ref<null | string> = ref(null)
let maxAge: Ref<null | string> = ref(null)

onMounted(()=> {
  console.log(props.ageFilter)
  setAgeValues(props.ageFilter)
})

watch(
  () => props.ageFilter,
  (ageFilter) => {
    console.log(props.ageFilter)
    setAgeValues(ageFilter)
  }
)

function setAgeValues(ageFilter: AgeRange | null) {
  if (!ageFilter) return
    minAge.value = ageFilter?.min + '' || minAge.value
    maxAge.value = ageFilter?.max + '' || maxAge.value
}

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
    <legend class="legend">User age ({{ ageRange.min + '-' + ageRange.max }})</legend>
    <div class="wrapper">
      <label for="min-age" class="age__label">from</label>
      <input
        class="input"
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
        class="input"
        type="number"
        name="maxAge"
        id="max-age"
        :min="minInMaxAge"
        :max="ageRange.max"
        :placeholder="ageRange.max + ''"
        v-model.lazy="maxAge"
      />
    </div>
  </fieldset>
</template>

<style scoped>
.wrapper {
  padding: 0.3em;
}
.age__label {
  margin-right: 0.4em;
  cursor: pointer;
}

.input {
  font: inherit;
  font-weight: 400;
}

.input:not(:last-child) {
  margin-right: 1.5em;
}
</style>
