<script setup lang="ts">
import type { User } from '@/interfaces'

defineProps<{
  user: User
}>()
</script>

<template>
    <tr class="row">
      <td class="cell">{{ user.name }}</td>
      <td class="cell">{{ user.age }}</td>
      <td class="cell">{{ user.balance + '$' }}</td>
      <td class="cell">
        <span :class="'role ' + user.role">{{ user.role }}</span>
      </td>
      <td class="cell">{{ user.blocked ? '🔒' : '🔓' }}</td>
    </tr>
</template>

<style scoped></style>
