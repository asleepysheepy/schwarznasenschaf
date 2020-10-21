import Command from '../command'
import config from '../../config'
import { Message, TextChannel } from 'discord.js'
import { bulkDeleteMessages, sendAndDeleteMessage } from '../../utils/commands'

const ClearCommand: Command = {
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
      if (bulkDeleteMessages(channel, numberMessagesToDelete)) {
        sendAndDeleteMessage(`Successfully deleted ${numberMessagesToDelete} messages`, channel, 5)
      }
    }
  },
}

export default ClearCommand
