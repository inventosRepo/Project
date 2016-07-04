# Websocket server start
require 'em-websocket'
@ip = '192.168.1.80'
@port = 3004
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
