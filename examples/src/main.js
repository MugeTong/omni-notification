import '@/assets/main.css';

import {createApp} from 'vue';
import App from './App.vue';
// In your project, the following should be:
// import OmniNotification from 'omni-notification';
import OmniNotification from '../../src/index.ts';

const app = createApp(App);
app.use(OmniNotification);
app.mount('#app');
