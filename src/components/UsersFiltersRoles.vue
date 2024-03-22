<script setup lang="ts">
import type { Role } from '@/interfaces'

defineProps<{
  roleFilter: Role[] | null
}>()
const roles: Role[] = ['admin', 'user', 'root']
</script>
<template>
  <fieldset class="roles">
    <legend class="legend">User role</legend>
    <div class="wrapper">
      <template v-for="role of roles" :key="role">
        <input
          type="checkbox"
          :value="role"
          name="role"
          :id="'role-' + role"
          class="role-input"
          :checked="!!roleFilter?.includes(role)"
        />
        <label :for="'role-' + role" class="role">{{ role }}</label>
      </template>
    </div>
  </fieldset>
</template>

<style scoped>
.wrapper {
  display: flex;
  gap: 1em;
  padding: 0.3em;
}
.role-input {
  display: none;
}

.role-input:checked + .role {
  box-shadow: var(--checked-checkbox-shadow);
}

.role {
  font-variant: small-caps;
  line-height: 2;
  display: grid;
  place-items: center;
  min-width: 4em;
  border: 2px solid white;
  border-radius: 7px;
  cursor: pointer;
}
</style>
