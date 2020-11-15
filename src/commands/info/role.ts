import Command from '../command'
import config from '../../config'
import createEmbed from '../../utils/embeds'
import { Message, Role } from 'discord.js'
import { formatDate } from '../../utils/date'

const getRole = async (message: Message, args: Array<string>) => {
  if (message.mentions.roles.size > 0) { return message.mentions.roles.first() }
  if (!args[0]) { return }

  const role = await message.guild?.roles?.resolve(args[0])
  if (role) { return role }

  message.channel.send(`Unable to find role: ${args[0]}`)
}

const buildDetails = async (message: Message, role: Role) => {
  return (await createEmbed(message))
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

const RoleInfoCommand: Command = {
  name: 'role_info',
  aliases: ['roleinfo', 'role-info'],
  description: 'Gets some info about the given role',
  maxArgs: 1,
  minArgs: 1,
  requiredRoles: [config().roles.verified],
  usage: 'role_info [role]',

  execute: async (message: Message, args: Array<string>) => {
    const role = await getRole(message, args)
    if (!role) { return }

    const embed = await buildDetails(message, role)
    message.channel.send(embed)
  },
}

export default RoleInfoCommand
