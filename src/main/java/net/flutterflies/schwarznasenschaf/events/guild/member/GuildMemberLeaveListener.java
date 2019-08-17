package net.flutterflies.schwarznasenschaf.events.guild.member;

import net.dv8tion.jda.core.entities.TextChannel;
import net.dv8tion.jda.core.entities.User;
import net.dv8tion.jda.core.events.guild.member.GuildMemberLeaveEvent;
import net.dv8tion.jda.core.hooks.ListenerAdapter;

import net.flutterflies.schwarznasenschaf.SchafConfig;

public final class GuildMemberLeaveListener extends ListenerAdapter {

  @Override
  public void onGuildMemberLeave(GuildMemberLeaveEvent event) {
    User user = event.getUser();
    TextChannel loggingChannel = event.getJDA().getTextChannelById(SchafConfig.LOGGING_CHANNELS.get("memberships"));

    String message = user.getName() + "#" + user.getDiscriminator() + "with ID `" + user.getId() +
      "` has left the server.";

    loggingChannel.sendMessage(message).queue();
  }
}
