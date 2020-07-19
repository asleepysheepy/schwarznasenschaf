import Config from 'config'

export default class SudoCommand {
  constructor() {
    this.name = 'sudo'
    this.description = 'Lets any user run any command'
    this.minArgs = 1
    this.requiredRoles = [Config.roles.verified]
    this.usage = `${Config.prefix}${this.name} [command]`
  }

  execute(message) {
    message.channel.send(`${message.author.tag} is not in the sudoers file. This incident will be reported.`)
  }
}
