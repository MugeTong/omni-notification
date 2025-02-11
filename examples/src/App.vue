<script setup>
import { inject } from 'vue';

const notify = inject('notify');
console.log(notify)

</script>

<template>
  <div class="container">
    <h1>Omni Notification</h1>
    <div>Show your notifications anywhere.</div>
  </div>
</template>

<style scoped>

</style>
