class WelcomeController < ApplicationController
  require 'em-websocket'
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

    ws.onpong do |value|
      puts "Received pong: #{value}"
    end

    ws.onping do |value|
      puts "Received ping: #{value}"
    end

    ws.onmessage do |msg|
      puts "Received Message: #{msg}"
      @clients.each do |socket|
        socket.send msg
      end
    end
  end

  def index
    @games = Field.where(count: '1')
    @ingames = Field.where(count: '2')
    if user_signed_in?
      @players = User.where(email: current_user.email).take
    end
  end

  def new
    if !Field.exists?(player1: current_user.email)
      field = Field.new
      Field.crtgfield(field, current_user.email)
        @user = User.where(email: current_user.email).take
        @user.playersid = 1
        @user.save
    end
    redirect_to user_root_path
  end

  def connecting
    if !Field.exists?(player1: current_user.email)
      @currentmail = params[:currentgame]
      @field = Field.where(player1: @currentmail).take
      @user = User.where(email: current_user.email).take
      @field.player2 = current_user.email
      @field.count = 2
      @user.playersid = 2
      @field.save
      @user.save
      redirect_to user_root_path
    end
  end
end
