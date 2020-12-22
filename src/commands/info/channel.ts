import config from '../../config'
import { Command } from '../command'
import { DateUtils } from '../../utils/date'
import { EmbedUtils } from '../../utils/embeds'
import { GuildChannel, Message, TextChannel, VoiceChannel } from 'discord.js'

/**
 * Gets the channel to retrive info for.
 *
 * Attempts to resolve the channel as follows:
 * 1) Check for a mentioned channel
 * 2) Attempts a Snowflake from the command arguments
 * 3) Uses the message's achanel
 *
 * @param message The message with the command
 * @param args The arguments to the command, may contain the channel.
 */
const getChannel = async (message: Message, args: Array<string>) => {
  if (message.mentions.channels.size > 0) { return message.mentions.channels.first() }

  return args[0] ? await message.guild?.channels?.resolve(args[0]) : message.channel
}

/**
 * Builds the embed with the channel info to post.
 *
 * @param message The message which ran the command
 * @param channel The channel to post information about
 */
const buildDetails = async (message: Message, channel: GuildChannel) => {
  const embed = await EmbedUtils.createEmbed(message.author, message.client)
  embed.setTitle('Channel Info')
    .addField('Name', channel.name, true)
    .addField('ID', channel.id, true)
    .addField('Users', channel.members.size, true)
    .addField('Type', channel.type, true)

  if (channel instanceof TextChannel) {
    embed.addField('NSFW', channel.nsfw, true)
    embed.addField('Slowmode', channel.rateLimitPerUser > 0, true)
  }

  if (channel instanceof VoiceChannel) {
    embed.addField(
      'User Limit',
      channel.userLimit === 0 ? 'Unlimited' : channel.userLimit,
      true,
    )
  }

  embed.addField('Created At', DateUtils.formatDate(channel.createdAt))

  if (channel instanceof TextChannel) {
    embed.addField('Topic', channel.topic ? channel.topic : '<no_channel_topic>')
  }

  return embed
}

/**
 * A util command to post info about a channel.
 */
export const ChannelInfoCommand: Command = {
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
