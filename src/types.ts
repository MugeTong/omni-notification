import {App} from 'vue';


type NotificationType = 'info' | 'success' | 'warning' | 'error';

export type NotificationPlugin = {
  install: (app: App, args: PluginOptions) => void;
  installed: boolean;
  params: PluginOptions | null;
};

/**
 * Plugin options
 */
export interface PluginOptions {
  /**
   * Register the plugin as `name` in `provide/inject` and `$name` in `template`. Default is `notify`.
   */
  name?: string;
  /**
   * Custom your own notification component, if `true`. Default is `false`.
   */
  customComponent?: boolean;
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
   * Show a info notification
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

export interface NotifyItem {
  title?: string;
  text: string;
  type?: NotificationType;
  duration?: number;
  group?: string;
  data?: any;
}
