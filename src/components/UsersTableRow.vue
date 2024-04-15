<script setup lang="ts">
import type { User } from '@/interfaces'
import { computed, type ComputedRef } from 'vue'
import IconLockedLock from './icons/IconLockedLock.vue'
import IconUnlockedLock from './icons/IconUnlockedLock.vue'

const props = defineProps<{
  user: User
}>()

let prettifiedPrice: ComputedRef<string | number> = computed(() =>
  Number.isInteger(props.user.balance) ? props.user.balance : props.user.balance.toFixed(2)
)
</script>

<template>
  <tr class="row">
    <td class="cell name">{{ user.name }}</td>
    <td class="cell">{{ user.age }}</td>
    <td class="cell price">{{ prettifiedPrice + '&nbsp;$' }}</td>
    <td class="cell">
      <span :class="'role ' + user.role">{{ user.role }}</span>
    </td>
    <td class="cell">
      <IconLockedLock v-if="user.blocked" />
      <IconUnlockedLock v-else />
    </td>
    <td class="cell">
      <div class="color-wrapper">
        <div class="color">
          <span class="visually-hidden">{{ user.color }}</span>
        </div>
      </div>
    </td>
  </tr>
</template>

<style scoped>
.cell {
  padding: max(0.25em, 0.55vw) 0.6em;
}

.name {
  font-weight: 500;
  min-width: 6em;
}

.color-wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.color {
  background-color: v-bind('user.color');
  width: 1.3em;
  aspect-ratio: 1/1;
  border-radius: 50%;
  border: 1px solid rgb(139, 138, 138);
}

.price {
  width: 5em;
}
</style>
