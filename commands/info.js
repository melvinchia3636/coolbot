/* eslint-disable operator-linebreak */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Get info about a user or a server')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('user')
        .setDescription('Info about a user')
        .addUserOption((option) =>
          option.setName('target').setDescription('The user'),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand.setName('server').setDescription('Info about the server'),
    ),
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    if (subcommand === 'user') {
      const user = await interaction.options.getUser('target').fetch(true);
      const member = interaction.guild.members.cache.get(user.id);
      const embed = new EmbedBuilder()
        .setTitle(`User info for ${user.username}`)
        .setColor(user.accentColor?.toString(16) || 0x00ae86)
        .setThumbnail(user.avatarURL())
        .addFields(
          { name: 'Display name', value: member.displayName },
          { name: 'Joined at', value: member.joinedAt.toUTCString() },
          { name: 'Created at', value: user.createdAt.toUTCString() },
          {
            name: 'Roles',
            value: member.roles.cache.map((role) => role.toString()).join(', '),
          },
        );
      await interaction.reply({ embeds: [embed] });
    } else if (subcommand === 'server') {
      const owner = await interaction.guild.fetchOwner();

      const embed = new EmbedBuilder()
        .setTitle(`Server info for ${interaction.guild.name}`)
        .setColor(0x00ae86)
        .setThumbnail(interaction.guild.iconURL())
        .addFields(
          { name: 'ID', value: interaction.guild.id, inline: true },
          {
            name: 'Description',
            value: interaction.guild.description || 'None',
          },
          {
            name: 'Owner',
            value: owner.displayName,
            inline: true,
          },
          {
            name: 'Created at',
            value: interaction.guild.createdAt.toUTCString(),
            inline: true,
          },
          {
            name: 'Members',
            value: interaction.guild.memberCount.toString(),
            inline: true,
          },
          {
            name: 'Roles',
            value: interaction.guild.roles.cache.map((r) => r).join(', '),
            inline: true,
          },
          {
            name: 'Channels',
            value: interaction.guild.channels.cache.map((c) => c).join(', '),
          },
          {
            name: 'Emojis',
            value:
              interaction.guild.emojis.cache
                .map((e) => e)
                .slice(0, 10)
                .join(', ') +
              (interaction.guild.emojis.cache.size > 10
                ? ` and ${interaction.guild.emojis.cache.size - 10} more`
                : ''),
          },
        );
      await interaction.reply({ embeds: [embed] });
    }
  },
};
