import Config from 'config'
import createEmbed from 'utils/embeds'
import { formatDate } from 'utils/date'

export default class RoleInfoCommand {
  constructor() {
    this.name= 'role_info'
    this.aliases = ['roleinfo', 'role-info']
    this.description = 'Gets some info about the given role'
    this.maxArgs = 1
    this.minArgs = 1
    this.requiredRoles = [Config.roles.verified]
    this.usage = `${Config.prefix}${this.name} [role]`
  }

  execute(message, args) {
    const role = this.getRole(message, args)
    if (!role) { return }

    const embed = this.buildDetails(message, role)
    message.channel.send(embed)
  }

  getRole(message, args) {
    if (message.mentions.roles.size > 0) {
      return message.mentions.roles.first()
    }

    if (message.guild.roles.has(args[0])) {
      return message.guild.roles.get(args[0])
    } else {
      message.channel.send(`Unable to find role: ${args[0]}`)
      return null
    }
  }

  buildDetails(message, role) {
    return createEmbed(message)
      .setTitle('Role Info')
      .setColor(role.hexColor)
      .addField('Name', role.name, true)
      .addField('ID', role.id, true)
      .addField('Members', role.members.size, true)
      .addField('Mentionable', role.mentionable, true)
      .addField('Color', role.hexColor, true)
      .addField('Mention', role, true)
      .addField('Position', role.position, true)
      .addField('Hoisted', role.hoist, true)
      .addField('Created At', formatDate(role.createdAt))
  }
}
