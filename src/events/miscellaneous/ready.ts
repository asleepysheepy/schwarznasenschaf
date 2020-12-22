import config from '../../config'
import { Client } from 'discord.js'
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
    client.user?.setActivity(`${config().prefix}help`, { type: 'LISTENING' })
  },
}
