import {App} from 'vue';


type NotificationType = 'info' | 'success' | 'warning' | 'error';
type AnimationType = 'fade';

export interface NotificationPlugin {
  install: (app: App, args?: PluginOptions, componentProps?: ComponentProps) => void;
  installed: boolean;
  params: PluginOptions | null;
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

export interface NotifyObject {
  /**
   * Show a notification
   */
  (params: string | NotifyItem): void;

  /**
   * Show an info notification
   */
  show: (params: string | NotifyItem) => void;
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
  title?: string;
  message: string;
  type?: NotificationType;
  duration?: number;
  group?: string;
  data?: any;
}

export interface ComponentProps extends Record<string, unknown> {
  animationName: AnimationType;
}
