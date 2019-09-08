# frozen_string_literal: true

require "sequel"

module Schwarznasenschaf
  module Database
    Sequel.extension :migration
    DB = Sequel.connect(Schwarznasenschaf::Config::POSTGRES_URL)
    # Sequel::Migrator.run(DB, "db/migrations")
    Dir["lib/schwarznasenschaf/models/*.rb"].each { |mod| load mod }
  end
end
