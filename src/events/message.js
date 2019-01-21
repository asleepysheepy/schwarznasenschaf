module.exports = (message, config, commands, handleCommand) => {
  if (message.content.startsWith(config.commands.prefix)) {
    handleCommand(message, commands, config.commands);
  }
};