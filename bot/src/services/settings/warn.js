import { createEvent } from "#app/base/Event.js";

createEvent({
  name: 'warn',
  only: false,

  async run(warning) {
    console.warn('\u001b[33m[WARNING EVENT]\u001b[0m', warning.message);
  }
});