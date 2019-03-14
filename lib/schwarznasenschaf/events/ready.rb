# frozen_string_literal: true

module Schwarznasenschaf
  module Events
    module ReadyEvent
      extend Discordrb::EventContainer

      ready do |event|
        event.bot.listening = '?help'
      end
    end
  end
end
