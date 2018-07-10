worker_processes 2
timeout 300

logger Logger.new($stdout)

listen '0.0.0.0:3000'
pid 'tmp/pids/unicorn.pid'

preload_app false

before_fork do |_server, _worker|
  # the following is highly recomended for Rails + "preload_app true"
  # as there's no need for the master process to hold a connection
  ActiveRecord::Base.connection.disconnect! if defined?(ActiveRecord::Base)
end

after_fork do |_server, _worker|
  ActiveRecord::Base.establish_connection if defined?(ActiveRecord::Base)
end