module.exports = {
  name: 'clear',
  description: 'Clears the x most recent messages.',
  usage: 'clear <num_messages> [user]',
  execute: (message, args, config) => {
    if (!message.member.roles.find((role) => role.name === config.permission)) return;

    const deleteAmount = parseInt(args[0]) + 1;
    message.channel.bulkDelete(deleteAmount).then((messages) => {
      message.channel.send(`${messages.size - 1} messages deleted.`).then((mess) => {
        setTimeout(() => {
          mess.delete();
        }, 5000);
      });
    });
  },
};