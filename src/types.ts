import {App} from 'vue';
import {Timer} from './utils/timer';


export type NotificationType = 'info' | 'success' | 'warning' | 'error';
type AnimationType = 'fade';

export interface NotificationPlugin<K = PluginOptions, V = ComponentProps> {
  install: (app: App, args?: K, componentProps?: V) => void;
  installed: boolean;
  params: K | undefined;
}

/**
 * Plugin options
 */
export interface PluginOptions extends Record<string, unknown> {
  /**
   * Register the plugin as `name` in `provide/inject` and `$name` in `template`. Default is `notify`.
   */
  name?: string;
  /**
   * Custom your own notification component, if `true`. Default is `false`.
   */
  customComponent?: boolean;
  /**
   * Allow multiple components to be registered. Default is `false`.
   */
  multipleComponents?: boolean;
  /**
   * The name of the custom component. Default is `Notifications`.
   */
  componentName?: string;
}

/**
 * Notification object used to manage notifications
 */
export interface NotifyObject {
  /**
   * Show a notification
   */
  (param: NotifyItem | string, type?: NotificationType): void;

  /**
   * Show an info notification
   */
  show: (param: NotifyItem | string, type?: NotificationType) => void;
  /**
   * Close a notification by id
   */
  close: (id: number) => void;
  /**
   * Close all notifications
   */
  clearGroup: (groupName: string) => void;
  /**
   * Close all notifications
   */
  clearAll: () => void;
}

export interface NotifyItem extends Record<string, unknown> {
  /**
   * Notification id, incrementing number
   */
  id?: number;
  /**
   * Notification title, default is `""`.
   */
  title?: string;
  /**
   * Notification message
   */
  message: string;
  /**
   * Notification type. Default is `info`.
   */
  type?: NotificationType;
  /**
   * Group name for the notification. Default is `"default"`.
   */
  groupName?: string;
  /**
   * Duration in milliseconds for entering and leaving animations. Default is `300`.
   */
  speed?: number;
  /**
   * Duration in milliseconds. Default is `5000`.
   */
  duration?: number;
  /**
   * Additional data to pass to the notification component
   */
  data?: any;  // TODO: any
  /**
   * item state, scheduled by lifecycle hooks and click events
   */
  isActive?: boolean;
  /**
   * variable to store the timer for the notification
   */
  timer?: Timer;
}

/**
 * Notification component properties
 */
export interface ComponentProps extends Record<string, unknown> {
  /**
   * Animation name for the notification. Default is `fade`.
   */
  animationName: AnimationType;
  /**
   * Notification group name.
   * Default is `default`.
   * When multiple components are used, this is recommended to be set.
   */
  groupName: string;
  /**
   * ignore duplicate notifications. Default is `false`.
   */
  ignoreDuplicates: boolean;
  /**
   * Pause the timer when the mouse is hovering over the notification. Default is `false`.
   */
  pauseOnHover: boolean;
  /**
   * Maximum number of notifications to display. Default is `Infinity`.
   */
  maxItems: number;
  /**
   * Reverse the order of the notifications. Default is `false`.
   */
  reverseOrder: boolean;
  /**
   * Position of the notification. Default is `top-left`.
   */
  position: string;
  /**
   * show all the notifications in one place. Default is `false`.
   */
  stackItems: boolean;
}
