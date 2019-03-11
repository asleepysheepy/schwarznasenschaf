# frozen_string_literal: true

module Schwarznasenschaf
  module Events
    module MemberLeaveEvent
      extend Discordrb::EventContainer

      member_leave do |event|
        member = event.member
        leave_message = "#{member.mention} has left the server."

        leave_message_channel = event.server.channels.detect do |channel|
          channel.id == Support::Config::CHANNELS[:leave_messages]
        end

        leave_message_channel.send leave_message
      end
    end
  end
end
