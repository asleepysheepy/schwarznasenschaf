# frozen_string_literal: true

module Schwarznasenschaf
  module Commands
    module Clear
      extend Discordrb::Commands::CommandContainer

      command_attributes = {
        description: 'Bans the given user, no really it does!',
        help_available: true,
        max_args: 1,
        min_args: 1,
        rescue: 'An  error occured while trying to execute this command.',
        required_roles: [Support::Config::ROLES[:verified]],
        usage: 'ban [user]'
      }

      command :ban, command_attributes do |event, user|
        user = event.message.mentions.first
        return unless user

        "✅ Baaaaaaaa​nned #{user.username}##{user.discriminator}"
      end
    end
  end
end
