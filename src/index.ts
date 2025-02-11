import {App, createApp} from 'vue';
import {eventBus} from './event-bus';
import Notifications from './components/Notifications.vue';

interface Notification {
  install: (app: App, args: PluginOptions) => void;
  readonly installed?: boolean;
  readonly params?: any;
}

interface PluginOptions {
  name?: string;
  componentName?: string;
}

interface NotifyObject {
  (params:string | NotifyOptions): void;

  show: (params: string | NotifyOptions) => void;
  close: (id: string) => void;
  clearGroup: (groupName: string) => void;
  clearAll: () => void;
}

interface NotifyOptions {
  title?: string;
  text: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  group?: string;
  id?: string;
  data?: any;
}

const OmniNotification: Notification = {
  installed: false,
  install: function(app: App, args: PluginOptions = {}): void {
    // ensure the plugin is installed only once
    if (this.installed) return;
    this.installed = true;

    // check the plugin options
    args.name = args.name || 'notify';
    args.componentName = args.componentName || 'Notifications';

    // an object to store our notifications
    const notify: NotifyObject = (params: string | NotifyOptions): void => {
      notify.show(params);
    };

    notify.show = (params: string | NotifyOptions): void =>{
      // simple string as a message
      if (typeof params === 'string') {
        params = {title: '', text: params};
      }
      // if the message is an object, we assume it's a notification
    };

    notify.close = function(id) {
      eventBus.emit('close', id);
    };

    notify.clearGroup = function(groupName) {
      eventBus.emit('clearGroup', groupName);
    };

    notify.clearAll = function(): void {
      eventBus.emit('clearAll');
    };


    // register the component to the HTML body
    const mountPoint = document.createElement('div');
    mountPoint.id = 'omni-notification';
    document.body.appendChild(mountPoint);
    const instance = createApp(Notifications);
    instance.mount(mountPoint);

    // use it in `<template>` as {{ $notify }}
    app.config.globalProperties['$' + args.name] = notify;

    // use it in `<script setup>` as `const notify = inject('notify')`
    app.provide(args.name, notify);
  },
};

export default OmniNotification;
