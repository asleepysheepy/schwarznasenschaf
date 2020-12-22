import { GuildBanAddEvent } from './guild/guild-ban-add'
import { GuildBanRemoveEvent } from './guild/guild-ban-remove'
import { GuildMemberAddEvent } from './members/guild-member-add'
import { GuildMemberRemoveEvent } from './members/guild-member-remove'
import { ReadyEvent } from './miscellaneous/ready'

const eventsList = [
  GuildBanAddEvent,
  GuildBanRemoveEvent,
  GuildMemberAddEvent,
  GuildMemberRemoveEvent,
  ReadyEvent,
]

export const Events = {
  eventsList,
}
