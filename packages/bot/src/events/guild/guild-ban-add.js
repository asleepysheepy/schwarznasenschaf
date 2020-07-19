import Config from 'config'

export default class guildBanAddEvent {
  constructor() {
    this.name = 'guildBanAdd'
  }

  async handle(guild, user) {
    const channel = guild.channels.get(Config.loggingChannels.memberships)
    channel.send(`${user.tag}, with id \`${user.id}\`, has been banned.`)
  }
}
