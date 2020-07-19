import Config from 'config'
import { bulkDeleteMessages, sendAndDeleteMessage } from 'utils/commands'

export default class ClearCommand {
  constructor() {
    this.name = 'clear'
    this.description = 'Clears the last [x] messages from the channel'
    this.maxArgs = 1
    this.minArgs = 1
    this.requiredRoles = [Config.roles.modTeam]
    this.usage = `${Config.prefix}${this.name} [number]`
  }

  execute(message, args) {
    if (args[0]) {
      const numberMessagesToDelete = parseInt(args[0])

      if (Number.isNaN(numberMessagesToDelete)) {
        message.channel.send(`${args[0]} is not a number`)
        return
      }

      if (bulkDeleteMessages(message.channel, numberMessagesToDelete)) {
        sendAndDeleteMessage(`Successfully deleted ${numberMessagesToDelete} messages`, message.channel, 5)
      }
    }
  }
}
