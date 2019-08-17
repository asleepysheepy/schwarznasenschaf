package net.flutterflies.schwarznasenschaf.events.guild;

import net.dv8tion.jda.core.entities.TextChannel;
import net.dv8tion.jda.core.entities.User;
import net.dv8tion.jda.core.events.guild.GuildBanEvent;
import net.dv8tion.jda.core.hooks.ListenerAdapter;

import net.flutterflies.schwarznasenschaf.SchafConfig;

public final class GuildBanListener extends ListenerAdapter {

  @Override
  public void onGuildBan(GuildBanEvent event) {
    User user = event.getUser();
    TextChannel loggingChannel = event.getJDA().getTextChannelById(SchafConfig.LOGGING_CHANNELS.get("memberships"));

    String message = user.getName() + "#" + user.getDiscriminator() + "with ID `" + user.getId() +
      "` has been banned from the server.";

    loggingChannel.sendMessage(message).queue();
  }
}
