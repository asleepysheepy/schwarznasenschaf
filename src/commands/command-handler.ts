import Command from './command'
import commands from '../commands'
import config from '../config'
import { Collection, Message, Role, Snowflake } from 'discord.js'
import { Logger } from '../utils/logger'

const findCommand = (commandName: string): Command | undefined => {
  return commands.find((c) => c.name === commandName || c.aliases?.includes(commandName))
}

const checkRoles = (command: Command, memberRoles: Collection<Snowflake, Role>, message: Message): boolean => {
  if (!command.requiredRoles) { return true }

  const hasRoles = command.requiredRoles.every((role) => memberRoles.has(role))
  if (hasRoles) { return true }

  message.channel.send(`Missing required roles to run command: ${command.name}`)
  return false
}

const checkArgs = (command: Command, args: Array<string>, message: Message) => {
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

const checkConditions = (command: Command, message: Message, args: Array<string>): boolean => {
  const memberRoles = message.member?.roles?.cache ?? new Collection()

  if (!checkRoles(command, memberRoles, message)) { return false }
  if (!checkArgs(command, args, message)) { return false }

  return true
}

export const handleCommand = (message: Message): void => {
  if (!message.content.startsWith(config().prefix)) { return }
  if (message.author.bot) { return }

  const args = message.content.slice(config().prefix.length).split(/ +/)
  const commandName = args.shift()?.toLowerCase()
  if (!commandName) { return }
  Logger.info('Attempting to handle a command')

  const command = findCommand(commandName)
  if (!command) {
    Logger.info(`Attempted to execute the command ${commandName} but it was not found`)
    return
  }

  if (!checkConditions(command, message, args)) {
    Logger.info(`Attempted to execute command ${commandName} but the required conditions were not met`)
    return
  }
  try {
    command.execute(message, args)
  } catch (error) {
    message.channel.send(`An error ocurred executing command: ${commandName}`)
    Logger.error(`Attempted to exectue the command ${commandName} but the following error occured: ${error}`)
  }
}
