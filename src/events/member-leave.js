module.exports = (member, leaveData) => {
  const channel = member.guild.channels.get(leaveData.channelId);
  const message = leaveData.messageTemplate.replace('<user>', `${member.user}`);
  channel.send(message);
};