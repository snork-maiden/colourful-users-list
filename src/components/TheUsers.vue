<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from 'vue'
import UsersFilters from './UsersFilters.vue'
import UsersTable from './UsersTable.vue'
import type { AgeRange, Color, FilterParams, Role, User } from '@/interfaces'
import { getUsersList } from '@/api/api'

let filterParams: Ref<null | FilterParams> = ref(null)
let usersList: Ref<null | User[]> = ref(null)
let filteredUsersList: Ref<null | User[]> = ref(null)

onMounted(async () => {
  usersList.value = (await getUsersList()) || null
  const urlParams = new URLSearchParams(window.location.search)
  let params = Object.fromEntries(urlParams)
  if (!Object.keys(params).length) {
    filterParams.value = null
  } else {
    filterParams.value = params
  }

  setFilteredList(filterParams.value)
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

function setFilters(filters: FilterParams | null) {
  console.log(filters)
  filterParams.value = filters
  setFilteredList(filters)
}

function setFilteredList(filters: FilterParams | null) {
  filteredUsersList.value = usersList.value
  if (!filters) {
    return
  }

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      if (key === 'colors') {
        console.log(1)
        filterByColor(value)
        return
      }
      if (key === 'roles') {
        filterByRole(value)
        return
      }
    }

    if (key === 'blocked') {
      let filtered: User[] = filterUsers('blocked', value)
      if (!filtered.length) return
      filteredUsersList.value = filtered
    }
    if (key === 'age') {
      let filtered: User[] = filteredUsersList.value!.filter(
        (user) => user.age >= value.min && user.age <= value.max
      )
      if (!filtered.length) return
      filteredUsersList.value = filtered
    }
  })

  function filterUsers(key: keyof User, value: any): User[] {
    console.log(3)

    if (!(key in usersList.value![0])) return []
    console.log(4)

    return filteredUsersList.value!.filter((user) => user[key] === value)
  }

  function filterByColor(colors: Color[]) {
    let filtered: User[] = []

    colors.forEach((color) => {
      const users = filterUsers('color', color)
      if (!users.length) return
      filtered.push(...users)
    })

    console.log(2, filtered)

    filteredUsersList.value = filtered
  }
  function filterByRole(roles: Role[]) {
    let filtered: User[] = []

    roles.forEach((role) => {
      const users = filterUsers('role', role)
      if (!users.length) return
      filtered.push(...users)
    })
    filteredUsersList.value = filtered
  }
}

// function setURLSearchParams(filters: FilterParams | null) {}
</script>

<template>
  <template v-if="filteredUsersList && ageRange">
    <UsersFilters :filters="filterParams" :age-range="ageRange" @filtersSubmit="setFilters" />
    <template v-if="filteredUsersList.length">
      <UsersTable :users-list="filteredUsersList" />
      <template />
    </template>
  </template>
  <div v-if="!filteredUsersList?.length" class="not-found">No users match your filter</div>
</template>
