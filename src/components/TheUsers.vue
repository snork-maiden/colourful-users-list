<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from 'vue'
import UsersFilters from './UsersFilters.vue'
import UsersTable from './UsersTable.vue'
import type { AgeRange, FilterParams, User } from '@/interfaces'
import { getUsersList } from '@/api/api'

let filterParams: Ref<null | FilterParams> = ref(null)
let usersList: Ref<null | User[]> = ref(null)

onMounted(async () => {
  usersList.value = (await getUsersList()) || null
  const urlParams = new URLSearchParams(window.location.search)
  const params = Object.fromEntries(urlParams)

  filterParams.value = params
})

const ageRange = computed((): AgeRange | undefined => {
  if (!usersList.value) return
  const ages = usersList.value.map((user) => user.age)
  ages.sort((a, b) => a - b)
  return {
    min: ages[0],
    max: ages[ages.length - 1]
  }
})

function setFilters(filters: FilterParams) {
  console.log(filters)
  filterParams.value = filters
}
</script>

<template>
  <template v-if="usersList && ageRange">
    <UsersFilters :filters="filterParams" :age-range="ageRange" @filtersSubmit="setFilters" />
    <UsersTable :users-list="usersList" :filters="filterParams" />
  </template>
</template>
