import config from '../../config'
import { Command} from '../command'
import { CommandUtils } from '../../utils/commands'
import { GuildMember, Message, Snowflake, TextChannel } from 'discord.js'

/**
 * Check to see if the given guild member has the given role.
 *
 * @param member The guild member to check
 * @param roleId the role to check for
 */
const hasRole = (member: GuildMember, roleId: Snowflake) => {
  const roles = member.roles.cache
  return roles.keyArray().includes(roleId)
}

/**
 * Gives the user the verified role.
 *
 * @param member The member to give the roles to
 */
const setRoles = (member: GuildMember) => {
  member.roles.add(config().roles.verified)
}

/**
 * Sends a welcome message to the user in the general channel and
 * a message about self assignable roles in the bots channel.
 *
 * @param member the member who was verified
 * @param message the message containing the command
 */
const sendMessages = async (member: GuildMember, message: Message) => {
  const guild = message.guild
  if (!guild) { return }

  let channel = await guild.channels.resolve(config().channels.bots) as TextChannel
  channel.send(`${member.user} you can assign yourself roles here: https://roleypoly.com/s/${guild.id}`)

  channel = await guild.channels.resolve(config().channels.general) as TextChannel
  channel.send(`Welcome ${member.user}`)
}

/**
 * Deletes the given number of messages from the verification process.
 *
 * @param message The message which ran the command
 * @param args the args passed to the commands,
 *   contains the number of message to delete.
 */
const deleteMessages = (message: Message, args: Array<string>) => {
  if (args[1]) {
    const numberMessagesToDelete = parseInt(args[1])

    if (Number.isNaN(numberMessagesToDelete)) {
      message.channel.send(`${args[1]} is not a number`)
      return
    }

    const channel = message.channel as TextChannel
    if (CommandUtils.bulkDeleteMessages(channel, numberMessagesToDelete)) {
      CommandUtils.sendAndDeleteMessage('', channel, 5)
    }
  }
}

/**
 * Utility command for verifing new users.
 */
export const VerifyCommand: Command = {
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
