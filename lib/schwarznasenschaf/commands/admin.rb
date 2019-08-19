# frozen_string_literal: true

module Schwarznasenschaf
  module Commands
    module Admin
      module Attributes
        ALL = [
          CLEAR = {
            description: "Clears the last [x] messages from the channel",
            help_available: true,
            max_args: 1,
            min_args: 1,
            rescue: "An  error occured while trying to execute this command.",
            required_roles: [Schwarznasenschaf::Config::ROLES[:mod_team]],
            usage: "clear [number]"
          }.freeze,

          VERIFY = {
            description: "Verifies the mentioned user and optionally clears chat",
            help_available: true,
            max_args: 2,
            min_args: 1,
            rescue: "An  error occured while trying to execute this command.",
            required_roles: [Schwarznasenschaf::Config::ROLES[:mod_team]],
            usage: "verify [mentioned_user] <messages_to_clear>"
          }.freeze
        ].freeze
      end

      def self.clear(event, num_to_clear)
        result = _bulk_delete(event.channel, num_to_clear.to_i)
        _send_and_delete(event.channel, result)
      end

      def self.verify(event, args)
        user = event.message.mentions.first
        return unless user

        _set_roles(user, event.server)
        _send_bot_channel_message(user, event.server)
        _send_general_channel_message(user, event.server)

        num_to_clear = args.last.to_i
        return if num_to_clear.zero?

        clear(event, num_to_clear)
      end

      private

      def self._set_roles(user, server)
        member = server.member(user.id)
        role = server.roles.detect { |r| r.id == Schwarznasenschaf::Config::ROLES[:verified] }

        member.add_role(role)
      end

      def self._send_bot_channel_message(user, server)
        channel = server.channels.detect { |c| c.id == Schwarznasenschaf::Config::CHANNELS[:bots] }
        message = "#{user.mention} you can assign yourself roles here: https://roleypoly.com/s/#{server.id}"

        channel.send(message)
      end

      def self._send_general_channel_message(user, server)
        channel = server.channels.detect { |c| c.id == Schwarznasenschaf::Config::CHANNELS[:general] }
        message = "Welcome #{user.mention}!"

        channel.send(message)
      end

      def self._bulk_delete(channel, number_to_delete)
        failed_message = "Unable to delete messages"
        return failed_message unless number_to_delete.between?(1, 99)

        num_deleted = channel.prune(number_to_delete + 1)
        return failed_message if num_deleted < 1

        "Successfully deleted #{num_deleted - 1} messages"
      end

      def self._send_and_delete(channel, message_text)
        sent_message = channel.send(message_text)

        Thread.new do
          sleep 5
          sent_message.delete
        end
        nil
      end
    end
  end
end
