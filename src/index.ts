import {App, createApp} from 'vue';
import {eventBus} from './event-bus';
import Notifications from './components/Notifications.vue';
import type {
  NotifyObject,
  NotifyItem,
  NotificationPlugin,
  PluginOptions,
  ComponentProps,
} from './types';

const defaultOptions: PluginOptions = {
  name: 'notify',
  customComponent: false,
  multipleComponents: false,
  componentName: 'Notifications',
};

const OmniNotification: NotificationPlugin = {
  installed: false,
  params: null,
  install: function(app: App, args?: PluginOptions, componentProps?: ComponentProps): void {
    // Ensure the plugin is installed only once
    if (this.installed) return;
    this.installed = true;
    // Check the plugin options. If not provided, use the default options
    console.log(`initial args: ${args}`);
    args = {...defaultOptions, ...args};
    console.log(args);
    // Store the plugin options
    this.params = args;


    // An object to store our notifications
    const notify: NotifyObject = (params: string | NotifyItem): void => {
      notify.show(params);
    };

    notify.show = (params: string | NotifyItem): void => {
      // Simple string as a message
      if (typeof params === 'string') {
        params = {title: '', message: params};
      }
      // If the message is an object, we assume it's a notification
      console.log(params);
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


    // Register the component to the HTML body
    if (!args.customComponent as boolean && !args.multipleComponents as boolean) {
      const mountPoint = document.createElement('div');
      mountPoint.id = 'omni-notification';
      document.body.appendChild(mountPoint);
      const instance = createApp(Notifications, componentProps);
      instance.mount(mountPoint);
    } else {
      // If using custom components or multiple components,
      // componentProps are not allowed but set in the component
      if (componentProps) throw new Error(`If using custom components or multiple components, component props should be set in the component <${args.componentName}>`);
      // Register the custom component for use
      app.component(args.componentName as string, Notifications);
    }

    // Use it in `<template>` as {{ $notify }}
    app.config.globalProperties['$' + args.name] = notify;

    // Use it in `<script setup>` as `const notify = inject('notify')`
    app.provide(args.name as string, notify);
  },
};

export default OmniNotification;
