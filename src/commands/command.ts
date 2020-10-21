import { Message } from 'discord.js'

export default interface Command {
  name: string,
  aliases?: Array<string>,
  description: string,
  maxArgs?: number,
  minArgs?: number,
  requiredRoles?: Array<string>,
  usage: string,
  execute(message: Message, args?: Array<string>): void,
}
