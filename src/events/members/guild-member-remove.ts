import config from '../../config'
import { Event } from '../event'
import { GuildMember, TextChannel } from 'discord.js'

/**
 * Fired when a guild member leaves the guild.
 *
 * Used for:
 *  - Logging a message that the user has left
 */
export const GuildMemberRemoveEvent: Event = {
  name: 'guildMemberRemove',
  handle: async (member: GuildMember) => {
    const loggingChannelId = config().loggingChannels.memberships
    const channel = await member.guild.channels.resolve(loggingChannelId) as TextChannel
    channel.send(`${member.user.tag}, with id \`${member.user.id}\`, has left the server.`)
  },
}
