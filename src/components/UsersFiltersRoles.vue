<script setup lang="ts">
import type { Role } from '@/interfaces'

const roles: Role[] = ['admin', 'user', 'root']
</script>
<template>
  <fieldset class="roles">
    <legend class="title">User role</legend>
    <template v-for="role of roles" :key="role">
      <input type="checkbox" :value="role" name="role" :id="'role-' + role" />
      <label :for="'role-' + role" class="role-label">{{ role }}</label>
    </template>
  </fieldset>
</template>

<style scoped></style>
