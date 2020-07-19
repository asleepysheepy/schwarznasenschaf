import Config from 'config'
import createEmbed from 'utils/embeds'
import { formatDate } from 'utils/date'

export default class UserInfoCommand {
  constructor() {
    this.name = 'user_info'
    this.aliases = ['userinfo', 'user-info']
    this.description = 'Gets some info about the given user, uses the command issuer if no user was given.'
    this.maxArgs = 1
    this.requiredRoles = [Config.roles.verified]
    this.usage = `${Config.prefix}${this.name} <user>`
  }

  execute(message, args) {
    const member = this.getMember(message, args)
    if (!member) { return }

    const embed = this.buildDetails(message, member)
    message.channel.send(embed)
  }

  getMember(message, args) {
    if (message.mentions.members.size > 0) {
      return message.mentions.members.first()
    }

    if (args[0]) {
      if (message.guild.members.has(args[0])) {
        return message.guild.members.get(args[0])
      } else {
        message.channel.send(`Unable to find user: ${args[0]}`)
        return null
      }
    }

    return message.member
  }

  buildDetails(message, member) {
    const user = member.user
    return createEmbed(message)
      .setTitle('User Info')
      .setThumbnail(user.avatarURL)
      .addField('Name', user.tag, true)
      .addField('ID', member.id, true)
      .addField('Display Name', `${user}`, true)
      .addField('Status', user.presence.game, true)
      .addField('Joined At', formatDate(member.joinedAt), true)
      .addField('Created At', formatDate(user.createdAt), true)
      .addField('Roles', member.roles.map((role) => `${role}`).join(', '))
  }
}
