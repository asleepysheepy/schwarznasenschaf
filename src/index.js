const Discord = require('discord.js');

const config = require('./config/config.json');

const handleMemberJoin = require('./events/member-join');
const handleMemberLeave = require('./events/member-leave');

const client = new Discord.Client();

client.on('guildMemberAdd', (member) => handleMemberJoin(member, config.welcome));
client.on('guildMemberRemove', (member) => handleMemberLeave(member, config.leave));
client.on('ready', () => client.user.setActivity(config.activity.name, { type: config.activity.type }));

client.login(config.token);
