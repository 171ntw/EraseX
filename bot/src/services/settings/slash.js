import { createEvent } from "#app/base/Event.js";

createEvent({
  name: 'interactionCreate',
  only: false,

  async run(interaction, client) {
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) return;

      if (!interaction.guild) return;

      try {
        await command.run(interaction, client);
      } catch {}
    }
  }
})
