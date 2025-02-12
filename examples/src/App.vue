<script setup>
import {inject} from 'vue';
import TitleBar from './componets/TitleBar.vue';

const notify = inject('notify');

</script>

<template>
  <title-bar/>
  <div class="playground">
    <div class="actions">
      <button type="submit" class="info" @click="$notify('invoke info')">Info</button>
      <button type="submit" class="success" @click="$notify('invoke success')">Success</button>
      <button type="submit" class="warning" @click="$notify('invoke warning')">Warning</button>
      <button type="submit" class="error" @click="$notify('invoke error')">Error</button>
    </div>
    <div class="options">

    </div>
  </div>
</template>

<style scoped>
.playground {
  margin-top: 40px;
  height: 50vh;
}

.actions {
  display: flex;
  gap: 10px;

  button {
    padding: 10px 20px;
    width: 100px;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
  }

  .info {
    background-color: var(--color-info);
  }

  .success {
    background-color: var(--color-success);
  }

  .warning {
    background-color: var(--color-warning);
  }

  .error {
    background-color: var(--color-error);
  }
}

</style>
