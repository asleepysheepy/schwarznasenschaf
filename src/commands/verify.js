const config = require('../config/config.json').commands.verify;

function roles(message) {
  const member = message.mentions.members.first();
  const guild = message.guild;
  const roleToAdd = guild.roles.find((role) => role.name === config.roleToAdd);
  const roleToRemove = guild.roles.find((role) => role.name === config.roleToRemove);

  member.addRole(roleToAdd);
  member.removeRole(roleToRemove);
}

function welcomeMessages(message) {
  const member = message.mentions.members.first();
  const guild = message.guild;

  const botsChannel = guild.channels.get(config.botsChannelId);
  const botsMessage = config.botsChannelMessage.replace('<user>', `${member.user}`);
  botsChannel.send(botsMessage);

  const generalChannel = guild.channels.get(config.generalChannelId);
  const generalMessage = config.generalChannelMessage.replace('<user>', `${member.user}`);
  generalChannel.send(generalMessage);
}

function deleteMessages(channel, deleteAmount) {
  channel.bulkDelete(deleteAmount).then((messages) => {
    channel.send(`${messages.size - 1} messages deleted.`).then((mess) => {
      setTimeout(() => {
        mess.delete();
      }, 5000);
    });
  });
}

module.exports = {
  name: 'verify',
  description: 'Verifies the mentioned user',
  usage: 'verify <@user> [num_message_to_delete]',
  permission: config.permission,
  execute: (message, args) => {
    if (!message.member.roles.find((role) => role.name === config.permission)) return;

    roles(message);
    welcomeMessages(message);

    if(args[1] && parseInt(args[1])) {
      setTimeout(() => {
        deleteMessages(message.channel, parseInt(args[1]) + 1);
      }, 5000);
    }
  },
};
