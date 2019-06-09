package net.flutterflies.schwarznasenschaf;

import java.awt.Color;
import java.time.LocalDateTime;

import net.dv8tion.jda.core.EmbedBuilder;
import net.dv8tion.jda.core.entities.Guild;
import net.dv8tion.jda.core.entities.User;

public final class SchafEmbedBuilder extends EmbedBuilder {

  public SchafEmbedBuilder(String title, User author, Guild guild) {
    String authorName = author.getName() + "#" + author.getDiscriminator();
    String footerText = "Schwarznasenschaf is crafted with love by Sleepy Sheepy#0179";

    this.setTitle(title, "Https://github.com/flutterflies/schwarznasenschaf");
    this.setAuthor(authorName, null, author.getAvatarUrl());
    this.setTimestamp(LocalDateTime.now());
    this.setFooter(footerText, guild.getMemberById("145696462959935488").getUser().getAvatarUrl());
    this.setThumbnail(guild.getIconUrl());
    this.setColor(new Color(28, 116, 142));
  }
}
