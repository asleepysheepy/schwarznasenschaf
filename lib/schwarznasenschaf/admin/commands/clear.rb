# frozen_string_literal: true

module Schwarznasenschaf::Admin::Commands::Clear
  extend Discordrb::Commands::CommandContainer

  command_attributes = {
    description: 'Clears the last [x] messages from the channel',
    help_available: true,
    max_args: 1,
    min_args: 1,
    rescue: 'An  error occured while trying to execute this command.',
    # required_roles: [Schwarznasenschaf::Config::ROLES[:mod_team]],
    usage: 'clear [number]'
  }

  command :clear, command_attributes do |event, num_to_delete|
    result = Schwarznasenschaf::Admin::Commands.bulk_delete event.channel, num_to_delete.to_i
    Schwarznasenschaf::Admin::Commands.send_and_delete event.channel, result
  end
end
