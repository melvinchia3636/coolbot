/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChannelType,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Replies with your input!')
    .addStringOption((option) =>
      option
        .setName('input')
        .setDescription('The input to echo back')
        .setRequired(true)
        .setMaxLength(1000),
    )
    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('The channel to echo into')
        .addChannelTypes(ChannelType.GuildText),
    )
    .addBooleanOption((option) =>
      option
        .setName('shout')
        .setDescription('Whether or not to put the input in all caps'),
    )
    .addNumberOption((option) =>
      option
        .setName('number')
        .setDescription('The number of times to echo back between 1 and 10')
        .setMinValue(1)
        .setMaxValue(10),
    )
    .addStringOption((option) =>
      option
        .setName('color')
        .setDescription('Put a color emoji before your message')
        .addChoices(
          { name: 'Red', value: '🟥' },
          { name: 'Orange', value: '🟧' },
          { name: 'Yellow', value: '🟨' },
          { name: 'Green', value: '🟩' },
          { name: 'Blue', value: '🟦' },
          { name: 'Purple', value: '🟪' },
          { name: 'Brown', value: '🟫' },
          { name: 'White', value: '⬜' },
          { name: 'Black', value: '⬛' },
        ),
    ),
  async execute(interaction) {
    let input = interaction.options.getString('input');
    const channel = interaction.options.getChannel('channel');
    const shout = interaction.options.getBoolean('shout');
    const number = interaction.options.getNumber('number') || 1;
    const color = interaction.options.getString('color') || '';

    if (shout) input = input.toUpperCase();

    input = `${color} ${input}`;

    try {
      if (channel) {
        for (let i = 0; i < number; i++) {
          await channel.send(input);
        }

        const embed = new EmbedBuilder()
          .setColor(0x00ff00)
          .setTitle('Echo successful')
          .setDescription(`Your message has been sent to ${channel}`);
        await interaction.reply({ embeds: [embed] });
      } else {
        await interaction.reply(input);
        for (let i = 1; i < number; i++) {
          await interaction.followUp(input);
        }

        const embed = new EmbedBuilder()
          .setColor(0x00ff00)
          .setTitle('Echo successful')
          .setDescription('Your message has been sent to this channel');
        await interaction.followUp({ embeds: [embed] });
      }
    } catch {
      const embed = new EmbedBuilder()
        .setColor(0xff0000)
        .setTitle('Echo failed')
        .setDescription(`Unable to send message to ${channel}`);
      await interaction.reply({ embeds: [embed] });
    }
  },
};
