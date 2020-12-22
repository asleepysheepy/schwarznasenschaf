import config from '../../config'
import { Command } from '../command'
import { DateUtils } from '../../utils/date'
import { EmbedUtils } from '../../utils/embeds'
import { Message, Role } from 'discord.js'

/**
 * Gets the role to retrive info for.
 *
 * Attempts to resolve the role as follows:
 * 1) Check for a mentioned role
 * 2) Attempts a Snowflake from the command arguments
 *
 * @param message The message with the command
 * @param args The arguments to the command, may contain the role.
 */
const getRole = async (message: Message, args: Array<string>) => {
  if (message.mentions.roles.size > 0) { return message.mentions.roles.first() }
  if (!args[0]) { return }

  const role = await message.guild?.roles?.resolve(args[0])
  if (role) { return role }

  message.channel.send(`Unable to find role: ${args[0]}`)
}

/**
 * Builds the embed with the role info to post.
 *
 * @param message The message which ran the command
 * @param role The role to post information about
 */
const buildDetails = async (message: Message, role: Role) => {
  return (await EmbedUtils.createEmbed(message.author, message.client))
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
    .addField('Created At', DateUtils.formatDate(role.createdAt))
}

/**
 * A util command to post info about a role.
 */
export const RoleInfoCommand: Command = {
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
