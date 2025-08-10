import { createEvent } from "#app/base/Event.js";
import { ActionRowBuilder, ButtonBuilder } from "discord.js";

createEvent({
  name: 'ready',
  only: false,

  async run(client) {
    // await AutoMessage(client);

    setInterval(async () => {
      // await AutoMessage(client);
    }, 60000);
  }
});

async function AutoMessage(client) {
  try {
    const channel = await client.channels.cache.get(process.env.channelSuggestion);

    if (!channel) return;

    const messages = await channel.messages.fetch({ limit: 100 });
    const botMessages = messages.filter(msg => msg.author.id === client.user.id);

    if (botMessages.size > 0) {
      await channel.bulkDelete(botMessages, true).catch(() => null);
    }

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder({ style: 2, customId: 'auto_message', label: 'Ver Regras' })
    );

    await channel.send({ content: 'Clique abaixo e leia antes de enviar algo aqui.', components: [row] });
  } catch (error) {
    console.error('\u001b[31m[ERROR] \u001b[0mError sending message automatically', error.message);
  }
}