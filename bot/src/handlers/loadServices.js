import { readdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { events } from "#app/base/Event.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function loadServices(client) {
  try {
    const path = join(__dirname, '../services');
    const folders = await readdir(path);

    for (const folder of folders) {
      const files = await readdir(join(path, folder));

      for (const file of files) {
        if (!file.endsWith('.js')) continue;
        await import(pathToFileURL(join(path, folder, file)).href);
      }
    }

    for (const event of events) {
      if (!event || !event.name) {
        console.warn(`\u001b[33m[WARN] Invalid event detected.\u001b[0m`);
        continue;
      }

      if (!event.only) {
        client.on(event.name, (...args) => event.run(...args, client));
      } else {
        client.once(event.name, (...args) => event.run(...args, client));
      }

      console.log(`\u001b[32m[INFO] Loaded event: ${event.name}\u001b[0m`);
    }
  } catch (error) {
    console.error("\u001b[31m[ERROR] Error loading services:\u001b[0m", error);
  }
}