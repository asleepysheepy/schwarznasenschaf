function generalHelp(message) {
  const { commands } = message.client;
  const reply = [];

  reply.push('Here is a list of all TPDB commands you have permission to use.');
  commands.forEach((command) => {
    if (message.member.roles.find((role) => role.name === command.permission)) {
      reply.push(`**${command.name}:** ${command.description}`);
    }
  });

  if (reply.length === 1) {
    return ['There are currently no TPDB commands you have permission to use. :c'];
  }

  return reply;
}

function helpForCommand(message, commandName) {
  const { commands } = message.client;
  const command = commands.get(commandName) || commands.find(c => c.aliases && c.aliases.includes(commandName));

  if (!message.member.roles.find((role) => role.name === command.permission)) {
    return ['Unfortunately you do not have permission to use the command :c'];
  }

  const reply = [];
  reply.push(`Showing help for **${command.name}**\n`);
  reply.push(`Usage: - \`${command.usage}\``);
  reply.push(`Description: - ${command.description}`);

  return reply;
}

module.exports = {
  name: 'help',
  description: 'Gives info about commands',
  usage: 'help [command]',
  execute: (message, args) => {
    const reply = !args.length ? generalHelp(message) : helpForCommand(message, args[0]);

    message.channel.send(reply);
  },
};