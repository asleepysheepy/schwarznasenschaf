import Config from 'config'

export default class guildBanRemoveEvent {
  constructor() {
    this.name = 'guildBanRemove'
  }

  async handle(guild, user) {
    const channel = guild.channels.get(Config.loggingChannels.memberships)
    channel.send(`${user.tag}, with id \`${user.id}\`, has been unbanned.`)
  }
}
