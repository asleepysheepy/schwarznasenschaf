import { Client, ClientOptions } from 'discord.js'
import { CommandHandler } from './commands/command-handler'
import { Events } from './events'
import { Logger } from './utils/logger'

/**
 * Registers all the event listeners used by Schaf.
 *
 * @param client - The Discord.js client instance
 */
function setupEvents(client: Client): void {
  Events.eventsList.forEach((event) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handle = async (...args: Array<any>) => await event.handle(...args, client)
    Logger.info(`Registering an handler for ${event.name} events.`)
    client.on(event.name, handle)
  })

  client.on('message', (message) => CommandHandler.handleCommand(message))
}

/**
 * The main function that starts Schaf.
 */
async function startSchaf(): Promise<void> {
  Logger.info('Welcome to Ba 🐑!')

  const clientOptions: ClientOptions = {
    messageCacheMaxSize: Infinity,
    messageCacheLifetime: 172800, // 48 hours
    messageSweepInterval: 3600, // 1 hour
    fetchAllMembers: true,
    partials: [
      'USER',
      'GUILD_MEMBER',
      'MESSAGE',
      'REACTION',
    ],
  }

  const client = new Client(clientOptions)
  setupEvents(client)

  try {
    await client.login(process.env['BOT_TOKEN'])
  } catch (error) {
    Logger.error('Unable to log in to discord, did you set your bot token?')
    process.exit()
  }

  Logger.info('Successfully logged in to Discord.')
}

startSchaf().catch((error) => {
  Logger.error(`Unable to start Schaf Bot.\n${error}`)
  process.exit()
})
