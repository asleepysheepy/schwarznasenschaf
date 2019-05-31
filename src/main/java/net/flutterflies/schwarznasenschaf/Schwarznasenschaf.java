package net.flutterflies.schwarznasenschaf;

import javax.security.auth.login.LoginException;

import net.dv8tion.jda.core.JDABuilder;
import net.dv8tion.jda.core.entities.Game;
import com.jagrosh.jdautilities.command.CommandClientBuilder;

import net.flutterflies.schwarznasenschaf.commands.admin.ClearCommand;
import net.flutterflies.schwarznasenschaf.commands.admin.VerifyCommand;
import net.flutterflies.schwarznasenschaf.commands.fun.BanCommand;
import net.flutterflies.schwarznasenschaf.commands.info.ChannelInfoCommand;
import net.flutterflies.schwarznasenschaf.commands.info.GuildInfoCommand;
import net.flutterflies.schwarznasenschaf.commands.info.RoleInfoCommand;
import net.flutterflies.schwarznasenschaf.commands.info.UserInfoCommand;
import net.flutterflies.schwarznasenschaf.events.guild.member.GuildMemberJoinListener;

public class Schwarznasenschaf {
  public static void main(String[] args) throws LoginException, InterruptedException {
    String token = args[0];

    CommandClientBuilder commandBuilder = new CommandClientBuilder();
    commandBuilder.setPrefix(SchafConfig.COMMAND_PREFIX);
    commandBuilder.setOwnerId("145696462959935488");
    commandBuilder.setCoOwnerIds(
      "277133333773811712",
      "231366444326060032",
      "82981134597619712",
      "171426971052539904"
    );

    commandBuilder.addCommands(
      // Admin
      new ClearCommand(),
      new VerifyCommand(),

      // Info
      new ChannelInfoCommand(),
      new GuildInfoCommand(),
      new RoleInfoCommand(),
      new UserInfoCommand(),

      // Miscellaneous
      new BanCommand()
    );

    JDABuilder builder = new JDABuilder(token);
    builder.setAudioEnabled(false);
    builder.setGame(Game.listening("?help"));

    builder.addEventListener(
      commandBuilder.build(),
      new GuildMemberJoinListener()
    );

    builder.build().awaitReady();
  }
}
