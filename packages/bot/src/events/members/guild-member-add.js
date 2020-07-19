import Config from 'config'

export default class guildMemberAddEvent {
  constructor() {
    this.name = 'guildMemberAdd'
  }

  async handle(member) {
    let channel = member.guild.channels.get(Config.loggingChannels.memberships)
    channel.send(`${member.user.tag}, with id \`${member.user.id}\`, has joined the server.`)

    channel = member.guild.channels.get(Config.channels.welcome)
    channel.send(`Welcome ${member}!\n\nPlease confirm you've read the <#${Config.channels.rules}> and tell us how you identify.`)
  }
}
