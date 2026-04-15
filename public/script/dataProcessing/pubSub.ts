export class PubSub {
  subscribers: Map<string, Set<Function>>;
  constructor() {
    this.subscribers = new Map();
  }

  subscribe(type: string, callback: Function) {
    if (!this.subscribers.has(type)) {
      this.subscribers.set(type, new Set());
    }
    this.subscribers.get(type)?.add(callback);
  }

  unsubscribe(type: string, callback: Function) {
    if (this.subscribers.has(type)) {
      const callbacks = this.subscribers.get(type);
      callbacks?.delete(callback);
    }
  }
  publish(type: string, data: unknown) {
    const callbacks = this.subscribers.get(type);
    if (callbacks) {
      callbacks.forEach((cb) => cb(data));
    }
  }
}
export const pubSub = new PubSub();
