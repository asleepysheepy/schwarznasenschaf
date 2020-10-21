import Command from '../command'
import config from '../../config'
import createEmbed from '../../utils/embeds'
import { GuildMember, Message } from 'discord.js'
import { formatDate } from '../../utils/date'

const getMember = async (message: Message, args: Array<string>) => {
  if (message.mentions.members?.first()) { return message.mentions.members.first() }

  return args[0] ? await message.guild?.members?.resolve(args[0]) : message.member
}

const buildDetails = async (message: Message, member: GuildMember) => {
  const user = member.user
  const embed = await createEmbed(message)
  embed.setTitle('User Info')
    .addField('Name', user.tag, true)
    .addField('ID', member.id, true)
    .addField('Display Name', `${user}`, true)

  const activity = user.presence.activities[0]
  embed.addField('Status', activity.name, true)

  const avatarURL = user.avatarURL()
  if (avatarURL) { embed.setThumbnail(avatarURL) }

  const joinDate = member.joinedAt
  if (joinDate) { embed.addField('Joined At', formatDate(joinDate), true) }

  embed.addField('Created At', formatDate(user.createdAt), true)
    .addField('Roles', member.roles.cache.map((role) => `${role}`).join(', '))

  return embed
}

const UserInfoCommand: Command = {
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

export default UserInfoCommand
