import Event from '../event'
import config from '../../config'
import { GuildMember, TextChannel } from 'discord.js'

const GuildMemberAddEvent: Event = {
  name: 'guildMemberAdd',
  handle: async (member: GuildMember) => {
    let channel = await member.guild.channels.resolve(config().loggingChannels.memberships) as TextChannel
    channel.send(`${member.user.tag}, with id \`${member.user.id}\`, has joined the server.`)

    channel = await member.guild.channels.resolve(config().channels.welcome) as TextChannel
    channel.send(`Welcome ${member}!\n\nPlease confirm you've read the <#${config().channels.rules}> and tell us how you identify.`)
  },
}

export default GuildMemberAddEvent
