<script setup lang="ts">
import { ref, type Ref } from 'vue'
import IconLockedLock from './icons/IconLockedLock.vue'
import IconUnlockedLock from './icons/IconUnlockedLock.vue'
let props = defineProps<{
  blockedFilter: boolean | null
}>()

let isBlockedChosen: Ref<boolean> = ref(!!props.blockedFilter)
let isNotBlockedChosen: Ref<boolean> = ref(!props.blockedFilter)
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
        :checked="isBlockedChosen"
      />
      <label for="user-is-blocked">
        <IconLockedLock class="lock-icon" />
      </label>
      <input
        type="radio"
        name="isBlocked"
        :value="0"
        id="user-is-not-blocked"
        class="blocked-input"
        :checked="isNotBlockedChosen"
      />
      <label for="user-is-not-blocked">
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

.blocked-input:checked + label .lock-icon {
  box-shadow: var(--checked-checkbox-shadow);
}
.lock-icon {
  width: 45px;
  padding: 0.3em;
  height: fit-content;
  border: 2px solid white;
  border-radius: 7px;
}
</style>
