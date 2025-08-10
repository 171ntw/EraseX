import { readdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function loadCommands(client) {
  try {
    const path = join(__dirname, '../commands');
    const folders = await readdir(path);

    for (const folder of folders) {
      const files = await readdir(join(path, folder));

      for (const file of files) {
        if (!file.endsWith('.js')) continue;

        const { default: command } = await import(pathToFileURL(join(path, folder, file)).href);

        if (!command || !command.name) {
          console.warn(`\u001b[33m[WARN] Invalid command in file: ${file}\u001b[0m`);
          continue;
        }

        client.commands.set(command.name, command);
        console.log(`\u001b[32m[INFO] Loaded command: ${command.name}\u001b[0m`);
      }
    }

    client.on('ready', () => {
      console.log(`\u001b[32m[INFO] ${client.user.tag} is online and ready!\u001b[0m`);

      client.user.setPresence({
        status: 'dnd',
        activities: [
          { name: 'EraseX no TOPO', type: 0 }
        ],
      });

      client.guilds.cache.forEach(async guild => {
        await guild.commands.set([...client.commands.values()]);
        console.log(`\u001b[32m[INFO] Commands synced for guild: ${guild.name} (${guild.id})\u001b[0m`);
      });
    });

    client.on('guildCreate', async (guild) => {
      await guild.commands.set([...client.commands.values()]);
      console.log(`\u001b[32m[INFO] Commands synced for new guild: ${guild.name} (${guild.id})\u001b[0m`);
    });
  } catch (error) {
    console.error("\u001b[31m[ERROR] Error loading commands:\u001b[0m", error);
  }
}