// event-bus.js
import { NotifyItem } from './types';

type Callback<T = string | number | NotifyItem> = (param?: T) => void;

type EventBus = {
  on(event: string, callback: Callback): void;
  off(event: string, callback: Callback): void;
  emit(event: string, param?: string | number | NotifyItem): void;
};

// Not necessary to use `ref` to create listeners
const eventMap = new Map<string, Set<Callback>>();

export const eventBus: EventBus = {
  // Add listener
  on(event: string, callback: Callback): void {
    // Set up a new event listener if it doesn't exist
    if (!eventMap.has(event)) {
      eventMap.set(event, new Set());
    }
    // Get the event listener set and add the callback
    const eventListeners = eventMap.get(event) as Set<Callback>;
    eventListeners.add(callback);
  },
  // Remove listener
  off(event: string, callback: Callback): void {
    if (eventMap.has(event)) {
      const eventListeners = eventMap.get(event) as Set<Callback>;
      eventListeners.delete(callback);
      if (eventListeners.size === 0) {
        eventMap.delete(event);
      }
    }
  },
  // Emit event
  emit(event: string, param?: string | number | NotifyItem): void {
    if (eventMap.has(event)) {
      const eventListeners = eventMap.get(event) as Set<Callback>;
      for (const callback of eventListeners) {
        callback(param);
      }
    }
  },
};
