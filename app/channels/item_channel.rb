class ItemChannel < ApplicationCable::Channel
  def subscribed
    Rails.logger.info("[XXX] ItemChannel#subscribed!")

    stream_from 'item'
  end

  def unsubscribed
    Rails.logger.info("[XXX] ItemChannel#unsubscribed!")
  end

  def hello
    Rails.logger.info("[XXX] ItemCHannel#hello!")
  end
end
