import {App, createApp} from 'vue';
import {eventBus} from './event-bus';
import Notifications from './components/Notifications.vue';
import type {NotifyObject, NotifyItem, NotificationPlugin, PluginOptions} from './types';

const defaultOptions: PluginOptions = {
  name: 'notify',
  customComponent: false,
  componentName: 'Notifications',
};

const OmniNotification: NotificationPlugin = {
  installed: false,
  params: null,
  install: function(app: App, args: PluginOptions = defaultOptions): void {
    // ensure the plugin is installed only once
    if (this.installed) return;
    this.installed = true;
    // check the plugin options
    if (Object.keys(args).length === 0) args = {name: 'notify'};
    // store the plugin options
    this.params = args;


    // an object to store our notifications
    const notify: NotifyObject = (params: string | NotifyItem): void => {
      notify.show(params);
    };

    notify.show = (params: string | NotifyItem): void => {
      // simple string as a message
      if (typeof params === 'string') {
        params = {title: '', text: params};
      }
      // if the message is an object, we assume it's a notification
      console.log('add', params);
      eventBus.emit('add', params);
    };

    notify.close = function(id: number): void {
      eventBus.emit('close', id);
    };

    notify.clearGroup = function(groupName: string): void {
      eventBus.emit('clearGroup', groupName);
    };

    notify.clearAll = function(): void {
      eventBus.emit('clearAll');
    };


    // register the component to the HTML body
    if (!args.customComponent) {
      const mountPoint: HTMLDivElement = document.createElement('div');
      mountPoint.id = 'omni-notification';
      document.body.appendChild(mountPoint);
      const instance: App<Element> = createApp(Notifications);
      instance.mount(mountPoint);
    } else {
      // register the custom component for use
      app.component(args.componentName, Notifications);
    }

    // use it in `<template>` as {{ $notify }}
    app.config.globalProperties['$' + args.name] = notify;

    // use it in `<script setup>` as `const notify = inject('notify')`
    app.provide(args.name, notify);
  },
};

export default OmniNotification;
