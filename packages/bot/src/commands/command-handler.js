import Config from 'config'
import fs from 'fs'
import { Collection } from 'discord.js'

export default class CommandHandler {
  constructor(client) {
    const parentDir = './src/commands'
    const directories = fs.readdirSync(parentDir).filter((file) => !file.endsWith('.js'))

    const commandFiles = directories.map((directory) =>
      fs.readdirSync(`${parentDir}/${directory}`).map((file) => `${directory}/${file}`),
    ).flat()

    this.commands = new Collection()

    commandFiles.forEach((file) => {
      import(`./${file}`).then(({default: Command}) => {
        const command = new Command()
        this.commands.set(command.name, command)
      }).catch((error) => console.error(`Failed to load command at: ${file}\n${error}`))
    })

    client.on('message', (message) => this.handle(message))
  }

  handle(message) {
    if (!message.content.startsWith(Config.prefix)) { return }
    if (message.author.bot) { return }

    const args = message.content.slice(Config.prefix.length).split(/ +/)
    const commandName = args.shift().toLowerCase()

    const command = this.commands.get(commandName)
      || this.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName))

    if (!command) { return }

    if (this._checkConditions(command, message, args)) {
      try {
        command.execute(message, args)
      } catch (error) {
        message.channel.send(command.rescue || `An error ocurred executing command: ${commandName}`)
        console.error(error)
      }
    }
  }

  _checkConditions(command, message, args) {
    if (!this._checkRoles(command, message.member.roles.keyArray(), message)) { return false }
    if (!this._checkArgs(command, args, message)) { return false }

    return true
  }

  _checkRoles(command, memberRoles, message) {
    if (!command.requiredRoles) { return true }

    const hasRoles = command.requiredRoles.every((role) => memberRoles.includes(role))

    if (hasRoles) { return true }

    message.channel.send(`Missing required roles to run command: ${command.name}`)
    return false
  }

  _checkArgs(command, args, message) {
    if (command.minArgs) {
      if (args.length < command.minArgs) {
        message.channel.send(`Too few args passed to command: ${command.name}.\nExpected: ${command.minArgs}, Got: ${args.length}.`)
        return false
      }
    }

    if (command.maxArgs) {
      if (args.length > command.maxArgs) {
        message.channel.send(`Too many args passed to command: ${command.name}.\nExpected: ${command.minArgs}, Got: ${args.length}.`)
        return false
      }
    }

    return true
  }
}
