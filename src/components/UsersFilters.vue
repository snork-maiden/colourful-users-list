<script setup lang="ts">
import type { AgeRange, Color, FilterParams, Role } from '@/interfaces'
import IconLockedLock from './icons/IconLockedLock.vue'
import IconUnlockedLock from './icons/IconUnlockedLock.vue'
defineProps<{
  filters: FilterParams | null
  ageRange: AgeRange
}>()

const colors: Color[] = ['red', 'yellow', 'green', 'blue', 'white', 'black', 'orange', 'brown']
const roles: Role[] = ['admin', 'user', 'root']
</script>
<template>
  <form class="filters">
    <h2 class="title">Filter by:</h2>
    <fieldset class="colors">
      <legend class="title">User color</legend>
      <template v-for="color of colors" :key="color">
        <input type="checkbox" name="color" :id="'pick-' + color" class="color" />
        <label :for="'pick-' + color" class="visually-hidden">{{ color }}</label>
      </template>
    </fieldset>
    <fieldset class="roles">
      <legend class="title">User role</legend>
      <template v-for="role of roles" :key="role">
        <input type="checkbox" name="role" :id="'role-' + role" />
        <label :for="'role-' + role" class="role-label">{{ role }}</label>
      </template>
    </fieldset>
    <fieldset class="range">
      <legend class="title">Is user blocked</legend>
      <IconLockedLock class="lock-icon" />
      <input type="range" id="is-blocked" name="is-blocked" min="0" max="2" value="1" />
      <IconUnlockedLock class="lock-icon" />
    </fieldset>
    <fieldset class="age">
      <label for="min-age" class="age__label">from</label>
      <input type="number" name="min-age" id="min-age" :placeholder="ageRange.min + ''" />

      <label for="max-age" class="age__label">to</label>
      <input type="number" name="max-age" id="max-age" :placeholder="ageRange.max + ''" />

      <div class="warning">Age cannot be bigger than {{ ageRange.max }}</div>
      <div class="warning">Age cannot be smaller than {{ ageRange.min }}</div>
    </fieldset>

    <button type="reset">Clear filters</button>
    <button type="submit">Filter</button>
  </form>
</template>

<style scoped></style>
./icons/IconLockedLock.vue
