# frozen_string_literal: true

module Schwarznasenschaf::Events
  module Miscellaneous
    def self.on_ready(event)
      event.bot.listening = "?help"
    end
  end
end
