package net.flutterflies.schwarznasenschaf.events.guild.member;

import net.dv8tion.jda.core.entities.TextChannel;
import net.dv8tion.jda.core.events.guild.member.GuildMemberJoinEvent;
import net.dv8tion.jda.core.hooks.ListenerAdapter;

import net.flutterflies.schwarznasenschaf.SchafConfig;

public class GuildMemberJoinListener extends ListenerAdapter {

  @Override
  public void onGuildMemberJoin(GuildMemberJoinEvent event) {
    TextChannel welcomeChannel = event.getJDA().getTextChannelById(SchafConfig.CHANNELS.get("welcome"));
    TextChannel rulesChannel = event.getJDA().getTextChannelById(SchafConfig.CHANNELS.get("rules"));

    String message = "Welcome " + event.getUser().getAsMention() + "!\n\n" +
      "Please confirm you have read the " + rulesChannel.getAsMention() + " and tell us how you identify.";

    welcomeChannel.sendMessage(message).queue();
  }
}
