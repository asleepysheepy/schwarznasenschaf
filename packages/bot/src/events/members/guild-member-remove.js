import Config from 'config'

export default class guildMemberRemoveEvent {
  constructor() {
    this.name = 'guildMemberRemove'
  }

  async handle(member) {
    const channel = member.guild.channels.get(Config.loggingChannels.memberships)
    channel.send(`${member.user.tag}, with id \`${member.user.id}\`, has left the server.`)
  }
}
