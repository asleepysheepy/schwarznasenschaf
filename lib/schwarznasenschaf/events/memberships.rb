# frozen_string_literal: true

require "schwarznasenschaf/config"

module Schwarznasenschaf::Events
  module Memberships
    def self.on_member_join(event)
      member = event.member

      channel = event.server.channels.detect { |c| c.id == Schwarznasenschaf::Config::CHANNELS[:general] }
      channel.send(_join_message(member))

      log_message = "#{_log_message_base(member)} has joined the server."
      _log_event(log_message, event.server.channels)
    end

    def self.on_member_leave(event)
      log_message = "#{_log_message_base(event.member)} has left the server."

      _log_event(log_message, event.server.channels)
    end

    def self.on_member_ban(event)
      log_message = "#{_log_message_base(event.member)} has been banned the server."

      _log_event(log_message, event.server.channels)
    end

    def self.on_member_unban(event)
      log_message = "#{log_message_base event.member} has been unbanned the server."

      _log_event(log_message, event.server.channels)
    end

    private

    def self._join_message(member)
      rules = Schwarznasenschaf::Config::CHANNELS[:rules]

      "Welcome #{member.mention}!\n\n"\
      "Please confirm you've read the <##{rules}> and tell us how you identify."
    end

    def self._log_message_base(member)
      "#{member.distinct} with id `#{member.id}`"
    end

    def self._log_event(message, channels)
      channel = channels.detect { |c| c.id == Schwarznasenschaf::Config::LOGGING_CHANNELS[:membership] }

      channel.send(message)
    end
  end
end
