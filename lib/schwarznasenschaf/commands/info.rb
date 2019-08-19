# frozen_string_literal: true

module Schwarznasenschaf::Commands
  module Info
    module Attributes
      ALL = [
        CHANNEL = {
          aliases: [:channelinfo],
          description: "Gets some info about the given channel, if no channel is given uses the current channel",
          help_available: true,
          max_args: 1,
          min_args: 0,
          rescue: "An  error occured while trying to execute this command.",
          required_roles: [Schwarznasenschaf::Config::ROLES[:verified]],
          usage: "channel_info [channel]"
        }.freeze,

        ROLE = {
          aliases: [:roleinfo],
          description: "Gets some info about the given role",
          help_available: true,
          max_args: 1,
          min_args: 1,
          rescue: "An  error occured while trying to execute this command.",
          required_roles: [Schwarznasenschaf::Config::ROLES[:verified]],
          usage: "role_info [role]"
        }.freeze,

        SERVER = {
          aliases: [:serverinfo],
          description: "Gets some info about the server",
          help_available: true,
          max_args: 0,
          min_args: 0,
          rescue: "An  error occured while trying to execute this command.",
          required_roles: [Schwarznasenschaf::Config::ROLES[:verified]],
          usage: "server_info"
        }.freeze,

        USER = {
          aliases: [:userinfo],
          description: "Gets some info about the given user, uses the command issuer if no user was given.",
          help_available: true,
          max_args: 1,
          min_args: 0,
          rescue: "An  error occured while trying to execute this command.",
          required_roles: [Schwarznasenschaf::Config::ROLES[:verified]],
          usage: "user_info <user>"
        }.freeze
      ].freeze
    end

    TIME_FORMAT = "%B %d, %Y %H:%M %Z"

    def self.channel(event, channel_id)
      channel = _get_channel(event, channel_id)

      Schwarznasenschaf::Support.send_embed(event.channel, event.author, event.bot) do |embed|
        embed.title = "Channel Info"

        embed.add_field(name: "Name", value: channel.name, inline: true)
        embed.add_field(name: "ID", value: channel.id, inline: true)
        embed.add_field(name: "Users", value: channel.users.length, inline: true)
        embed.add_field(name: "Type", value: Discordrb::Channel::TYPES.keys[channel.type], inline: true)
        embed.add_field(name: "NSFW", value: channel.nsfw?, inline: true)
        embed.add_field(name: "Slowmode", value: channel.slowmode?, inline: true)
        embed.add_field(name: "Created at", value: channel.creation_time.strftime(TIME_FORMAT))
        embed.add_field(name: "Topic", value: channel.topic)
      end
    end

    def self.role(event, role_name)
      role = event.server.roles.detect { |r| r.name == role_name }
      return "Unable to find role with name `#{role_name}`" unless role

      Schwarznasenschaf::Support.send_embed(event.channel, event.author, event.bot) do |embed|
        embed.title = "Role Info"
        embed.color = role.color

        embed.add_field(name: "Name", value: role.name, inline: true)
        embed.add_field(name: "ID", value: role.id, inline: true)
        embed.add_field(name: "Members", value: role.members.length, inline: true)
        embed.add_field(name: "Mentionable", value: role.mentionable?, inline: true)
        embed.add_field(name: "Color", value: role.color.hex, inline: true)
        embed.add_field(name: "Mention", value: "`<@&#{role.id}>`", inline: true)
        embed.add_field(name: "Position", value: role.position, inline: true)
        embed.add_field(name: "Hoisted", value: role.hoist, inline: true)
        embed.add_field(name: "Created at", value: role.creation_time.strftime(TIME_FORMAT))
      end
    end

    def self.server(event)
      server = event.server

      Schwarznasenschaf::Support.send_embed(event.channel, event.author, event.bot) do |embed|
        embed.title = "Server Info"

        embed.add_field(name: "Name", value: server.name, inline: true)
        embed.add_field(name: "ID", value: server.id, inline: true)
        embed.add_field(name: "Region", value: server.region_id, inline: true)
        embed.add_field(name: "Categories", value: server.categories.length, inline: true)
        embed.add_field(name: "Text Channels", value: server.text_channels.length, inline: true)
        embed.add_field(name: "Voice Channels", value: server.voice_channels.length, inline: true)
        embed.add_field(name: "Total Members",  value: server.members.length, inline: true)
        embed.add_field(name: "Online Members", value: server.online_members.length, inline: true)
        embed.add_field(name: "People", value: server.members.reject(&:bot_account?).length, inline: true)
        embed.add_field(name: "Bots", value: server.members.select(&:bot_account?).length, inline: true)
        embed.add_field(name: "Roles", value: server.roles.length, inline: true)
        embed.add_field(name: "emojis", value: server.emojis.length, inline: true)
        embed.add_field(name: "Created at", value: server.creation_time.strftime(TIME_FORMAT))
      end
    end

    def self.user(event, user_id)
      user = _get_user(event, user_id)

      Schwarznasenschaf::Support.send_embed event.channel, event.author, event.bot do |embed|
        embed.title = "User Info"
        embed.thumbnail = Discordrb::Webhooks::EmbedThumbnail.new(
          url: user.avatar_url
        )

        embed.add_field(name: "Name", value: user.distinct, inline: true)
        embed.add_field(name: "ID", value: user.id, inline: true)
        embed.add_field(name: "Display Name", value: user.mention, inline: true)
        embed.add_field(name: "Status", value: user.status, inline: true)
        embed.add_field(name: "Joined At", value: user.joined_at.strftime(TIME_FORMAT), inline: true)
        embed.add_field(name: "Created At", value: user.creation_time.strftime(TIME_FORMAT), inline: true)
        embed.add_field(name: "Roles", value: user.roles.map(&:mention).join(", "))
      end
    end

    private

    def self._get_channel(event, channel_id)
      channel = event.server.channels.detect do |c|
        c.id == channel_id&.slice(/[0-9]+/)
      end

      channel || event.channel
    end

    def self._get_user(event, user_id)
      user = event.message.mentions.first
      user ||= event.server.member(user_id)
      user || event.author
    end
  end
end
