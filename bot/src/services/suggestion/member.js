import { createEvent } from "#app/base/Event.js";

createEvent({
  name: 'messageCreate',
  only: false,

  async run(message, client) {
    if (message.author.bot && message.author.id !== client.user.id) return await message.delete().catch(() => null);
    if (message.author.bot) return;
    if (message.channel.id !== process.env.channelSuggestion) return;

    const thread = await message.startThread({
      name: 'Discutir sobre a Sugestão',
      autoArchiveDuration: 60,
      reason: 'Discussão sobre a Sugestão',
    });

    await thread.send({ content: `${message.author}, gradecemos sua sugestão!\nEste tópico foi criado para facilitar a discussão em torno dela.\nSinta-se à vontade para usar este espaço para debater e aprofundar a conversa.` });
  }
})