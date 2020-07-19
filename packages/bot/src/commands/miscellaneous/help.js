import Config from 'config'

export default class HelpCommand {
  constructor() {
    this.name = 'help'
    this.aliases = ['commands']
    this.description = 'List all of commands or info about a specific command.'
    this.maxArgs = 1
    this.requiredRoles = [Config.roles.verified]
    this.usage = `${Config.prefix}${this.name} <command>`
  }

  execute(message, args) {
    const commands = message.client.commandHandler.commands

    if (!args.length) {
      this.commandList(message, commands)
    } else {
      this.singleCommand(message, args, commands)
    }
  }

  commandList(message, commands) {
    const messagesToSend = []

    messagesToSend.push('Schwarznasenschaf commands:')
    messagesToSend.push(commands.map((command) => `\`${command.name}\``).join(', '))
    messagesToSend.push(`\nYou can send \`${Config.prefix}help [command name]\` to get info on a specific command!`)

    message.channel.send(messagesToSend, { split: true })
  }

  singleCommand(message, args, commands) {
    const [commandName] = args
    const command = commands.get(commandName) || commands.find((c) => c.aliases && c.aliases.includes(commandName))

    if (!command) {
      return `Unknown command: \`${commandName}\``
    }

    const messagesToSend = []

    messagesToSend.push(`Help for command: **${command.name}**\n`)
    messagesToSend.push(`Description: ${command.description}`)
    messagesToSend.push(`Usage: ${command.usage}`)

    message.channel.send(messagesToSend)
  }
}
