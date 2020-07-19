import Config from 'config'
import createEmbed from 'utils/embeds'
import { formatDate } from 'utils/date'

export default class ServerInfoCommand {
  constructor() {
    this.name = 'server_info'
    this.aliases = ['serverinfo', 'server-info', 'guild_info', 'guildinfo', 'guild-info']
    this.description = 'Gets some info about the server'
    this.maxArgs = 0
    this.requiredRoles = [Config.roles.verified]
    this.usage = `${Config.prefix}${this.name}`
  }

  execute(message) {
    const embed = this.buildDetails(message)
    message.channel.send(embed)
  }

  buildDetails(message) {
    const guild = message.guild

    const {
      categories,
      textChannels,
      voiceChannels,
      onlineMembers,
      peopleUsers,
      botUsers,
    } = this.getGuildData(guild)

    return createEmbed(message)
      .setTitle('Server Info')
      .addField('Name', guild.name, true)
      .addField('ID', guild.id, true)
      .addField('Region', guild.region, true)
      .addField('Categories', categories.size, true)
      .addField('Text Channels', textChannels.size, true)
      .addField('VoiceChannels', voiceChannels.size, true)
      .addField('Total Members', guild.memberCount, true)
      .addField('Online Members', onlineMembers.size, true)
      .addField('People', peopleUsers.length, true)
      .addField('Bots', botUsers.length, true)
      .addField('Roles', guild.roles.size, true)
      .addField('Emojis', guild.emojis.size, true)
      .addField('Created At', formatDate(guild.createdAt))
  }

  getGuildData(guild) {
    const categories = guild.channels.filter((channel) => channel.type === 'category')
    const textChannels = guild.channels.filter((channel) => channel.type === 'text')
    const voiceChannels = guild.channels.filter((channel) => channel.type === 'voice')

    const onlineMembers = guild.members.filter((member) => member.user.presence.status === 'online')

    const { peopleUsers, botUsers } = guild.members.reduce((users, member) => {
      member.user.bot ? users.botUsers.push(member) : users.peopleUsers.push(member)
      return users
    }, {peopleUsers: [], botUsers: []})

    return {
      categories,
      textChannels,
      voiceChannels,
      onlineMembers,
      peopleUsers,
      botUsers,
    }
  }
}
