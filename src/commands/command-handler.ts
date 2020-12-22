import { Collection, Message, Role, Snowflake } from 'discord.js'
import { Command } from './command'
import { Commands } from './'
import { Logger } from '../utils/logger'

/**
 * Looks up a command object from a given string.
 *
 * @param commandName the name (or alias) of the command to look up
 */
const findCommand = (commandName: string): Command | undefined => {
  return Commands.commandsList.find((c) => c.name === commandName || c.aliases?.includes(commandName))
}

/**
 * Checks that the user has the roles required to run the command.
 *
 * @param command The command being executed.
 * @param memberRoles The roles the user has.
 * @param message The message object with the command
 */
const checkRoles = (command: Command, memberRoles: Collection<Snowflake, Role>, message: Message): boolean => {
  if (!command.requiredRoles) { return true }

  const hasRoles = command.requiredRoles.every((role) => memberRoles.has(role))
  if (hasRoles) { return true }

  message.channel.send(`Missing required roles to run command: ${command.name}`)
  return false
}

/**
 * Checks that the correct number of arguments was passed to the command.
 *
 * @param command The command being executed.
 * @param args The arguments passed to the command
 * @param message The message object with the command
 */
const checkArgs = (command: Command, args: Array<string>, message: Message): boolean => {
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

/**
 * Check that all possible conditions are met for the executed command.
 *
 * @param command The command being executed.
 * @param args The arguments passed to the command
 * @param message The message object with the command
 */
const checkConditions = (command: Command, message: Message, args: Array<string>): boolean => {
  const memberRoles = message.member?.roles?.cache ?? new Collection()

  if (!checkRoles(command, memberRoles, message)) { return false }
  if (!checkArgs(command, args, message)) { return false }

  return true
}

/**
 * Determines a command from a given message and executes it.
 *
 * @param message The message which comtains the command.
 */
const handleCommand = async (message: Message): Promise<void> => {
  if (!message.content.startsWith(Commands.COMMAND_PREFIX)) { return }
  if (message.author.bot) { return }

  const args = message.content.slice(Commands.COMMAND_PREFIX.length).split(/ +/)
  const commandName = args.shift()?.toLowerCase()
  if (!commandName) { return }

  const command = findCommand(commandName)
  if (!command) { return }

  if (!checkConditions(command, message, args)) { return }

  try {
    await command.execute(message, args)
  } catch (error) {
    message.channel.send(`An error ocurred executing command: ${commandName}`)
    Logger.error(`Attempted to exectue the command ${commandName} but the following error occured: ${error}`)
  }
}

export const CommandHandler = {
  handleCommand,
}
