import Event from '../event'
import config from '../../config'
import { Client } from 'discord.js'

const Ready: Event = {
  name: 'ready',
  handle: async (client: Client) => {
    client.user?.setActivity(`${config().prefix}help`, { type: 'LISTENING' })
  },
}

export default Ready
