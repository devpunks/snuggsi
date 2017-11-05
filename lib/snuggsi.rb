module Snuggsi
# Your code goes here...
  mattr_accessor :optimize_scripts
end

require 'sprockets'
require 'nokogumbo'
require 'active_support'

require 'snuggsi/asset_tag_helper'
require 'snuggsi/html_bundle_processor'
require 'snuggsi/html_import_processor'
require 'snuggsi/railtie'
require 'snuggsi/version'
