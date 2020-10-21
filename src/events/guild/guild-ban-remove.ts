import Event from '../event'
import config from '../../config'
import { Guild, TextChannel, User } from 'discord.js'

const GuildBanRemoveEvent: Event = {
  name: 'guildBanRemove',
  handle: async (guild: Guild, user: User) => {
    const loggingChannelId = config().loggingChannels.memberships
    const channel = guild.channels.resolve(loggingChannelId) as TextChannel
    channel.send(`${user.tag}, with id \`${user.id}\`, has been unbanned.`)
  },
}

export default GuildBanRemoveEvent
