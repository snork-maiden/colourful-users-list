<script setup lang="ts">
import type { AgeRange, FilterParams, Color, Role } from '@/interfaces'
import { ref } from 'vue'
import UsersFiltersColors from './UsersFiltersColors.vue'
import UsersFiltersRoles from './UsersFiltersRoles.vue'
import UsersFiltersAge from './UsersFiltersAge.vue'
import UsersFiltersBlocked from './UsersFiltersBlocked.vue'

const props = defineProps<{
  filters: FilterParams | null
  ageRange: AgeRange
}>()

const emit = defineEmits<{
  (e: 'filtersSubmit', filters: FilterParams | null): void
}>()

const filtersForm = ref(null)

function setFilters() {
  const formData = new FormData(filtersForm.value!)
  let fieldData = Array.from(formData)
  const fieldObjects = fieldData.map(([name, value]) => ({ name, value }))
  let filters: FilterParams = {}

  const colors: Color[] | undefined = fieldObjects
    .filter(({ name }) => name === 'color')
    .map(({ value }) => value as Color)

  if (colors.length) {
    filters.colors = colors
  }

  const roles: Role[] | undefined = fieldObjects
    .filter(({ name }) => name === 'role')
    .map(({ value }) => value as Role)

  if (roles.length) {
    filters.roles = roles
  }

  const blockedString = fieldObjects.find(({ name }) => name === 'isBlocked')?.value
  let blocked: null | boolean = null
  switch (blockedString) {
    case '0':
      blocked = false
      break
    case '1':
      blocked = true
      break
  }
  if (blocked !== null) {
    filters.blocked = blocked
  }

  const ageRange: AgeRange | null = calculateAgeRange()
  if (ageRange) {
    filters.age = ageRange
  }

  if (!Object.keys(filters).length) {
    emit('filtersSubmit', null)
    return
  }

  emit('filtersSubmit', filters)

  function calculateAgeRange() {
    const minAge = fieldObjects.find(({ name }) => name === 'minAge')?.value
    const maxAge = fieldObjects.find(({ name }) => name === 'maxAge')?.value

    if (!minAge && !maxAge) return null

    return {
      min: minAge ? +minAge : props.ageRange.min,
      max: maxAge ? +maxAge : props.ageRange.max
    } as AgeRange
  }
}
</script>
<template>
  <form class="filters" @submit.prevent="setFilters" ref="filtersForm">
    <h2 class="title">Filter users:</h2>
    <UsersFiltersColors :color-filter="filters?.colors || null" />
    <UsersFiltersRoles :role-filter="filters?.roles || null" />
    <UsersFiltersBlocked :blocked-filter="filters?.blocked ?? null" />
    <UsersFiltersAge :age-range="ageRange" :age-filter="filters?.age || null" />
    <button class="btn reset" type="reset" @click="emit('filtersSubmit', null)">
      Clear filters
    </button>
    <button class="btn submit" type="submit">Filter</button>
  </form>
</template>

<style scoped>
.btn {
  margin-top: 1em;
  margin-right: 2em;
  font: inherit;
  font-size: 1.1em;
  color: inherit;
  cursor: pointer;
  border: none;
  line-height: 2;
  padding: 0 0.5em;
  border: 1px solid white;
}

.btn:hover,
.btn:active {
  transform: scale(1.05);
}

.reset {
  background-color: var(--reset-button-bg);
}
.submit {
  background-color: var(--submit-button-bg);
}

:deep(.rounded-btn) {
  border: 2px solid white;
  border-radius: 7px;
  cursor: pointer;
  transition: transform 0.3s;
}
:deep(.rounded-btn:hover) {
  transform: scale(1.05);

}
</style>
