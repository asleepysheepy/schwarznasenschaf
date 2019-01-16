module.exports = (member, welcomeData) => {
  const channel = member.guild.channels.get(welcomeData.channelId);
  const message = welcomeData.messageTemplate.replace('<user>', `${member.user}`);
  channel.send(message);
};