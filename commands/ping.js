const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction) {
    await interaction.deferReply();
    const nice = await fetch(
      'https://api.github.com/repos/discordjs/discord.js',
    ).then((e) => e.json());
    await interaction.editReply(JSON.stringify(nice).slice(0, 2000));
  },
};
