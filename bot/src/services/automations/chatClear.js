import { createEvent } from "#app/base/Event.js";
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "discord.js";

createEvent({
  name: 'ready',
  only: false,
  async run(client) {
    // await AutoChat(client);

    setInterval(async () => {
      // await AutoChat(client);
    }, 3600000);
  }
});

async function AutoChat(client) {
    const channel = await client.channels.cache.get(process.env.channelGeneralChat);
  
    if (!channel) return;
  
    let totalDeleted = 0;
    let fetchedMessages
  
    do {
      fetchedMessages = await channel.messages.fetch({ limit: 100 });
      if (fetchedMessages.size == 0) break;
  
      const deletedMessages = await channel.bulkDelete(fetchedMessages, true).catch(() => null);
  
      totalDeleted += deletedMessages ? deletedMessages.size : 0;
  
      await new Promise(res => setTimeout(res, 1000));
    } while (fetchedMessages.size >= 2);
  
    // // Deleta cada mensagem (pode ser adaptado para filtros específicos)
    // for (const message of messages.values()) {
    //   await message.delete().catch(() => null); // ignora erros ao deletar
    // }
  
    const embed = new EmbedBuilder()
      .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL()}` })
      .setTitle('Chat Limpo')
      .setColor('#870707')
      .setDescription('-# Todas as mensagens foram deletadas com sucesso.')
      .addFields([{ name: 'Total de Mensagens', value: `\`${totalDeleted}\``, inline: true }])
      .addFields([{ name: 'Próxima Limpeza', value: `<t:${Math.floor(Date.now() / 1000) + 3600}:R>`, inline: true }])
      .setTimestamp()
      .setFooter({ text: 'Chat limpo com sucesso!', iconURL: `${client.user.avatarURL()}` });
  
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder({ style: 2, customId: 'chat_cleaned', disabled: true, label: 'Mensagem do Sistema' })
    );
  
    await channel.send({ content: '', embeds: [embed], components: [row] });
}