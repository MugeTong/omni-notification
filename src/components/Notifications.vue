<script setup lang="ts">
import { onMounted } from 'vue';
import { eventBus } from '../event-bus';
import { NotifyItem } from '../types';

const itemList: NotifyItem[] = [];


const props = defineProps({
  animationName: { type: String, default: 'fade' },
});




function addItem(item?: NotifyItem) {
  console.log('add item', item);
}

function closeItem(id?: number) {
  console.log('close item', id);
}

function clearAll() {
  console.log('clear all');
}

// After the component is mounted, register the event listeners
onMounted(() => {
  console.log('omni notification mounted');
  eventBus.on('add', addItem);
  eventBus.on('close', closeItem);
  eventBus.on('clearAll', clearAll);
});

</script>

<template>
  <div class="omni-notification-group">
    <transition-group :name="animationName">
    </transition-group>
  </div>
</template>

<style scoped>
.container {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: -1;
}

</style>
