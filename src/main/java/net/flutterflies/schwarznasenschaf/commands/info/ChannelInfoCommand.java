package net.flutterflies.schwarznasenschaf.commands.info;

import java.time.format.DateTimeFormatter;

import net.dv8tion.jda.core.entities.Guild;
import net.dv8tion.jda.core.entities.MessageEmbed;
import net.dv8tion.jda.core.entities.TextChannel;
import net.dv8tion.jda.core.entities.User;
import com.jagrosh.jdautilities.command.CommandEvent;

import net.flutterflies.schwarznasenschaf.SchafEmbedBuilder;
import net.flutterflies.schwarznasenschaf.commands.SchafCommand;

public final class ChannelInfoCommand extends SchafCommand {
  public ChannelInfoCommand() {
    super();
    this.name = "channel_info";
    this.aliases = new String[]{"channel-info", "channelinfo"};
    this.help = "channel_info <channel>";
  }

  @Override
  protected void execute(CommandEvent event) {
    TextChannel channel = getChannel(event);
    if (channel == null) {
      event.getChannel().sendMessage("Unable to find that channel").queue();
      return;
    }

    MessageEmbed embed = buildEmbed(channel, event.getAuthor(), event.getGuild());
    event.getChannel().sendMessage(embed).queue();
  }

  private TextChannel getChannel(CommandEvent event) {
    if (event.getMessage().getMentionedChannels().size() > 0) {
      return event.getMessage().getMentionedChannels().get(0);
    }

    return event.getTextChannel();
  }

  private MessageEmbed buildEmbed(TextChannel channel, User author, Guild guild) {
    String createdAtTime = channel.getCreationTime().format(DateTimeFormatter.ofPattern("MM/dd/yyyy 'at' HH:mm"));
    String topic = channel.getTopic() == null ? "" : channel.getTopic();

    SchafEmbedBuilder builder = new SchafEmbedBuilder("Channel Info", author, guild);

    builder.addField("Name", channel.getName(), true);
    builder.addField("ID", channel.getId(), true);
    builder.addField("Users", Integer.toString(channel.getMembers().size()), true);
    builder.addField("Type", channel.getType().toString(), true);
    builder.addField("NSFW", Boolean.toString(channel.isNSFW()), true);
    builder.addField("Slowmode", Boolean.toString(channel.getSlowmode() != 0), true);
    builder.addField("Created at", createdAtTime, false);
    builder.addField("Topic", topic, false);

    return builder.build();
  }
}
