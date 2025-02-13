// event-bus.js
import { NotifyItem } from './types';

type Callback<T = string | number | NotifyItem> = (param?: T) => void;

type EventBus = {
  on<T = string | number | NotifyItem>(event: string, callback: Callback<T>): void;
  off<T = string | number | NotifyItem>(event: string, callback: Callback<T>): void;
  emit<T = string | number | NotifyItem>(event: string, param?: T): void;
};

// Not necessary to use `ref` to create listeners
const eventMap = new Map<string, Set<Callback>>();

export const eventBus: EventBus = {
  // Add listener
  on<T = string | number | NotifyItem>(event: string, callback: Callback<T>): void {
    // Set up a new event listener if it doesn't exist
    if (!eventMap.has(event)) {
      eventMap.set(event, new Set());
    }
    // Get the event listener set and add the callback
    const eventListeners = eventMap.get(event) as Set<Callback<T>>;
    eventListeners.add(callback);
  },
  // Remove listener
  off<T = string | number | NotifyItem>(event: string, callback: Callback<T>): void {
    if (eventMap.has(event)) {
      const eventListeners = eventMap.get(event) as Set<Callback<T>>;
      eventListeners.delete(callback);
      if (eventListeners.size === 0) {
        eventMap.delete(event);
      }
    }
  },
  // Emit event
  emit<T = string | number | NotifyItem>(event: string, param?: T): void {
    if (eventMap.has(event)) {
      const eventListeners = eventMap.get(event) as Set<Callback<T>>;
      for (const callback of eventListeners) {
        callback(param);
      }
    }
  },
};
