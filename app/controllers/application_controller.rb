class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_filter :check_for_mobile

  protected

  def check_for_mobile
    session[:mobile_override] = params[:mobile] if params[:mobile]
    prepare_for_mobile if mobile_device?
  end

  def prepare_for_mobile
    prepend_view_path Rails.root + 'app' + 'views_mobile'
  end

  def mobile_device?
    if session[:mobile_override]
      session[:mobile_override] == '1'
    else
      (request.user_agent =~ /Mobile|webOS|Android/)
    end
  end
  helper_method :mobile_device?
end

# Websocket server start
require 'em-websocket'
@ip = APP_CONFIG[:ws_ip]
@port = APP_CONFIG[:ws_port]
@clients = []
EM::WebSocket.start(host: @ip, port: @port) do |ws|
  ws.onopen do |_handshake|

  end

  ws.onclose do
    index = @clients.index {|i| i[:socket] == ws}
    message = @clients.delete_at index
    puts "player #{message[:player_id]} has disconnected!"
  end

  ws.onmessage do |msg|
    message = JSON.parse(msg).symbolize_keys
    case message[:action]
    when 'connect'
      @clients.push({:player_id=>message[:player_id], :socket=>ws})
      puts "player #{message[:player_id]} has connected!"
      client = @clients.find_all {|x| x[:player_id] == message[:player_id]}
      client.each {|s| s[:socket].send msg}
    when 'send'
      client = @clients.find_all {|x| x[:player_id] == message[:player_id]}
      puts "player #{message[:id]} send: #{msg}"
      client.each {|s| s[:socket].send msg}
    end
  end
end
