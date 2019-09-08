# frozen_string_literal: true

require "discordrb"
require "redis"

module Schwarznasenschaf
  require "schwarznasenschaf/config"
  require "schwarznasenschaf/support"

  SCHWARZNASENSCHAF = Discordrb::Commands::CommandBot.new(token: Config::TOKEN, prefix: Config::PREFIX)

  REDIS = Redis.new(url: Config::REDIS_URL)

  load "lib/schwarznasenschaf/database.rb"
  load "lib/schwarznasenschaf/events.rb"
  load "lib/schwarznasenschaf/commands.rb"

  SCHWARZNASENSCHAF.include! Events
  SCHWARZNASENSCHAF.include! Commands

  Signal.trap "INT" do
    begin
      SCHWARZNASENSCHAF.stop
    rescue ThreadError
      puts "\nGoodnight 🐑"
    end
    exit
  end

  TIME_STARTED = Time.now
  SCHWARZNASENSCHAF.run
end
