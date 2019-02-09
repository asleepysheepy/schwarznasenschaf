const config = require('../config/config.json').commands.clear;
const utils = require('../utils');

module.exports = {
  name: 'clear',
  description: 'Clears the x most recent messages.',
  usage: 'clear <num_messages>',
  permission: config.permission,
  execute: (message, args) => {
    if (!message.member.roles.find((role) => role.name === config.permission)) return;

    const deleteAmount = parseInt(args[0]);
    utils.deleteMessages(message.channel, deleteAmount);
  },
};