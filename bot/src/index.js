import "dotenv/config";
import { Client, Collection, GatewayIntentBits, Partials } from "discord.js"
import { loadCommands } from "#app/handlers/loadCommands.js";
import { loadServices } from "#app/handlers/loadServices.js";

const client = new Client({
  intents: Object.keys(GatewayIntentBits).map(key => GatewayIntentBits[key]),
  partials: Object.values(Partials).map(key => Partials[key])
});

export default client;

client.commands = new Collection();

loadCommands(client);
loadServices(client)

client.login(process.env.botToken);