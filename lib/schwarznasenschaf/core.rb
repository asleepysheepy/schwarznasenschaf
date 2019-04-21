# frozen_string_literal: true

module Schwarznasenschaf::Core
  def self.load_module(name, path)
    new_module = Module.new
    const_set name, new_module
    Dir["lib/schwarznasenschaf/core/#{path}/*.rb"].each { |file| load file }
    new_module.constants.each do |mod|
      Schwarznasenschaf::SCHWARZNASENSCHAF.include! new_module.const_get(mod)
    end
  end

  load_module :Events, 'events'
end
