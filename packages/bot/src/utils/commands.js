export function bulkDeleteMessages(channel, numberMessagesToDelete) {
  const failedMessage = 'Unable to delete messages'
  if (numberMessagesToDelete < 1 || numberMessagesToDelete > 99) {
    channel.send(`${failedMessage} 1`)
    return false
  }

  return channel.bulkDelete(numberMessagesToDelete + 1, true)
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

export function sendAndDeleteMessage(messageText, channel, delay) {
  channel.send(messageText).then((message) => message.delete(delay * 1000))
}
