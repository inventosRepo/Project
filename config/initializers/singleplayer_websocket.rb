require 'em-websocket'
# Websocket server start
Thread.abort_on_exception = true

Thread.new {
  EventMachine.run {
    @ip = APP_CONFIG[:ws_ip]
    @port = APP_CONFIG[:ws_s_port]
    @clients = []
    EM::WebSocket.start(host: @ip, port: @port) do |ws|
      ws.onopen do |_handshake|

      end

      ws.onclose do
        #index = @clients.index { |i| i[:socket] == ws }
        #message = @clients.delete_at index
        #puts "player #{message[:player_id]} has disconnected!"
      end

      ws.onmessage do |msg|
        message = JSON.parse(msg).symbolize_keys
        case message[:action]
        when 'connect'
          @clients.push({ :player_id=>message[:player_id], :socket=>ws })
          puts "player #{message[:player_id]} has connected!"
          client = @clients.find_all { |x| x[:player_id] == message[:player_id] }
          client.each {|s| s[:socket].send msg}
        when 'send'
          client = @clients.find_all { |x| x[:player_id] == message[:player_id] }
          puts "player #{message[:id]} send: #{msg}"
          client.each { |s| s[:socket].send msg }
        end
      end
    end
  }
}
