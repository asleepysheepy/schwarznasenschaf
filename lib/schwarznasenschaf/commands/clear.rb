# frozen_string_literal: true

module Schwarznasenschaf
  module Commands
    module Clear
      extend Discordrb::Commands::CommandContainer

      command :clear do |event, num_to_delete|
        can_use = Commands.sender_has_role? event.author, :mod_team
        return Support::Config::NO_PERMISSION_MESSAGE unless can_use

        result = Commands.bulk_delete event.channel, num_to_delete.to_i
        Commands.send_and_delete event.channel, result
      end
    end
  end
end
