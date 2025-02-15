<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';
import type {Ref} from 'vue';
import {eventBus} from '../utils/event-bus';
import {NotifyItem} from '../types';
import {incrementId, parsePosition} from '../utils/common-functions';
import {Timer} from '../utils/timer';

const itemList: Ref<NotifyItem[]> = ref([]);
const activeList = computed(() => itemList.value.filter((i) => i.isActive));


const props = defineProps({
  animationName: {type: String, default: 'fade'},
  groupName: {type: String, default: 'default'},
  ignoreDuplicates: {type: Boolean, default: false},
  pauseOnHover: {type: Boolean, default: true},
  maxItems: {type: Number, default: Infinity},
  reverseOrder: {type: Boolean, default: true},
  position: {type: String, default: 'top-right'},
});

// computed properties
const positionCss = computed(() => parsePosition(props.position));


function addItem(event: NotifyItem) {
  // parse the item and add it to the list

  //Step over if groupName is not matching
  event.groupName = event.groupName || 'default';
  if (props.groupName !== event.groupName) return;

  // step over if duplicates are not allowed
  if (props.ignoreDuplicates) {
    if (activeList.value.some((i) => i.message === event.message && i.title === event.title && i.type === event.type)) return;
  }

  // compute the properties of the item
  const id = event.id || incrementId();
  const title = event.title || '';
  // message is required, pass
  const type = event.type || 'info';
  const groupName = event.groupName;
  const speed = event.speed || 300;
  const duration = event.duration || 5000;
  const data = event.data || null;
  const isActive = true;

  // create the item
  const item: NotifyItem = {id, title, message: event.message, type, groupName, speed, duration, data, isActive};
  item.timer = new Timer(() => destroyItem(item), duration + speed * 2);

  // add the item to the list
  const isReverseOrder = props.reverseOrder;
  if (isReverseOrder) {
    itemList.value.unshift(item);
    if (itemList.value.length > props.maxItems) {
      destroyItem(itemList.value[itemList.value.length - 1]);
    }
  } else {
    itemList.value.push(item);
    if (itemList.value.length > props.maxItems) {
      destroyItem(itemList.value[0]);
    }
  }

  console.log('add item');
}

function destroyItem(item: NotifyItem) {
  // There is a bug; When passing the item object directly to the function,
  // changes to the object will not trigger a Vue update for the view.
  // To resolve this (We used the first method):
  // 1. It is recommended to operate on the `ref` object.
  // 2. Alternatively, you can use a `reactive` object to warp the item object.
  // 3. Another solution is to trigger the update by changing the reference.
  // 4. Force the ref object to update by accessing it.
  const index = itemList.value.findIndex((i) => i.id === item.id);
  itemList.value[index].isActive = false;
  itemList.value[index].timer?.clear();
}


function closeItemById(id: number) {
  const index = itemList.value.findIndex((i) => i.id === id);
  itemList.value[index].isActive = false;
  itemList.value[index].timer?.clear();
}

function clearAll() {
  console.log('clear all');
}

// After the component is mounted, register the event listeners
onMounted(() => {
  console.log('omni notification mounted');
  eventBus.on('add', addItem);
  eventBus.on('close', closeItemById);
  eventBus.on('clearAll', clearAll);
});

</script>

<template>
  <div class="omni-notification-group" :style="positionCss">
    <transition-group :name="animationName">
      <div v-for="item in activeList"
           :key="item.id"
           :data-id="item.id"
           class="omni-notification-wrapper"
           @mouseenter="() => {if (props.pauseOnHover) item.timer?.pause()}"
           @mouseleave="() => {if (props.pauseOnHover) item.timer?.resume()}">
        <slot :item="item">
          <div class="omni-notification" :class="item.type">
            <div class="omni-notification-title">{{ item.title }}</div>
            <div class="omni-notification-message">{{ item.message }}</div>
            <div class="omni-notification-data">{{ item.data }}</div>
          </div>
        </slot>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
:root {
  --color-info: #2b6cb0;
  --color-success: #2f855a;
  --color-warning: #d97706;
  --color-error: #c53030;

  --color-text: #333333;
  --color-text-title: #333333;
  --color-text-subtitle: #666666;
}

.omni-notification-group {
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 20px;
}

.omni-notification-wrapper {
  margin-top: 10px;
  width: 300px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.omni-notification {
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
}

.info {
  color: var(--color-text);
  background-color: var(--color-info);
}

.success {
  color: var(--color-text);
  background-color: var(--color-success);
}

.warning {
  color: var(--color-text);
  background-color: var(--color-warning);
}

.error {
  color: var(--color-text);
  background-color: var(--color-error);
}


</style>
