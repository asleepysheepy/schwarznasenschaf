# frozen_string_literal: true

module Schwarznasenschaf::Admin
  def self.load_module(name, path)
    new_module = Module.new
    const_set name, new_module
    Dir["lib/schwarznasenschaf/admin/#{path}/*.rb"].each { |file| load file }
    new_module.constants.each do |mod|
      Schwarznasenschaf::SCHWARZNASENSCHAF.include! new_module.const_get(mod)
    end
  end

  load_module :Events, 'events'
  load_module :Commands, 'commands'
  require 'schwarznasenschaf/admin/commands'
end
