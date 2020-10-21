import { Message, MessageEmbed } from 'discord.js'

export default async function createEmbed(message: Message): Promise<MessageEmbed> {
  const footerMessage = 'Schwarznasenschaf is crafted with love by Sleepy Sheepy#0179'
  const botAuthorAvatar = (await message.client.users.fetch('145696462959935488')).avatarURL()

  const icon = message.guild?.iconURL()
  const authorAvatar = message.author.avatarURL()

  const embed = new MessageEmbed()
    .setColor('#1c748e')
    .setTimestamp()
    .setURL('https://github.com/asleepysheepy/schwarznasenschaf')

  if (icon) { embed.setThumbnail(icon) }
  if (authorAvatar) { embed.setAuthor(`${message.author.tag}`, authorAvatar) }
  if (botAuthorAvatar) { embed.setFooter(footerMessage, botAuthorAvatar) }

  return embed
}
