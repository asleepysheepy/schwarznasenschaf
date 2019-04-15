# frozen_string_literal: true

module Schwarznasenschaf::Admin::Events::MemberJoinEvent
  extend Discordrb::EventContainer

  member_join do |event|
    member = event.member
    welcome_message = "Welcome #{member.mention}! "\
                      'Please confirm you\'ve read the '\
                      "<##{Schwarznasenschaf::Config::CHANNELS[:rules]}> "\
                      'and tell us how you identify.'

    welcome_message_channel = event.server.channels.detect do |channel|
      channel.id == Schwarznasenschaf::Config::CHANNELS[:join_messages]
    end

    welcome_message_channel.send welcome_message
  end
end
