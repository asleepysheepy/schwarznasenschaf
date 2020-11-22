import GuildBanAddEvent from './guild/guild-ban-add'
import GuildBanRemoveEvent from './guild/guild-ban-remove'
import GuildMemberAddEvent from './members/guild-member-add'
import GuildMemberRemoveEvent from './members/guild-member-remove'
import ReadyEvent from './miscellaneous/ready'

export default [
  GuildBanAddEvent,
  GuildBanRemoveEvent,
  GuildMemberAddEvent,
  GuildMemberRemoveEvent,
  ReadyEvent,
]
