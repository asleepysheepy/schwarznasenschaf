import config from '../../config'
import { Command } from '../command'
import { Commands } from '../../commands'
import { Message } from 'discord.js'

/**
 * Prints a list of all Schaf's commands.
 *
 * @param message The message used to run the command
 */
const commandList = (message: Message) => {
  const messagesToSend = []

  messagesToSend.push('Schwarznasenschaf commands:')
  messagesToSend.push(Commands.commandsList.map((command) => `\`${command.name}\``).join(', '))
  messagesToSend.push(`\nYou can send \`${Commands.COMMAND_PREFIX}help [command name]\` to get info on a specific command!`)

  message.channel.send(messagesToSend, { split: true })
}

/**
 * Prints the help message for a single Schaf command
 *
 * @param message The message used to run the command
 * @param args The arguments passed to the command, should contain
 *   the command to print the help message for
 */
const singleCommand = (message: Message, args: Array<string>) => {
  const [commandName] = args
  const command = Commands.commandsList.find((c) => {
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

/**
 * Prints help messages for explaining how to use different Schaf commands
 */
export const HelpCommand: Command = {
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
