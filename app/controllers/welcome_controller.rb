class WelcomeController < ApplicationController
  require 'em-websocket'
  def index
    @ip = APP_CONFIG[:ws_ip]
    @port = APP_CONFIG[:ws_port]
    @clients = []
    EM::WebSocket.start(host: @ip, port: @port) do |ws|
      ws.onopen do |_handshake|
        @clients << ws
        ws.send 'Connected'
      end

      ws.onclose do
        ws.send 'Closed.'
        @clients.delete ws
      end

      ws.onmessage do |msg|
        puts "Received Message: #{msg}"
        @clients.each do |socket|
          socket.send msg
        end
      end
    end
  end
end
