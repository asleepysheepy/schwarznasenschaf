package net.flutterflies.schwarznasenschaf;

import java.util.HashMap;
import java.util.Map;

public class SchafConfig {
  public static final Map<String, String> CHANNELS = new HashMap<>();
  public static final Map<String, String> ROLES = new HashMap<>();

  static final String COMMAND_PREFIX = "?";

  static {
    CHANNELS.put("bots", "299439031320838145");
    CHANNELS.put("general", "309382568896233476");
    CHANNELS.put("rules", "300991962876608512");
    CHANNELS.put("welcome", "352215874771615754");

    ROLES.put("mod team", "489572548720328725");
    ROLES.put("verified", "309382083724312576");
  }
}
