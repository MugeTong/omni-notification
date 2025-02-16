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
  position: {type: String, default: 'top-left'},
  stackItems: {type: Boolean, default: false},
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
            <div class="omni-notification-body">
              <div class="omni-notification-icon"></div>
              <div class="omni-notification-title">{{ item.title }}</div>
              <div class="omni-notification-message">{{ item.message }}</div>
              <div class="omni-notification-data">{{ item.data }}</div>
            </div>
            <button class="omni-notification-close" type="submit" title="close" @click="destroyItem(item)"> ×</button>
          </div>
        </slot>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.omni-notification-group {
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  --on-color-info: #2b6cb0;
  --on-color-success: #2f855a;
  --on-color-warning: #d97706;
  --on-color-error: #c53030;
  --on-color-text: #ffffff;
  --on-color-text-title: #ffffff;
}

.omni-notification-wrapper {
  margin: 5px 10px;
}

.omni-notification {
  padding: 10px 10px 10px 20px;
  width: 200px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: 7px 5px 4px -5px rgba(0, 0, 0, 0.061),
  9px 6px 5px -5px rgba(0, 0, 0, 0.089),
  10px 7px 7px -5px rgba(0, 0, 0, 0.124),
  17px 12px 11px -5px rgba(0, 0, 0, 0.2);
}

.omni-notification-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  .omni-notification-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--on-color-text-title);
  }

  .omni-notification-message {
    font-size: 14px;
    font-weight: 500;
    color: var(--on-color-text);
  }
}

.info {
  color: var(--on-color-text);
  background-color: var(--on-color-info);
}

.success {
  color: var(--on-color-text);
  background-color: var(--on-color-success);
}

.warning {
  color: var(--on-color-text);
  background-color: var(--on-color-warning);
}

.error {
  color: var(--on-color-text);
  background-color: var(--on-color-error);
}

.omni-notification-close {
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  padding: 16px;
  border: none;
  width: 32px;
  height: 32px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 32px;
  color: rgba(255, 255, 255, 0.3);
  transition: color 0.2s;
}

.omni-notification-close:hover {
  color: rgba(255, 255, 255, 0.8);
}

</style>
