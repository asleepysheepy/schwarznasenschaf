import config from '../../config'
import { Event } from '../event'
import { GuildMember, TextChannel } from 'discord.js'

/**
 * Fired when a new member joins a guild.
 *
 * Used for:
 *  - Logging a message that the user has joined
 *  - Posting a welcome message to the new user
 */
export const GuildMemberAddEvent: Event = {
  name: 'guildMemberAdd',
  handle: async (member: GuildMember) => {
    let channel = await member.guild.channels.resolve(config().loggingChannels.memberships) as TextChannel
    channel.send(`${member.user.tag}, with id \`${member.user.id}\`, has joined the server.`)

    channel = await member.guild.channels.resolve(config().channels.welcome) as TextChannel
    channel.send(`Welcome ${member}!\n\nPlease let us know how you identify and we'll get you verified.`)
  },
}
