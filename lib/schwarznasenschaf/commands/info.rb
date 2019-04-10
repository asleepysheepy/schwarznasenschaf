# frozen_string_literal: true

module Schwarznasenschaf
  module Commands
    module Info
      extend Discordrb::Commands::CommandContainer
      channel_command_attributes = {
        aliases: ['channelinfo'],
        description: 'Gets some info about the given channel, '\
                     'if no channel is given uses the current channel',
        help_available: true,
        max_args: 1,
        min_args: 0,
        rescue: 'An  error occured while trying to execute this command.',
        required_roles: [Support::Config::ROLES[:verified]],
        usage: 'channel_info [channel]'
      }

      command :channel_info, channel_command_attributes do |event, channel_id|
        channel = event.server.channels.detect do |c|
          c.id == channel_id&.slice(/[0-9]+/)
        end
        channel ||= event.channel

        Support.send_embed(event.channel, event.author, event.bot) do |embed|
          embed.title = 'Channel Info'

          embed.add_field name: 'Name',
                          value: channel.name,
                          inline: true
          embed.add_field name: 'ID',
                          value: channel.id,
                          inline: true
          embed.add_field name: 'Users',
                          value: channel.users.length,
                          inline: true
          embed.add_field name: 'Type',
                          value: Discordrb::Channel::TYPES.keys[channel.type],
                          inline: true
          embed.add_field name: 'NSFW',
                          value: channel.nsfw?,
                          inline: true
          embed.add_field name: 'Slowmode',
                          value: channel.slowmode?,
                          inline: true
          embed.add_field name: 'Topic',
                          value: channel.topic
        end
      end
    end
  end
end
