require 'action_view'
require 'sprockets/railtie'

class WebComponentsRails::Railtie < Rails::Railtie
  # Register our asset tag helpers
  initializer 'web_components.asset_tag_helper' do
    ActionView::Base.module_eval do
      include WebComponentsRails::AssetTagHelper
    end
    # Certain run modes in Rails (like rails g migration), won't have assets loaded
    if Rails.application.assets.present?
      Rails.application.assets.context_class.class_eval do
        include WebComponentsRails::AssetTagHelper
      end
    end
  end

  # Allows HAML templates to be used with asset pipeline
  initializer 'web_components.sprockets', after: 'sprockets.environment', group: :all do |app|
    app.config.assets.configure do |env|
      env.register_mime_type 'text/html', extensions: ['.html', '.haml']
      env.register_preprocessor 'text/html', Sprockets::DirectiveProcessor
      env.register_preprocessor 'text/html', WebComponentsRails::HTMLImportProcessor
      env.register_bundle_processor 'text/html', Sprockets::Bundle
      env.register_bundle_processor 'text/html', WebComponentsRails::HTMLBundleProcessor
    end
  end
end
