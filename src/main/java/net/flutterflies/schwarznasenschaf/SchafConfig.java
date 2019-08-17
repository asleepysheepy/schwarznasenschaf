package net.flutterflies.schwarznasenschaf;

import java.util.HashMap;
import java.util.Map;

public final class SchafConfig {
  public static final Map<String, String> CHANNELS = new HashMap<>();
  public static final Map<String, String> LOGGING_CHANNELS = new HashMap<>();
  public static final Map<String, String> ROLES = new HashMap<>();

  static final String COMMAND_PREFIX = "?";

  static {
    CHANNELS.put("bots", "299439031320838145");
    CHANNELS.put("general", "309382568896233476");
    CHANNELS.put("rules", "300991962876608512");
    CHANNELS.put("welcome", "352215874771615754");

    LOGGING_CHANNELS.put("channels", "571157941118304256");
    LOGGING_CHANNELS.put("roles", "571158237089628160");
    LOGGING_CHANNELS.put("messages", "571158292148256790");
    LOGGING_CHANNELS.put("membership", "571158370610970625");

    ROLES.put("mod team", "489572548720328725");
    ROLES.put("verified", "309382083724312576");
  }
}
