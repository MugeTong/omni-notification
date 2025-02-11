// event-bus.js

// Not necessary to use `ref` to create listeners
const eventMap: Map<string, Set<Callback>> = new Map();

type Callback<Params = any[]> = Params extends unknown[] ? (...args: Params) => any : (args: Params) => any;

export const eventBus: {
  on(event: string, callback: Callback): void;
  off(event: string, callback: Callback): void;
  emit(event: string, ...args: any[]): void;
} = {
  // add listener
  on(event: string, callback: Callback): void {
    // set up a new event listener if it doesn't exist
    if (!eventMap.has(event)) {
      eventMap.set(event, new Set());
    }
    // get the event listener set and add the callback
    const eventListeners: Set<Callback> = eventMap.get(event);
    eventListeners.add(callback);
  },
  // remove listener
  off(event: string, callback: Callback): void {
    if (eventMap.has(event)) {
      const eventListeners: Set<Callback> = eventMap.get(event);
      eventListeners.delete(callback);
      if (eventListeners.size === 0) {
        eventMap.delete(event);
      }
    }
  },
  // emit event
  emit(event: string, ...args: any[]): void {
    if (eventMap.has(event)) {
      const eventListeners: Set<Callback> = eventMap.get(event);
      for (const callback of eventListeners) {
        callback(...args);
      }
    }
  },
};
