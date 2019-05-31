package net.flutterflies.schwarznasenschaf.commands.admin;

import net.dv8tion.jda.core.entities.*;
import com.jagrosh.jdautilities.command.CommandEvent;

import net.flutterflies.schwarznasenschaf.SchafConfig;
import net.flutterflies.schwarznasenschaf.commands.SchafCommand;

public class VerifyCommand extends SchafCommand {
  public VerifyCommand() {
    super();
    this.name = "verify";
    this.help = "verify <user mention> <number of messages to delete>";
    this.ownerCommand = true;
  }

  @Override
  protected void execute(CommandEvent event) {
    String[] args = parseArgs(event.getArgs());

    if (event.getMessage().getMentionedMembers().size() <= 0) {
      event.getTextChannel().sendMessage("Please mention a user to verify.").queue();
      return;
    }

    Member memberToVerify = event.getMessage().getMentionedMembers().get(0);
    verify(event, memberToVerify);
    sendMessages(event.getGuild(), memberToVerify.getUser());

    if (args.length > 1) {
      try {
        int numMessagesToDelete = Integer.parseInt(args[1]);
        bulkDelete(event.getTextChannel(), numMessagesToDelete);
      }
      catch (NumberFormatException ex) {
        event.getTextChannel().sendMessage("Unable to clear messages, invalid number provided").queue();
      }
    }
  }

  private void verify(CommandEvent event, Member memberToVerify) {
    Role roleToAdd = event.getGuild().getRoleById(SchafConfig.ROLES.get("verified"));

    event.getGuild().getController().addRolesToMember(memberToVerify, roleToAdd).queue();
  }

  private void sendMessages(Guild guild, User user) {
    TextChannel generalChannel = guild.getTextChannelById(SchafConfig.CHANNELS.get("general"));
    TextChannel botsChannel = guild.getTextChannelById(SchafConfig.CHANNELS.get("bots"));

    String generalMessage = "Welcome " + user.getAsMention() + "!";
    String botsMessage = user.getAsMention() + " you can assign yourself roles here: " +
      "https://roleypoly.com/s/" + guild.getId();

    generalChannel.sendMessage(generalMessage).queue();
    botsChannel.sendMessage(botsMessage).queue();
  }

  private String[] parseArgs(String args) {
    return args.split(" ");
  }
}
