package net.flutterflies.schwarznasenschaf.commands.info;

import java.time.format.DateTimeFormatter;
import java.util.stream.Collectors;

import net.dv8tion.jda.core.entities.*;
import com.jagrosh.jdautilities.command.CommandEvent;

import net.flutterflies.schwarznasenschaf.SchafEmbedBuilder;
import net.flutterflies.schwarznasenschaf.commands.SchafCommand;

public final class UserInfoCommand extends SchafCommand {
  public UserInfoCommand() {
    super();
    this.name = "user_info";
    this.aliases = new String[]{"user-info", "userinfo"};
    this.help = "user_info <user>";
  }

  @Override
  protected void execute(CommandEvent event) {
    Member member = getMember(event);
    if (member == null) {
      event.getChannel().sendMessage("Unable to find that user.").queue();
      return;
    }

    MessageEmbed embed = buildEmbed(member, event.getAuthor(), event.getGuild());
    event.getChannel().sendMessage(embed).queue();
  }

  private Member getMember(CommandEvent event) {
    if (event.getMessage().getMentionedChannels().size() > 0) {
      return event.getMessage().getMentionedMembers().get(0);
    }

    if (event.getArgs().length() > 0) {
      return event.getGuild().getMemberById(event.getArgs());
    }

    return event.getGuild().getMember(event.getAuthor());
  }

  private MessageEmbed buildEmbed(Member member, User author, Guild guild) {
    User user = member.getUser();

    String roles = member.getRoles().stream().map(Role::getAsMention).collect(Collectors.joining(", "));
    String createdAtTime = member.getUser().getCreationTime().format(DateTimeFormatter.ofPattern("MM/dd/yyyy 'at' HH:mm"));
    String joinedAtTime = member.getJoinDate().format(DateTimeFormatter.ofPattern("MM/dd/yyyy 'at' HH:mm"));

    SchafEmbedBuilder builder = new SchafEmbedBuilder("Role Info", author, guild);

    builder.addField("Name", user.getName() + "#" + user.getDiscriminator(), true);
    builder.addField("Id", user.getId(), true);
    builder.addField("Display Name", user.getAsMention(), true);
    builder.addField("Status", member.getOnlineStatus().toString(), true);
    builder.addField("Joined At", joinedAtTime, true);
    builder.addField("Created at", createdAtTime, true);
    builder.addField("Roles", roles, false);

    builder.setColor(member.getColor());
    builder.setThumbnail(user.getAvatarUrl());

    return builder.build();
  }
}
