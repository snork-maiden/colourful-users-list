<script setup lang="ts">
defineProps<{
  user: User
}>()

type Color = 'red' | 'yellow' | 'green' | 'blue' | 'white' | 'black' | 'orange' | 'brown'
interface User {
  id: number
  name: string
  balance: number
  color: Color
  role: 'admin' | 'user' | 'root'
  blocked: boolean
  age: number
}
</script>

<template>
  <table class="table">
    <tr class="row">
      <td class="cell">{{ user.name }}</td>
      <td class="cell">{{ user.age }}</td>
      <td class="cell">{{ user.balance + '$' }}</td>
      <td class="cell">
        <span :class="'role ' + user.role">{{ user.role }}</span>
      </td>
      <td class="cell">{{ user.blocked ? '🔒' : '🔓' }}</td>
    </tr>
  </table>
</template>

<style scoped></style>
