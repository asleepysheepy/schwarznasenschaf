import Command from '../command'
import config from '../../config'
import { GuildMember, Message, Snowflake, TextChannel } from 'discord.js'
import { bulkDeleteMessages, sendAndDeleteMessage } from '../../utils/commands'

const hasRole = (member: GuildMember, roleId: Snowflake) => {
  const roles = member.roles.cache
  return roles.keyArray().includes(roleId)
}

const setRoles = (member: GuildMember) => {
  member.roles.add(config().roles.verified)
}

const sendMessages = async (member: GuildMember, message: Message) => {
  const guild = message.guild
  if (!guild) { return }

  let channel = await guild.channels.resolve(config().channels.bots) as TextChannel
  channel.send(`${member.user} you can assign yourself roles here: https://roleypoly.com/s/${guild.id}`)

  channel = await guild.channels.resolve(config().channels.general) as TextChannel
  channel.send(`Welcome ${member.user}`)
}

const deleteMessages = (message: Message, args: Array<string>) => {
  if (args[1]) {
    const numberMessagesToDelete = parseInt(args[1])

    if (Number.isNaN(numberMessagesToDelete)) {
      message.channel.send(`${args[1]} is not a number`)
      return
    }

    const channel = message.channel as TextChannel
    if (bulkDeleteMessages(channel, numberMessagesToDelete)) {
      sendAndDeleteMessage('', channel, 5)
    }
  }
}

const VerifyCommand: Command = {
  name: 'verify',
  description: 'Verifies the mentioned user and optionally clears chat',
  maxArgs: 2,
  minArgs: 1,
  requiredRoles: [config().roles.modTeam],
  usage: 'verify [mentioned_user] <messages_to_clear>',

  execute: (message: Message, args: Array<string>) => {
    const member = message.mentions?.members?.first()
    if (!member) {
      message.channel.send('No valid user given')
      return
    }

    if (hasRole(member, config().roles.verified)) {
      message.channel.send(`${member.user.tag} is already verified`)
      return
    }

    setRoles(member)
    sendMessages(member, message)
    deleteMessages(message, args)
  },
}

export default VerifyCommand
