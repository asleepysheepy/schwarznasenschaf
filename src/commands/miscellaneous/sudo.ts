import config from '../../config'
import { Command } from '../command'
import { Message } from 'discord.js'

/**
 * A fun command that just prints a message back to the user telling them they
 * are not able to use sudo.
 */
export const SudoCommand: Command = {
  name: 'sudo',
  description: 'Lets any user run any command',
  minArgs: 1,
  requiredRoles: [config().roles.verified],
  usage: 'sudo [command]',

  execute: (message: Message) => {
    message.channel.send(`${message.author.tag} is not in the sudoers file. This incident will be reported.`)
  },
}
