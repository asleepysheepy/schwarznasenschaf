import Event from '../event'
import config from '../../config'
import { GuildMember, TextChannel } from 'discord.js'

const GuildMemberRemoveEvent: Event = {
  name: 'guildMemberRemove',
  handle: async (member: GuildMember) => {
    const loggingChannelId = config().loggingChannels.memberships
    const channel = await member.guild.channels.resolve(loggingChannelId) as TextChannel
    channel.send(`${member.user.tag}, with id \`${member.user.id}\`, has left the server.`)
  },
}

export default GuildMemberRemoveEvent
