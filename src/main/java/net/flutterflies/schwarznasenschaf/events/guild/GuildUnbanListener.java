package net.flutterflies.schwarznasenschaf.events.guild;

import net.dv8tion.jda.core.entities.TextChannel;
import net.dv8tion.jda.core.entities.User;
import net.dv8tion.jda.core.events.guild.GuildUnbanEvent;
import net.dv8tion.jda.core.hooks.ListenerAdapter;

import net.flutterflies.schwarznasenschaf.SchafConfig;

public final class GuildUnbanListener extends ListenerAdapter {

  @Override
  public void onGuildUnban(GuildUnbanEvent event) {
    User user = event.getUser();
    TextChannel loggingChannel = event.getJDA().getTextChannelById(SchafConfig.LOGGING_CHANNELS.get("memberships"));

    String message = user.getName() + "#" + user.getDiscriminator() + "with ID `" + user.getId() +
      "` has been unbanned from the server.";

    loggingChannel.sendMessage(message).queue();
  }
}
