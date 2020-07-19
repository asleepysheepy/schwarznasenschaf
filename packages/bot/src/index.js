import CommandHandler from 'commands/command-handler'
import Config from 'config'
import Discord from 'discord.js'
import EventHandler from 'events/event-handler'

const client = new Discord.Client()
client.commandHandler = new CommandHandler(client)
client.eventHandler = new EventHandler(client)

client.login(Config.token)
