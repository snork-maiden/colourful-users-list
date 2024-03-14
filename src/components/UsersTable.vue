<script setup lang="ts">

</script>

<template>
  <table class="table">
    <tr class="row headers">
      <th class="header">Name</th>
      <th class="header">Age</th>
      <th class="header">Balance</th>
      <th class="header">Role</th>
      <th class="header">Is blocked</th>
    </tr>
  </table>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
