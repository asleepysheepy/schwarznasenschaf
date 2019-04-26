# frozen_string_literal: true

module Schwarznasenschaf::Config
  CHANNELS = {
    bots: 299_439_031_320_838_145,
    general: 309_382_568_896_233_476,
    join_messages: 352_215_874_771_615_754,
    leave_messages: 309_382_568_896_233_476,
    rules: 300_991_962_876_608_512
  }.freeze

  PREFIX = '?'

  ROLES = {
    verified: 309_382_083_724_312_576,
    mod_team: 489_572_548_720_328_725
  }.freeze

  TOKEN = 'NTM1MTA0NjAxMTU0NzgxMTg0.XLTUHA.5geVdvwYWeKZXkjr8gJ9MIFHU74' # ENV['TOKEN']
end
