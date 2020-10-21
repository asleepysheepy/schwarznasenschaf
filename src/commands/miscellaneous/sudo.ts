import Command from '../command'
import config from '../../config'
import { Message } from 'discord.js'

const SudoCommand: Command = {
  name: 'sudo',
  description: 'Lets any user run any command',
  minArgs: 1,
  requiredRoles: [config().roles.verified],
  usage: 'sudo [command]',

  execute: (message: Message) => {
    message.channel.send(`${message.author.tag} is not in the sudoers file. This incident will be reported.`)
  },
}

export default SudoCommand
