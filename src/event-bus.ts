// event-bus.js
import {NotifyItem} from './types';

type Callback<T extends string | number | NotifyItem> = (...args: T[]) => void;

type EventBus = {
  on<T extends string | number | NotifyItem>(event: string, callback: Callback<T>): void;
  off<T extends string | number | NotifyItem>(event: string, callback: Callback<T>): void;
  emit<T extends string | number | NotifyItem>(event: string, ...args: T[]): void;
};

// Not necessary to use `ref` to create listeners
const eventMap = new Map<string, Set<Callback<any>>>();

export const eventBus: EventBus = {
  // Add listener
  on<T extends string | number | NotifyItem>(event: string, callback: Callback<T>): void {
    // Set up a new event listener if it doesn't exist
    if (!eventMap.has(event)) {
      eventMap.set(event, new Set());
    }
    // Get the event listener set and add the callback
    const eventListeners = eventMap.get(event) as Set<Callback<T>>;
    eventListeners.add(callback);
  },
  // Remove listener
  off<T extends string | number | NotifyItem>(event: string, callback: Callback<T>): void {
    if (eventMap.has(event)) {
      const eventListeners = eventMap.get(event) as Set<Callback<T>>;
      eventListeners.delete(callback);
      if (eventListeners.size === 0) {
        eventMap.delete(event);
      }
    }
  },
  // Emit event
  emit<T extends string | number | NotifyItem>(event: string, ...args: T[]): void {
    if (eventMap.has(event)) {
      const eventListeners = eventMap.get(event) as Set<Callback<T>>;
      for (const callback of eventListeners) {
        callback(...args);
      }
    }
  },
};
