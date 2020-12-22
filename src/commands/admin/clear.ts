import config from '../../config'
import { Command } from '../command'
import { CommandUtils } from '../../utils/commands'
import { Message, TextChannel } from 'discord.js'

/**
 * Util command to bluk clear a number of messages form the channel
 */
export const ClearCommand: Command = {
  name: 'clear',
  description: 'Clears the last [x] messages from the channel',
  maxArgs: 1,
  minArgs: 1,
  requiredRoles: [config().roles.modTeam],
  usage: 'clear [number]',

  execute: (message: Message, args: Array<string>) => {
    if (args[0]) {
      const numberMessagesToDelete = parseInt(args[0])

      if (Number.isNaN(numberMessagesToDelete)) {
        message.channel.send(`${args[0]} is not a number`)
        return
      }

      const channel = message.channel as TextChannel
      if (CommandUtils.bulkDeleteMessages(channel, numberMessagesToDelete)) {
        CommandUtils.sendAndDeleteMessage(`Successfully deleted ${numberMessagesToDelete} messages`, channel, 5)
      }
    }
  },
}
