import Command from '../command'
import Discord, { GuildChannel, Message } from 'discord.js'
import config from '../../config'
import createEmbed from '../../utils/embeds'
import { formatDate } from '../../utils/date'

const getChannel = async (message: Message, args: Array<string>) => {
  if (message.mentions.channels.size > 0) { return message.mentions.channels.first() }

  return args[0] ? await message.guild?.channels?.resolve(args[0]) : message.channel
}

const buildDetails = async (message: Message, channel: GuildChannel) => {
  const embed = await createEmbed(message)
  embed.setTitle('Channel Info')
    .addField('Name', channel.name, true)
    .addField('ID', channel.id, true)
    .addField('Users', channel.members.size, true)
    .addField('Type', channel.type, true)

  if (channel instanceof Discord.TextChannel) {
    embed.addField('NSFW', channel.nsfw, true)
    embed.addField('Slowmode', channel.rateLimitPerUser > 0, true)
  }

  if (channel instanceof Discord.VoiceChannel) {
    embed.addField(
      'User Limit',
      channel.userLimit === 0 ? 'Unlimited' : channel.userLimit,
      true,
    )
  }

  embed.addField('Created At', formatDate(channel.createdAt))

  if (channel instanceof Discord.TextChannel) {
    embed.addField('Topic', channel.topic ? channel.topic : '<no_channel_topic>')
  }

  return embed
}

const ChannelInfoCommand: Command = {
  name: 'channel_info',
  aliases: ['channelinfo', 'channel-info'],
  description: 'Gets some info about the given channel, if no channel is given uses the current channel',
  maxArgs: 1,
  requiredRoles: [config().roles.verified],
  usage: 'channel_info <channel>',

  execute: async (message: Message, args: Array<string>) => {
    const channel = await getChannel(message, args) as GuildChannel
    if (!channel) { return }

    const embed = await buildDetails(message, channel)
    message.channel.send(embed)
  },
}

export default ChannelInfoCommand
