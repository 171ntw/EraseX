import { createEvent } from "#app/base/Event.js";
import { ActionRowBuilder, ButtonBuilder } from "discord.js";

createEvent({
  name: 'interactionCreate',
  only: false,

  async run(interaction, client) {
    if (interaction.isStringSelectMenu() && interaction.customId == 'support_select') {
      const { values } = interaction;

      if (values == 'support') {
        const checkThread = interaction.channel.threads.cache.find(t => t.name === `📞 Suporte-${interaction.user.id}`);

        if (checkThread) return await interaction.reply({ ephemeral: true, content: 'Você já possui um ticket de suporte aberto.' });

        const thread = await interaction.channel.threads.create({
          name: `📞 Suporte-${interaction.user.id}`,
          type: 12,
          autoArchiveDuration: 60,
          reason: 'Support ticket created'
        });

        await thread.members.add(interaction.user.id).catch(() => null);

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder({ style: 5, url: thread.url, label: 'Ir para o Suporte' }),
        );

        const buttons = new ActionRowBuilder().addComponents(
          new ButtonBuilder({ style: 4, customId: 'close', label: 'Fechar Ticket' }),
          new ButtonBuilder({ style: 1, customId: `Notify-${interaction.user.id}`, label: 'Notificar Usuário' })
        );

        await interaction.update('').catch(() => null);

        await interaction.followUp({ ephemeral: true, content: `Obrigado por criar um ticket de suporte!`, components: [row] }).catch(() => null);

        await thread.send({ content: `Olá ${interaction.user}, como podemos ajudar você hoje?\n-# <@&${process.env.supportRoleId}>`, components: [buttons] });
      }
    }

    if (interaction.isButton()) {
      const { customId } = interaction;

      if (customId == 'close') {
        if (!interaction.member.roles.cache.has(process.env.supportRoleId)) {
          return await interaction.reply({ ephemeral: true, content: 'Você não tem permissão para fechar este ticket.' });
        }

        const buttons = new ActionRowBuilder().addComponents(
          new ButtonBuilder({ style: 4, customId: 'closed0', disabled: true, label: 'Fechar Ticket' }),
          new ButtonBuilder({ style: 1, customId: 'closed1', disabled: true, label: 'Notificar Usuário' })
        );

        await interaction.update({ components: [buttons] }).catch(() => null);

        await interaction.followUp({ content: `O Atendimento será fechado em **10 segundos**.\n### Informações\n1. **Staff**: ${interaction.user}\n\n2. **Tempo**: <t:${Math.floor(Date.now() / 1000) + 10}:R>` });

        setTimeout(async () => {
          await interaction.channel.delete('Support ticket closed').catch(() => null);
        }, 10000);
      }
    }
  }
});