import Command from '../command'
import commands from '../../commands'
import config from '../../config'
import { Message } from 'discord.js'

const commandList = (message: Message) => {
  const messagesToSend = []

  messagesToSend.push('Schwarznasenschaf commands:')
  messagesToSend.push(commands.map((command) => `\`${command.name}\``).join(', '))
  messagesToSend.push(`\nYou can send \`${config().prefix}help [command name]\` to get info on a specific command!`)

  message.channel.send(messagesToSend, { split: true })
}

const singleCommand = (message: Message, args: Array<string>) => {
  const [commandName] = args
  const command = commands.find((c) => {
    if (c.name === commandName) { return true }
    return c.aliases?.includes(commandName)
  })

  if (!command) {
    return `Unknown command: \`${commandName}\``
  }

  const messagesToSend = []

  messagesToSend.push(`Help for command: **${command.name}**\n`)
  messagesToSend.push(`Description: ${command.description}`)
  messagesToSend.push(`Usage: ${command.usage}`)

  message.channel.send(messagesToSend)
}

const HelpCommand: Command = {
  name: 'help',
  aliases: ['commands'],
  description: 'List all of commands or info about a specific command.',
  maxArgs: 1,
  requiredRoles: [config().roles.verified],
  usage: 'help <command>',

  execute: async (message: Message, args: Array<string>) => {
    if (!args.length) {
      commandList(message)
    } else {
      singleCommand(message, args)
    }
  },
}

export default HelpCommand
