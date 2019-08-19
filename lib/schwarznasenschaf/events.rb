# frozen_string_literal: true

require "schwarznasenschaf/events/memberships"
require "schwarznasenschaf/events/miscellaneous"

module Schwarznasenschaf
  module Events
    extend Discordrb::EventContainer

    member_join { |event| Memberships.on_member_join event }
    member_leave { |event| Memberships.on_member_leave event }

    ready { |event| Miscellaneous.on_ready event }

    user_ban { |event| Memberships.on_member_ban event }
    user_unban { |event| Memberships.on_member_unban event }
  end
end
