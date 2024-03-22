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
  const urlParams = Object.fromEntries(new URLSearchParams(window.location.search))

  let params: any = {}
  if (!Object.keys(urlParams).length) {
    filterParams.value = null
    setFilteredList(filterParams.value)
    return
  }

  Object.entries(urlParams).forEach(([name, value]) => {
    if (name === 'roles' || name === 'colors') {
      params[name] = value.split(',')
    } else if (name === 'age') {
      const minMaxAges = value.split('-')
      params.age = {
        min: minMaxAges[0],
        max: minMaxAges[1]
      }
    } else if (name === 'blocked') {
      value === 'true' ? (params.blocked = true) : (params.blocked = false)
    }
  })
  console.log(params)
  filterParams.value = params as FilterParams

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
  filterParams.value = filters
  setFilteredList(filters)
  setURLSearchParams(filters)
}

function setFilteredList(filters: FilterParams | null) {
  filteredUsersList.value = usersList.value
  if (!filters) {
    return
  }

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      if (key === 'colors') {
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
    if (!(key in usersList.value![0])) return []

    return filteredUsersList.value!.filter((user) => user[key] === value)
  }

  function filterByColor(colors: Color[]) {
    let filtered: User[] = []

    colors.forEach((color) => {
      const users = filterUsers('color', color)
      if (!users.length) return
      filtered.push(...users)
    })

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

function setURLSearchParams(filters: FilterParams | null) {
  if (!filters) {
    window.history.pushState({}, '', '/')
    return
  }
  let searchParams = new URLSearchParams()
  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      searchParams.append(key, value.join(','))
      return
    }
    if (key === 'age') {
      searchParams.append('age', value.min + '-' + value.max)
      return
    }
    searchParams.append(key, value)
  })
  console.log(2, searchParams.toString())
  history.replaceState(null, '', '?' + searchParams.toString())
}
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
