import config from '../../config'
import { Event } from '../event'
import { Guild, TextChannel, User } from 'discord.js'

/**
 * Fired when a user is banned from a guild.
 *
 * Used for:
 *  - Logging a message that the user was banned.
 */
export const GuildBanAddEvent: Event = {
  name: 'guildBanAdd',
  handle: (guild: Guild, user: User) => {
    const loggingChannelId = config().loggingChannels.memberships
    const channel = guild.channels.resolve(loggingChannelId) as TextChannel
    channel.send(`${user.tag}, with id \`${user.id}\`, has been banned.`)
  },
}
