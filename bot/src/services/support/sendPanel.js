import { createEvent } from "#app/base/Event.js";
import { ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder } from "discord.js";

createEvent({
  name: 'messageCreate',
  only: false,

  async run(message, client) {
    if (message.author.bot) return;
    if (!message.member?.roles.cache.has('1401359645242691590')) return;
    if (message.content !== '!avisando' && message.content !== '!support') return;

    const embed = new EmbedBuilder()
      .setTitle('Suporte')
      .setColor('#750505')
      .setDescription(`Olá! Precisa de ajuda? Abra um ticket e descreva o seu problema de acordo com as suas necessidades!\n**Não abra um ticket desnecessariamente, sujeito a proteção.**`)
      .setImage('https://cdn.discordapp.com/banners/1403882388018303036/1bee3a2abc7de2e7e68725defbbb96e0.webp?size=4096')
      .setTimestamp()
      .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() });

    const select = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder({
        customId: 'support_select',
        placeholder: 'Selecione uma opção',
        options: [
          { label: 'Suporte', emoji: '1330247766777270446', value: 'support' }
        ]
      })
    );

    await message.delete().catch(() => null);
    await message.channel.send({ embeds: [embed], components: [select] });
  }
});