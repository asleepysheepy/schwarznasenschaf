import * as CommandHandler from './commands/command-handler'
import events from './events'
import { Client, ClientOptions } from 'discord.js'
import { Logger } from './utils/logger'

const hoursToSeconds = (hours: number): number => hours * 60 * 60

const clientOptions: ClientOptions = {
  messageCacheMaxSize: Infinity,
  messageCacheLifetime: hoursToSeconds(48),
  messageSweepInterval: hoursToSeconds(1),
  fetchAllMembers: true,
  partials: [
    'USER',
    'GUILD_MEMBER',
    'MESSAGE',
    'REACTION',
  ],
}

const client = new Client(clientOptions)

// Set up all event listeners in ./events
events.forEach((event) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handle = async (...args: Array<any>) => {
    Logger.info(`Handling a '${event.name}' event.`)
    await event.handle(...args, client)
  }

  Logger.info(`Registering an event handler for ${event.name} events.`)
  client.on(event.name, handle)
})

// Set up the event listen for commands
client.on('message', (message) => CommandHandler.handleCommand(message))

client.login(process.env['DISCORD_TOKEN'])
