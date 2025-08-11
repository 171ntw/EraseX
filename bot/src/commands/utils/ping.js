import { createCommand } from "#app/base/Command.js";

createCommand({
  name: 'ping',
  description: 'Retorna a latência do bot.',
  type: 1,

  async run(interaction, client) {
    await interaction.reply({ content: `🏓 Pong! Latência: ${client.ws.ping}ms`, ephemeral: true });
  }
});