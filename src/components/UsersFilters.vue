<script setup lang="ts">
import type { AgeRange, FilterParams, Color, Role } from '@/interfaces'
import IconLockedLock from './icons/IconLockedLock.vue'
import IconUnlockedLock from './icons/IconUnlockedLock.vue'
import { ref } from 'vue'
import UsersFiltersColors from './UsersFiltersColors.vue'
import UsersFiltersRoles from './UsersFiltersRoles.vue'
import UsersFiltersAge from './UsersFiltersAge.vue'

//write emit

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
    <UsersFiltersColors />
    <UsersFiltersRoles />
    <fieldset class="range">
      <legend class="title">Is user blocked</legend>
      <input type="checkbox" name="isBlocked" :value="1" id="user-is-blocked" class="block" />
      <label for="user-is-blocked">
        <IconLockedLock class="lock-icon" />
      </label>
      <input type="checkbox" name="isBlocked" :value="0" id="user-is-not-blocked" class="block" />
      <label for="user-is-not-blocked">
        <IconUnlockedLock class="lock-icon" />
      </label>
    </fieldset>
    <UsersFiltersAge :age-range="ageRange" />
    <button type="reset">Clear filters</button>
    <button type="submit">Filter</button>
  </form>
</template>

<style scoped></style>
