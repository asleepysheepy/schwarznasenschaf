# frozen_string_literal: true

module Schwarznasenschaf
  module Commands
    module Verify
      extend Discordrb::Commands::CommandContainer

      command :verify do |event, *args|
        can_use = Commands.sender_has_role? event.author, :mod_team
        return Support::Config::NO_PERMISSION_MESSAGE unless can_use

        user = event.message.mentions.first

        set_roles user, event.server
        send_bot_channel_messages user, event.server
        send_general_channel_messages user, event.server

        return if args.last.to_i.zero?

        result = Commands.bulk_delete event.channel, args.last.to_i
        Commands.send_and_delete event.channel, result
      end

      def self.set_roles(user, server)
        member = server.member user.id

        role_to_add = server.roles.detect do |role|
          role.id == Support::Config::ROLES[:verified]
        end
        role_to_remove = server.roles.detect do |role|
          role.id == Support::Config::ROLES[:just_joined]
        end

        member.add_role role_to_add
        member.remove_role role_to_remove
      end

      def self.send_bot_channel_messages(user, server)
        bots_channel = server.channels.detect do |channel|
          channel.id == Support::Config::CHANNELS[:bots]
        end

        bots_message = "#{user.mention} you can assign yourself roles here: "\
                       "https://rp.kat.cafe/s/#{server.id}"

        bots_channel.send bots_message
      end

      def self.send_general_channel_messages(user, server)
        general_channel = server.channels.detect do |channel|
          channel.id == Support::Config::CHANNELS[:general]
        end

        general_message = "Welcome #{user.mention}!"

        general_channel.send general_message
      end
    end
  end
end
