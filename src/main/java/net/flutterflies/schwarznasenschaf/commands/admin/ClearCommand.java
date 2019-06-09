package net.flutterflies.schwarznasenschaf.commands.admin;

import com.jagrosh.jdautilities.command.CommandEvent;

import net.flutterflies.schwarznasenschaf.commands.SchafCommand;

public final class ClearCommand extends SchafCommand {
  public ClearCommand() {
    super();
    this.name = "clear";
    this.help = "clear <number to clear>";
    this.ownerCommand = true;
  }

  @Override
  protected void execute(CommandEvent event) {
    int numMessagesToDelete;

    try {
      numMessagesToDelete = Integer.parseInt(event.getArgs());
    }
    catch (NumberFormatException ex) {
      event.getTextChannel().sendMessage("Please provide a number between 1 and 99").queue();
      return;
    }

    bulkDelete(event.getTextChannel(), numMessagesToDelete);
  }
}
