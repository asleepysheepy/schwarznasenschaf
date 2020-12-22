import { Client } from 'discord.js'
import { Commands } from '../../commands'
import { Event } from '../event'

/**
 * Fired when the bot's "ready" event is triggered.
 *
 * Used for:
 *  - Setting the bot's activity.
 */
export const ReadyEvent: Event = {
  name: 'ready',
  handle: async (client: Client) => {
    client.user?.setActivity(`${Commands.COMMAND_PREFIX}help`, { type: 'LISTENING' })
  },
}
