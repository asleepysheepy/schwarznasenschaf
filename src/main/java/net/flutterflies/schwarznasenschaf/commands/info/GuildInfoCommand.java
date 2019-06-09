package net.flutterflies.schwarznasenschaf.commands.info;

import java.time.format.DateTimeFormatter;

import net.dv8tion.jda.core.OnlineStatus;
import net.dv8tion.jda.core.entities.Guild;
import net.dv8tion.jda.core.entities.MessageEmbed;
import net.dv8tion.jda.core.entities.User;
import com.jagrosh.jdautilities.command.CommandEvent;

import net.flutterflies.schwarznasenschaf.SchafEmbedBuilder;
import net.flutterflies.schwarznasenschaf.commands.SchafCommand;


public final class GuildInfoCommand extends SchafCommand {
  public GuildInfoCommand() {
    super();
    this.name = "guild_info";
    this.aliases = new String[]{"guild-info", "guildinfo", "server_info", "server-info", "serverinfo"};
    this.help = "guild_info";
  }

  @Override
  protected void execute(CommandEvent event) {
    Guild guild = event.getGuild();
    MessageEmbed embed = buildEmbed(guild, event.getAuthor());

    event.getChannel().sendMessage(embed).queue();
  }

  private MessageEmbed buildEmbed(Guild guild, User author) {
    String onlineMembers = Long.toString(guild.getMembers().stream().filter(member -> member.getOnlineStatus() == OnlineStatus.ONLINE).count());
    String people = Long.toString(guild.getMembers().stream().filter(member -> !member.getUser().isBot()).count());
    String bots = Long.toString(guild.getMembers().stream().filter(member -> member.getUser().isBot()).count());
    String createdAtTime = guild.getCreationTime().format(DateTimeFormatter.ofPattern("MM/dd/yyyy 'at' HH:mm"));

    SchafEmbedBuilder builder = new SchafEmbedBuilder("Guild Info", author, guild);

    builder.addField("Name", guild.getName(), true);
    builder.addField("Id", guild.getId(), true);
    builder.addField("Region", guild.getRegion().toString(), true);
    builder.addField("Categories", Integer.toString(guild.getCategories().size()), true);
    builder.addField("Text Channels", Integer.toString(guild.getTextChannels().size()), true);
    builder.addField("Voice Channels", Integer.toString(guild.getVoiceChannels().size()), true);
    builder.addField("Total Members", Integer.toString(guild.getMembers().size()), true);
    builder.addField("Online Members", onlineMembers, true);
    builder.addField("People", people, true);
    builder.addField("Bots", bots, true);
    builder.addField("Roles", Integer.toString(guild.getRoles().size()), true);
    builder.addField("Emojis", Integer.toString(guild.getEmotes().size()), true);
    builder.addField("Created at", createdAtTime, false);

    return builder.build();
  }
}

