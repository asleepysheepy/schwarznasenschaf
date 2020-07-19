import Config from 'config'
import { bulkDeleteMessages, sendAndDeleteMessage } from 'utils/commands'

export default class VerifyCommand {
  constructor() {
    this.name = 'verify'
    this.description = 'Verifies the mentioned user and optionally clears chat'
    this.maxArgs = 2
    this.minArgs = 1
    this.requiredRoles = [Config.roles.modTeam]
    this.usage = `${Config.prefix}${this.name} [mentioned_user] <messages_to_clear>`
  }

  execute(message, args) {
    const member = message.mentions.members.first()
    if (!member) {
      message.channel.send('No valid user given')
      return
    }

    if (member.roles.has(Config.roles.verified)) {
      message.channel.send(`${member.user.tag} is already verified`)
      return
    }

    this.setRoles(member, message)
    this.sendMessages(member, message)
    this.deleteMessages(message, args)
  }

  setRoles(member, message) {
    member.addRole(message.guild.roles.get(Config.roles.verified))
  }

  sendMessages(member, message) {
    let channel = message.guild.channels.get(Config.channels.bots)
    channel.send(`${member.user} you can assign yourself roles here: https://roleypoly.com/s/${message.guild.id}`)

    channel = message.guild.channels.get(Config.channels.general)
    channel.send(`Welcome ${member.user}`)
  }

  deleteMessages(message, args) {
    if (args[1]) {
      const numberMessagesToDelete = parseInt(args[1])

      if (Number.isNaN(numberMessagesToDelete)) {
        message.channel.send(`${args[1]} is not a number`)
        return
      }

      if (bulkDeleteMessages(message.channel, numberMessagesToDelete)) {
        sendAndDeleteMessage('', message.channel, 5)
      }
    }
  }
}
