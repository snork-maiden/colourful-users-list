<script setup lang="ts">
import type { User } from '@/interfaces'
import UsersTableRow from './UsersTableRow.vue'
defineProps<{
  usersList: User[]
}>()
</script>

<template>
  <div class="wrapper">
    <table class="table">
      <tr class="row headers">
        <th class="header name">Name</th>
        <th class="header">Age</th>
        <th class="header">Balance</th>
        <th class="header">Role</th>
        <th class="header">Is&nbsp;blocked</th>
        <th class="header">Color</th>
      </tr>
      <TransitionGroup name="row">
        <UsersTableRow v-for="user of usersList" :key="user.id" :user="user" />
      </TransitionGroup>
    </table>
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 90vw;
  min-width: 28em;
  overflow-x: auto;
}
.table {
  background-color: var(--table-bg);
  border: 1px solid var(--table-border-color);
  text-align: center;
}

.header {
  background-color: #2e4a5a;
  padding: 0.3em 0.6em;
  font-weight: bold;
}

.name {
  width: 6em;
}

.row-enter-active,
.row-leave-active {
  transition: all 0.7s;
}
.row-enter-from,
.row-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
