<script setup lang="ts">
import IconLockedLock from './icons/IconLockedLock.vue'
import IconUnlockedLock from './icons/IconUnlockedLock.vue'
defineProps<{
  blockedFilter: boolean | null
}>()
</script>
<template>
  <fieldset class="range">
    <legend class="legend">Is user blocked</legend>
    <div class="wrapper">
      <input
        type="radio"
        name="isBlocked"
        :value="1"
        id="user-is-blocked"
        class="blocked-input"
        :checked="blockedFilter === true"
      />
      <label for="user-is-blocked" class="lock rounded-btn">
        <IconLockedLock class="lock-icon" />
      </label>
      <input
        type="radio"
        name="isBlocked"
        :value="0"
        id="user-is-not-blocked"
        class="blocked-input"
        :checked="blockedFilter === false"
      />
      <label for="user-is-not-blocked" class="lock rounded-btn">
        <IconUnlockedLock class="lock-icon" />
      </label>
    </div>
  </fieldset>
</template>

<style scoped>
.wrapper {
  display: flex;
  gap: 2em;
}
.blocked-input {
  display: none;
}

.blocked-input:checked + .lock .lock-icon {
  box-shadow: var(--checked-checkbox-shadow);
}

.lock {
  display: grid;
}

.lock-icon {
  width: 2.3em;
  padding: 0.3em;
  height: fit-content;
}
</style>
