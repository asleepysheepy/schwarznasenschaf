# frozen_string_literal: true

module Schwarznasenschaf
  module Config
    CHANNELS = {
      bots: 299_439_031_320_838_145,
      general: 309_382_568_896_233_476,
      rules: 300_991_962_876_608_512,
      welcome: 352_215_874_771_615_754
    }.freeze

    LOGGING_CHANNELS = {
      channels: 571_157_941_118_304_256,
      roles: 571_158_237_089_628_160,
      messages: 571_158_292_148_256_790,
      membership: 571_158_370_610_970_625
    }.freeze

    POSTGRES_URL = ENV["POSTGRES_URL"]

    PREFIX = "?"

    REDIS_URL = ENV["REDIS_URL"]

    ROLES = {
      mod_team: 489_572_548_720_328_725,
      verified: 309_382_083_724_312_576
    }.freeze

    TOKEN = ENV["TOKEN"]
  end
end
