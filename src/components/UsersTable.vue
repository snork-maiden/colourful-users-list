<script setup lang="ts">
import type { FilterParams, User } from '@/interfaces'
import UsersTableRow from './UsersTableRow.vue'
defineProps<{
  usersList: User[]
}>()
</script>

<template>
  <div class="wrapper">
    <table class="table">
      <tr class="row headers">
        <th class="header">Name</th>
        <th class="header">Age</th>
        <th class="header">Balance</th>
        <th class="header">Role</th>
        <th class="header">Is blocked</th>
        <th class="header">Color</th>
      </tr>
      <UsersTableRow v-for="user of usersList" :key="user.id" :user="user" />
    </table>
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 90vw;
  overflow-x: auto;
  scroll-snap-align: center;
}
.table {
  background-color: var(--table-bg);
  border: 1px solid var(--table-border-color);
  text-align: center;
}

.header {
  background-color: #2e4a5a;
  padding: 0.3em 0.5em;
  font-weight: bold;
}


</style>
