# frozen_string_literal: true

require "schwarznasenschaf/commands/admin"
require "schwarznasenschaf/commands/info"
require "schwarznasenschaf/commands/miscellaneous"

module Schwarznasenschaf
  module Commands
    extend Discordrb::Commands::CommandContainer

    command(:clear, Admin::Attributes::CLEAR) { |event, num_to_clear| Admin.clear event, num_to_clear }
    command(:verify, Admin::Attributes::VERIFY) { |event, *args| Admin.verify event, args }

    command(:channel_info, Info::Attributes::CHANNEL) { |event, channel_id| Info.channel event, channel_id }
    command(:role_info, Info::Attributes::ROLE) { |event, role_name| Info.role event, role_name }
    command(:server_info, Info::Attributes::SERVER) { |event| Info.server event }
    command(:user_info, Info::Attributes::USER) { |event, user_id| Info.user event, user_id }

    command(:ban, Miscellaneous::Attributes::BAN) { |event| Miscellaneous.ban event }
  end
end
