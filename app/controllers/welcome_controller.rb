class WelcomeController < ApplicationController

require 'thin'
require 'em-websocket'
require 'sinatra/base'

EM.run do
  class App < Sinatra::Base
    get '/' do
      erb :index
    end
  end

  @clients = []

  EM::WebSocket.start(:host => '0.0.0.0', :port => '3001') do |ws|
    ws.onopen do |handshake|
      @clients << ws
      ws.send "Connected"
    end

    ws.onclose do
      ws.send "Closed."
      @clients.delete ws
    end

    ws.onmessage do |msg|
      puts "Received Message: #{msg}"
      @clients.each do |socket|
        socket.send msg
      end
    end
  end

  App.run! :port => 3002
end

  def index
    user_agent =  request.env['HTTP_USER_AGENT'].downcase
    if user_agent.index('iphone')
      redirect_to mobile_auth_path
    end    
  end 

  def chat
  end

  def mobile_auth
  end

  def mobile_buttons
    @code = params[:code]
    sign_in(:user, User.find_by(code: @code))
  end

end
