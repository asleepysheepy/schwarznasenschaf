import BanCommand from './miscellaneous/ban'
import ChannelInfoCommand from './info/channel'
import ClearCommand from './admin/clear'
import HelpCommand from './miscellaneous/help'
import RoleInfoCommand from './info/role'
import ServerInfoCommand from './info/server'
import SudoCommand from './miscellaneous/sudo'
import UserInfoCommand from './info/user'
import VerifyCommand from './admin/verify'

export default [
  ClearCommand,
  VerifyCommand,
  ChannelInfoCommand,
  RoleInfoCommand,
  ServerInfoCommand,
  UserInfoCommand,
  BanCommand,
  HelpCommand,
  SudoCommand,
]
