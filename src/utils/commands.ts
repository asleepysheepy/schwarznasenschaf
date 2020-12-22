import { TextChannel } from 'discord.js'

/**
 * Bulk deletes messages from a channel.
 *
 * @param channel the channel to delete messages from
 * @param messagesToDelete the number of messages to delete
 */
async function bulkDeleteMessages(channel: TextChannel, messagesToDelete: number): Promise<boolean> {
  const failedMessage = 'Unable to delete messages'
  if (messagesToDelete < 1 || messagesToDelete > 99) {
    channel.send(`${failedMessage}`)
    return false
  }

  return await channel.bulkDelete(messagesToDelete + 1, true)
    .then((deletedMessages) => {
      if (deletedMessages.size > 0) {
        return true
      } else {
        channel.send(`${failedMessage}`)
        return false
      }
    })
    .catch(() => {
      channel.send(`${failedMessage}`)
      return false
    })
}

/**
 * Sends a message to a given channel, then deletes that message again after a given timeout.
 *
 * @param messageText The text of the message to be sent
 * @param channel The channel to send the message to
 * @param delay The delay, in seconds, before the message is deleted
 */
function sendAndDeleteMessage(messageText: string, channel: TextChannel, delay: number): void {
  channel.send(messageText).then((message) => message.delete({ timeout: delay * 1000 }))
}

export const CommandUtils = {
  bulkDeleteMessages,
  sendAndDeleteMessage,
}
