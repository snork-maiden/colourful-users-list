<script setup lang="ts">
import type { User } from '@/interfaces'
import IconLockedLock from './icons/IconLockedLock.vue'
import IconUnlockedLock from './icons/IconUnlockedLock.vue'

defineProps<{
  user: User
}>()
</script>

<template>
  <tr class="row">
    <td class="cell name">{{ user.name }}</td>
    <td class="cell">{{ user.age }}</td>
    <td class="cell">{{ user.balance + ' $' }}</td>
    <td class="cell">
      <span :class="'role ' + user.role">{{ user.role }}</span>
    </td>
    <td class="cell">
      <IconLockedLock v-if="user.blocked" />
      <IconUnlockedLock v-else />
    </td>
    <td class="cell">
      <div class="color-wrapper">
        <div class="color"></div>
      </div>
    </td>
  </tr>
</template>

<style scoped>
.cell {
  padding: 0.15em 0.6em;
}

.name {
  font-weight: 500;
}

.color-wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.color {
  background-color: v-bind('user.color');
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid rgb(139, 138, 138);
}
</style>
