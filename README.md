# omni-notification

This is a simple vue3 notification plugin.

## Installation

Install with npm:

```sh
npm install omni-notification --save
```

## Usage

```js
import { createApp } from 'vue'
import App from './App.vue'
import OmniNotification from 'omni-notification'

const app = createApp(App)
app.use(OmniNotification)
app.mount('#app')
```
### use in `script setup`

```js
<script setup>
const notify = inject('notify');
notify('Hello World!');
</script>
```

### use in `template`

```html
<template>
  <button @click="$notify(`Hello World!`)">Notify</button>
</template>
```
