package net.flutterflies.schwarznasenschaf.commands.fun;

import net.dv8tion.jda.core.entities.User;
import com.jagrosh.jdautilities.command.CommandEvent;

import net.flutterflies.schwarznasenschaf.commands.SchafCommand;

public class BanCommand extends SchafCommand {
  public BanCommand() {
    super();
    this.name = "ban";
    this.help = "ban <user mention>";
  }

  @Override
  protected void execute(CommandEvent event) {
    User user = event.getMessage().getMentionedMembers().get(0).getUser();
    String banMessage = "Baaa\u200Bnned " + user.getName() + "#" + user.getDiscriminator();

    event.getMessage().getChannel().sendMessage(banMessage).queue();
  }
}
