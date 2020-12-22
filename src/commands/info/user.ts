import config from '../../config'
import { Command } from '../command'
import { DateUtils } from '../../utils/date'
import { EmbedUtils } from '../../utils/embeds'
import { GuildMember, Message } from 'discord.js'

/**
 * Gets the user to retrive info for.
 *
 * Attempts to resolve the user as follows:
 * 1) Check for a mentioned user
 * 2) Attempts a Snowflake from the command arguments
 * 3) Uses the message's author
 *
 * @param message The message with the command
 * @param args The arguments to the command, may contain the user.
 */
const getMember = async (message: Message, args: Array<string>) => {
  if (message.mentions.members?.first()) { return message.mentions.members.first() }

  return args[0] ? await message.guild?.members?.resolve(args[0]) : message.member
}

/**
 * Builds the embed containing all the info to post about the user.
 *
 * @param message The message which ran the command
 * @param member The user to post info about
 */
const buildDetails = async (message: Message, member: GuildMember) => {
  const user = member.user
  const embed = await EmbedUtils.createEmbed(message.author, message.client)
  embed.setTitle('User Info')
    .addField('Name', user.tag, true)
    .addField('ID', member.id, true)
    .addField('Display Name', `${user}`, true)

  const activity = user.presence.activities[0]
  embed.addField('Status', activity.name, true)

  const avatarURL = user.avatarURL()
  if (avatarURL) { embed.setThumbnail(avatarURL) }

  const joinDate = member.joinedAt
  if (joinDate) { embed.addField('Joined At', DateUtils.formatDate(joinDate), true) }

  embed.addField('Created At', DateUtils.formatDate(user.createdAt), true)
    .addField('Roles', member.roles.cache.map((role) => `${role}`).join(', '))

  return embed
}

/**
 * Sends a message containing some information about the given user.
 */
export const UserInfoCommand: Command = {
  name: 'user_info',
  aliases: ['userinfo', 'user-info'],
  description: 'Gets some info about the given user, uses the command issuer if no user was given.',
  maxArgs: 1,
  requiredRoles: [config().roles.verified],
  usage: 'user_info <user>',

  execute: async (message: Message, args: Array<string>) => {
    const member = await getMember(message, args)
    if (!member) { return }

    const embed = await buildDetails(message, member)
    message.channel.send(embed)
  },
}
