import Config from 'config'

export default class BanCommand {
  constructor() {
    this.name = 'ban'
    this.description = 'Bans the given user, no really it does!'
    this.minArgs = 1
    this.maxArgs = 1
    this.requiredRoles = [Config.roles.verified]
    this.usage = `${Config.prefix}${this.name} [user]`
  }

  execute(message, args) {
    const user = this.getUser(message, args)
    console.log(message.channel.rateLimitPerUser)

    if (!user) {
      message.channel.send('Unable to find that user.')
    }

    message.channel.send(`✅ Ba\u200Bnned ${user.tag}`)
  }

  getUser(message, args) {
    if (message.mentions.users.size > 0) {
      return message.mentions.users.first()
    }

    return message.guild.members.get(args[0]).user
  }
}
