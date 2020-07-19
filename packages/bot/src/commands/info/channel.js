import Config from 'config'
import Discord from 'discord.js'
import createEmbed from 'utils/embeds'
import { formatDate } from 'utils/date'

export default class ChannelInfoCommand {
  constructor() {
    this.name = 'channel_info'
    this.aliases = ['channelinfo', 'channel-info']
    this.description = 'Gets some info about the given channel, if no channel is given uses the current channel'
    this.maxArgs = 1
    this.requiredRoles = [Config.roles.verified]
    this.usage = `${Config.prefix}${this.name} <channel>`
  }

  execute(message, args) {
    const channel = this.getChannel(message, args)
    if (!channel) { return }

    const embed = this.buildDetails(message, channel)
    message.channel.send(embed)
  }

  getChannel(message, args) {
    if (message.mentions.channels.size > 0) {
      return message.mentions.channels.first()
    }

    if (args[0]) {
      if (message.guild.channels.has(args[0])) {
        return message.guild.channels.get(args[0])
      } else {
        message.channel.send(`Unable to find channel: ${args[0]}`)
      }
    }

    return message.channel
  }

  buildDetails(message, channel) {
    const embed = createEmbed(message)
      .setTitle('Channel Info')
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
}
