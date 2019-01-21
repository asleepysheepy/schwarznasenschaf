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
  const commandConfig = config[commandName];

  if (commands.has(commandName)) {
    try {
      commands.get(commandName).execute(message, args, commandConfig);
    }
    catch (error) {
      message.reply(config.errorMessage);
    }
  }
  else {
    message.channel.send(config.unknownMessage);
  }
};

module.exports = {
  loadCommands,
  handleCommand,
};