package net.flutterflies.schwarznasenschaf.commands;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

import net.dv8tion.jda.core.entities.TextChannel;
import com.jagrosh.jdautilities.command.Command;

public abstract class SchafCommand extends Command {
  protected SchafCommand() {
    this.requiredRole = "Verified";
  }

  private void sendAndDelete(TextChannel channel, String message) {
    channel.sendMessage(message).queue(sentMessage ->
      CompletableFuture.delayedExecutor(5, TimeUnit.SECONDS).execute(() ->
        sentMessage.delete().queue()
      )
    );
  }

  protected void bulkDelete(TextChannel channel, int numberToDelete) {
    String failedMessage = "Unable to delete messages";
    String successMessage = "Successfully deleted " + numberToDelete + " messages";

    numberToDelete++;
    if (numberToDelete < 2 || numberToDelete > 100) {
      channel.sendMessage(failedMessage).queue();
      return;
    }

    try {
      channel.getHistory().retrievePast(numberToDelete).queue(messages ->
        channel.deleteMessages(messages).queue((deletedMessages) ->
          sendAndDelete(channel, successMessage)
        )
      );
    }
    catch (Exception ex) {
      channel.sendMessage(failedMessage).queue();
    }
  }
}
