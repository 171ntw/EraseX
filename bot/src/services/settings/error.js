import { createEvent } from "#app/base/Event.js";

createEvent({
  name: 'error',
  only: false,

  async run(error) {
    console.error('\u001b[31m[ERROR EVENT]\u001b[0m', error.message);
  }
});