# frozen_string_literal: true

module Schwarznasenschaf
  module Events
    module MemberJoinEvent
      extend Discordrb::EventContainer
      member_join do |event|
        member = event.member
        welcome_message = "Welcome #{member.mention}! "\
                          'Please confirm you\'ve read the '\
                          "<##{Support::Config::CHANNELS[:rules]}> "\
                          'and tell us how you identify.'

        new_member_role = event.server.roles.detect do |role|
          role.id == Support::Config::ROLES[:just_joined]
        end
        welcome_message_channel = event.server.channels.detect do |channel|
          channel.id == Support::Config::CHANNELS[:join_messages]
        end

        member.add_role new_member_role
        welcome_message_channel.send welcome_message
      end
    end
  end
end
