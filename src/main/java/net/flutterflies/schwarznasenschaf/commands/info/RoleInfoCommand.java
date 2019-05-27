package net.flutterflies.schwarznasenschaf.commands.info;

import java.awt.Color;
import java.time.format.DateTimeFormatter;

import net.dv8tion.jda.core.entities.Guild;
import net.dv8tion.jda.core.entities.MessageEmbed;
import net.dv8tion.jda.core.entities.Role;
import net.dv8tion.jda.core.entities.User;
import com.jagrosh.jdautilities.command.CommandEvent;

import net.flutterflies.schwarznasenschaf.SchafEmbedBuilder;
import net.flutterflies.schwarznasenschaf.commands.SchafCommand;

public class RoleInfoCommand extends SchafCommand {
  public RoleInfoCommand() {
    super();
    this.name = "role_info";
    this.aliases = new String[]{"role-info", "roleinfo"};
    this.help = "role_info <role>";
  }

  @Override
  protected void execute(CommandEvent event) {
    Role role = event.getGuild().getRolesByName(event.getArgs(), true).get(0);
    if (role == null) {
      event.getChannel().sendMessage("Unable to find that role.").queue();
      return;
    }

    MessageEmbed embed = buildEmbed(role, event.getAuthor(), event.getGuild());
    event.getChannel().sendMessage(embed).queue();
  }

  private MessageEmbed buildEmbed(Role role, User author, Guild guild) {
    String createdAtTime = role.getCreationTime().format(DateTimeFormatter.ofPattern("MM/dd/yyyy 'at' HH:mm"));

    SchafEmbedBuilder builder = new SchafEmbedBuilder("Role Info", author, guild);

    builder.addField("Name", role.getName(), true);
    builder.addField("Id", role.getId(), true);
    builder.addField("Members", Integer.toString(guild.getMembersWithRoles(role).size()), true);
    builder.addField("Mentionable", Boolean.toString(role.isMentionable()), true);
    builder.addField("Color", toHexString(role.getColor()), true);
    builder.addField("Mention", role.getAsMention(), true);
    builder.addField("Position", Integer.toString(role.getPosition()), true);
    builder.addField("Hoisted", Boolean.toString(role.isHoisted()), true);
    builder.addField("Created at", createdAtTime, false);

    builder.setColor(role.getColor());

    return builder.build();
  }

  private String toHexString(Color color) {
    String hexColor = Integer.toHexString(color.getRGB() & 0xffffff);
    if (hexColor.length() < 6) {
      hexColor = "000000".substring(0, 6 - hexColor.length()) + hexColor;
    }
    return "#" + hexColor;
  }
}
