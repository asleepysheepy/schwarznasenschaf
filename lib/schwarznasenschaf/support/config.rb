# frozen_string_literal: true

module Schwarznasenschaf
  module Support
    module Config
      CHANNELS = {
        bots: 299_439_031_320_838_145,
        general: 309_382_568_896_233_476,
        join_messages: 352_215_874_771_615_754,
        leave_messages: 309_382_568_896_233_476,
        rlues: 300_991_962_876_608_512
      }.freeze

      NO_PERMISSION_MESSAGE = 'You don\'t have permission to use this command.'

      PREFIX = '?'

      ROLES = {
        just_joined: 325_076_131_986_276_352,
        verified: 309_382_083_724_312_576,
        mod_team: 489_572_548_720_328_725
      }.freeze

      TOKEN = ENV['TOKEN']
    end
  end
end
