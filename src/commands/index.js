const fs = require('fs');
const Collection = require('discord.js').Collection;

const loadCommands = () => {
  const commands = new Collection();
  const commandFiles = fs.readdirSync('./src/commands').filter((file) => {
    return file.endsWith('.js') && !file.startsWith('index');
  });

  for (const file of commandFiles) {
    const command = require(`./${file}`);
    commands.set(command.name, command);
  }

  return commands;
};

const handleCommand = (message, commands, config) => {
  const args = message.content.slice(config.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (commands.has(commandName)) {
    try {
      commands.get(commandName).execute(message, args);
    }
    catch (error) {
      message.reply(config.errorMessage);
    }
  }
};

module.exports = {
  loadCommands,
  handleCommand,
};