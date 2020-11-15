import { TextChannel } from 'discord.js'

export async function bulkDeleteMessages(channel: TextChannel, messagesToDelete: number): Promise<boolean> {
  const failedMessage = 'Unable to delete messages'
  if (messagesToDelete < 1 || messagesToDelete > 99) {
    channel.send(`${failedMessage} 1`)
    return false
  }

  return await channel.bulkDelete(messagesToDelete + 1, true)
    .then((deletedMessages) => {
      if (deletedMessages.size > 0) {
        return true
      } else {
        channel.send(`${failedMessage} 2`)
        return false
      }
    })
    .catch(() => {
      channel.send(`${failedMessage} 3`)
      return false
    })
}

export function sendAndDeleteMessage(messageText: string, channel: TextChannel, delay: number): void {
  channel.send(messageText).then((message) => message.delete({ timeout: delay * 1000 }))
}
