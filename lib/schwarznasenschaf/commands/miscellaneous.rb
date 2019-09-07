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
        }.freeze,
        SUDO = {
          description: "Lets any user run any command",
          help_available: true,
          min_args: 1,
          rescue: "An error occured while trying to execue this command.",
          required_roles: [Schwarznasenschaf::Config::ROLES[:verified]],
          usage: "sudo [command]"
        }.freeze
      ].freeze
    end

    def self.ban(event)
      user = event.message.mentions.first
      return "Could not find user. Please mention a user to ban." unless user

      "✅ Ba​nned #{user.distinct}"
    end

    def self.sudo(event)
      "#{event.author.distinct} is not in the sudoers file. This incident will be reported."
    end
  end
end
