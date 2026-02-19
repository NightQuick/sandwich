export class PubSub {
  constructor(channelName = 'pubSub') {
    this.channel = new BroadcastChannel(channelName);
    this.subscribers = new Map();

    this.channel.onmessage = (event) => {
      const { type, data } = event.data;
      // console.log(' Получено из канала:', type, data);
    };
  }

  subscribe(type, callback) {
    if (!this.subscribers.has(type)) {
      this.subscribers.set(type, new Set());
    }
    this.subscribers.get(type).add(callback);
  }

  publish(type, data) {
    this.channel.postMessage({ type, data });
    // console.log('Отправлено в канал:', type);

    const callbacks = this.subscribers.get(type);
    if (callbacks) {
      callbacks.forEach((cb) => cb(data));
    }
  }

  close() {
    this.channel.close();
  }
}
