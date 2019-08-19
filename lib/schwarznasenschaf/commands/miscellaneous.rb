# frozen_string_literal: true

module Schwarznasenschaf::Commands
  module Miscellaneous
    module Attributes
      ALL = [
        BAN = {
          description: "Bans the given user, no really it does!",
          help_available: true,
          max_args: 1,
          min_args: 1,
          rescue: "An  error occured while trying to execute this command.",
          required_roles: [Schwarznasenschaf::Config::ROLES[:verified]],
          usage: "ban [user]"
        }.freeze
      ].freeze
    end

    def self.ban(event)
      user = event.message.mentions.first
      return "Could not find user. Please mention a user to ban." unless user

      "✅ Ba​nned #{user.distinct}"
    end
  end
end
