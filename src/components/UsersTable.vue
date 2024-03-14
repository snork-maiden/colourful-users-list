<script setup lang="ts">
import { getUsersList } from '@/api/api'
import type { User } from '@/interfaces'
import { ref, onMounted, type Ref } from 'vue'
import UsersTableRow from './UsersTableRow.vue'

let usersList: Ref<null | User[]> = ref(null)

onMounted(async () => {
  usersList.value = (await getUsersList()) || null
  console.log(usersList.value)
})
</script>

<template>
  <table class="table">
    <tr class="row headers">
      <th class="header">Name</th>
      <th class="header">Age</th>
      <th class="header">Balance</th>
      <th class="header">Role</th>
      <th class="header">Is blocked</th>
    </tr>
    <template v-if="usersList">
      <UsersTableRow v-for="user of usersList" :key="user.id" :user="user" />
    </template>
  </table>
</template>

<style scoped>

</style>
