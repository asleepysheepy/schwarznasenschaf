import config from '../../config'
import { Command } from '../command'
import { Message } from 'discord.js'

/**
 * Posts information about the guild
 */
export const ServerInfoCommand: Command = {
  name: 'server_info',
  aliases: ['serverinfo', 'server-info', 'guild_info', 'guildinfo', 'guild-info'],
  description: 'Gets some info about the server',
  maxArgs: 0,
  requiredRoles: [config().roles.verified],
  usage: 'server_info',

  execute: (message: Message) => {
    message.channel.send('TODO: fix')
  },
}
