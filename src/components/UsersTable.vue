<script setup lang="ts">
import type { FilterParams, User } from '@/interfaces'
import UsersTableRow from './UsersTableRow.vue'
defineProps<{
  usersList: User[]
  filters: FilterParams | null
}>()
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
    <UsersTableRow v-for="user of usersList" :key="user.id" :user="user" />
  </table>
</template>

<style scoped></style>
