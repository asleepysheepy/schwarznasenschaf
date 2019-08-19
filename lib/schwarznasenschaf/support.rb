# frozen_string_literal: true

module Schwarznasenschaf
  module Support
    def self.send_embed(channel, author, bot)
      channel.send_embed do |embed|
        embed.color = 0x1c748e
        embed.timestamp = Time.now
        embed.url = "https://github.com/flutterflies/schwarznasenschaf"
        embed.thumbnail = Discordrb::Webhooks::EmbedThumbnail.new url: channel.server.icon_url
        embed.author = Discordrb::Webhooks::EmbedAuthor.new name: author.distinct, icon_url: author.avatar_url
        embed.footer = Discordrb::Webhooks::EmbedFooter.new(
          text: "Schwarznasenschaf is crafted with love by Sleepy Sheepy#0179",
          icon_url: bot.users[145_696_462_959_935_488].avatar_url
        )

        yield embed
      end
    end
  end
end
