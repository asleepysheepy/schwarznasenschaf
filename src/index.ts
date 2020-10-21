import * as CommandHandler from './commands/command-handler'
import events from './events'
import { Client } from 'discord.js'

const client = new Client()

// Set up all event listeners in ./events
events.forEach((event) => {
  const handle = async (...args: Array<any>) => await event.handle(...args, client) // eslint-disable-line @typescript-eslint/no-explicit-any

  client.on(event.name, handle)
})

// Set up the event listen for commands
client.on('message', (message) => CommandHandler.handleCommand(message))

client.login(process.env['DISCORD_TOKEN'])
