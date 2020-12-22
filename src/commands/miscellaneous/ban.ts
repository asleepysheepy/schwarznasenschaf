import config from '../../config'
import { Command } from '../command'
import { Message } from 'discord.js'

const getUser = async (message: Message, args: Array<string>) => {
  if (message.mentions.users?.first()) { return message.mentions.users.first() }

  await message.guild?.members?.resolve(args[0])?.user
}

/**
 * A fun command that posts a fake ban message about the given user.
 */
export const BanCommand: Command = {
  name: 'ban',
  description: 'Bans the given user, no really it does!',
  minArgs: 1,
  maxArgs: 1,
  requiredRoles: [config().roles.verified],
  usage: 'ban [user]',

  execute: async (message: Message, args: Array<string>) => {
    const user = await getUser(message, args)
    const replyText = user ? `✅ Ba\u200Bnned ${user.tag}` : 'Unable to find that user.'

    message.channel.send(replyText)
  },
}
