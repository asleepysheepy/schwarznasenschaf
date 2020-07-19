import { RichEmbed } from 'discord.js'

export default function createEmbed(message) {
  return new RichEmbed()
    .setColor('#1c748e')
    .setThumbnail(message.guild.iconURL)
    .setTimestamp()
    .setURL('https://github.com/flutterflies/schwarznasenschaf')
    .setAuthor(
      `${message.author.tag}`,
      message.author.avatarURL,
    )
    .setFooter(
      'Schwarznasenschaf is crafted with love by Sleepy Sheepy#0179',
      message.client.users.get('145696462959935488').avatarURL,
    )
}
