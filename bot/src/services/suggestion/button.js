import { createEvent } from "#app/base/Event.js";

createEvent({
  name: 'interactionCreate',
  only: false,

  async run(interaction, client) {
    if (interaction.isButton() && interaction.customId == 'auto_message') {
      await interaction.reply({ ephemeral: true, content: '### Regras do Servidor\n\n1. Proibido desrespeito, ameaças ou algo do tipo.\n2. Evite spam ou mensagens irrelevantes.\n3. Conteúdo NSFW não é permitido.\n4. Conteúdo ofensivo ou discriminatório não será tolerado.' });
    }
  }
})