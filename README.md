# omni-notification

This is a simple vue3 notification plugin.

## Installation

Install with npm:

```sh
npm install omni-notification --save
```

## Usage

register the plugin in your `main.js`

```js
import {createApp} from 'vue';
import App from './App.vue';
import OmniNotification from 'omni-notification';

const app = createApp(App);
app.use(OmniNotification);
app.mount('#app');
```

### use in `script setup`

```js
import {inject} from 'vue';

const notify = inject('notify');
notify('Hello World!');
```

### use in `template`

```html
<template>
    <button @click="$notify(`Hello World!`)">Notify</button>
</template>
```
