# frozen_string_literal: true

require 'discordrb'

module Schwarznasenschaf
  require 'schwarznasenschaf/config'
  require 'schwarznasenschaf/support'

  SCHWARZNASENSCHAF = Discordrb::Commands::CommandBot.new(
    token: Config::TOKEN,
    prefix: Config::PREFIX
  )

  load 'lib/schwarznasenschaf/admin.rb'
  load 'lib/schwarznasenschaf/core.rb'

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
