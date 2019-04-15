# frozen_string_literal: true

module Schwarznasenschaf::Core::Events::ReadyEvent
  extend Discordrb::EventContainer

  ready do |event|
    event.bot.listening = '?help'
  end
end
