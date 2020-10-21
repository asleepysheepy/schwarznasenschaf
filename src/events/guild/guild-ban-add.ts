import Event from '../event'
import config from '../../config'
import { Guild, TextChannel, User } from 'discord.js'

const GuildBanAddEvent: Event = {
  name: 'guildBanAdd',
  handle: (guild: Guild, user: User) => {
    const loggingChannelId = config().loggingChannels.memberships
    const channel = guild.channels.resolve(loggingChannelId) as TextChannel
    channel.send(`${user.tag}, with id \`${user.id}\`, has been banned.`)
  },
}

export default GuildBanAddEvent
