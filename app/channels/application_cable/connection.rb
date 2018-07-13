module ApplicationCable
  class Connection < ActionCable::Connection::Base

    identified_by :session_id

    def connect
      self.session_id = cookies.signed[:identity]

      Rails.logger.info("[XXX] ApplicationCable::Connection#connect to #{session_id}")
    end
  end
end
