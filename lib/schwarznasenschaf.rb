# frozen_string_literal: true

require 'discordrb'
require 'schwarznasenschaf/support/config'

module Schwarznasenschaf
  SCHWARZNASENSCHAF = Discordrb::Commands::CommandBot.new(
    token: Support::Config::TOKEN,
    prefix: Support::Config::PREFIX
  )

  def self.load_module(name, path)
    new_module = Module.new
    const_set name, new_module
    Dir["lib/schwarznasenschaf/#{path}/*.rb"].each { |file| load file }
    new_module.constants.each do |mod|
      SCHWARZNASENSCHAF.include! new_module.const_get(mod)
    end
  end

  load_module :Events, 'events'
  load_module :Commands, 'commands'
  require 'schwarznasenschaf/commands'

  Signal.trap 'INT' do
    # rubocop:disable Lint/HandleExceptions
    begin
      SCHWARZNASENSCHAF.stop
    rescue ThreadError
      # This is okay - we're going to exit anyways!
    end
    # rubocop:enable Lint/HandleExceptions
    exit
  end

  TIME_STARTED = Time.now
  SCHWARZNASENSCHAF.run
end
