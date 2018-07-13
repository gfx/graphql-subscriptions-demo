import { cable } from '../cable';

export const item = cable.subscriptions.create("ItemChannel", {
  connected() {
    console.log("[cable] connected");
  },

  disconnected() {
    console.log("[cable] disconnected");
  },

  received(data) {
    console.log("[cable] received", data);
  },

  hello() {
    console.log("[cable] hello")
    return this.perform('hello');
  }
});
