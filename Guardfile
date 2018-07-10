#!ruby
# frozen_string_literal: true

clearing :off
interactor :off

npm_bin = `npm bin`.strip

ENV['NODE_ENV'] = 'development'

guard :rails, host: '0.0.0.0' do
  watch('Gemfile.lock')
  watch(%r{^config/.*\.rb$})
  watch(%r{^lib/middlewares/.*\.rb$})
  watch(%r{^config/[^/]\.yml$})
  ignore(%r{config/routes\.rb$})
end

guard :process, name: 'webpack',
                command: "#{npm_bin}/webpack-serve config/serve.config.js" do
  watch('config/webpack.config.js')
  watch('config/serve.config.js')
end

