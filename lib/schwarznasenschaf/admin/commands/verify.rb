# frozen_string_literal: true

module Schwarznasenschaf::Admin::Commands::Verify
  extend Discordrb::Commands::CommandContainer

  command_attributes = {
    description: 'Verifies the mentioned user and optionally clears chat',
    help_available: true,
    max_args: 2,
    min_args: 1,
    rescue: 'An  error occured while trying to execute this command.',
    required_roles: [Schwarznasenschaf::Config::ROLES[:mod_team]],
    usage: 'verify [mentioned_user] <messages_to_clear>'
  }

  command :verify, command_attributes do |event, *args|
    user = event.message.mentions.first
    return unless user

    set_roles user, event.server
    send_bot_channel_messages user, event.server
    send_general_channel_messages user, event.server

    return if args.last.to_i.zero?

    result = Schwarznasenschaf::Admin::Commands.bulk_delete event.channel, args.last.to_i
    Schwarznasenschaf::Admin::Commands.send_and_delete event.channel, result
  end

  def self.set_roles(user, server)
    member = server.member user.id

    role_to_add = server.roles.detect do |role|
      role.id == Schwarznasenschaf::Config::ROLES[:verified]
    end

    member.add_role role_to_add
  end

  def self.send_bot_channel_messages(user, server)
    bots_channel = server.channels.detect do |channel|
      channel.id == Schwarznasenschaf::Config::CHANNELS[:bots]
    end

    bots_message = "#{user.mention} you can assign yourself roles here: "\
                   "https://roleypoly.com/s/#{server.id}"

    bots_channel.send bots_message
  end

  def self.send_general_channel_messages(user, server)
    general_channel = server.channels.detect do |channel|
      channel.id == Schwarznasenschaf::Config::CHANNELS[:general]
    end

    general_message = "Welcome #{user.mention}!"

    general_channel.send general_message
  end
end