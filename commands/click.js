/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('click')
    .setDescription('A lot of button for you to click'),
  async execute(interaction) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('primary')
        .setLabel('Primary')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('secondary')
        .setLabel('Secondary')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('success')
        .setLabel('Success')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('danger')
        .setLabel('Danger')
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setLabel('Link')
        .setStyle(ButtonStyle.Link)
        .setURL('https://thecodeblog.net'),
    );
    await interaction.reply({
      content: 'I Think you should click a button',
      components: [row],
    });

    const collector = interaction.channel.createMessageComponentCollector();

    collector.on('collect', async (i) => {
      await i.update({
        content: `You clicked ${i.customId}`,
        components: [],
      });
    });
  },
};
