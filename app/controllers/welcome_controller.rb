# WelcomeController
class WelcomeController < ApplicationController
  def index
    @games = Field.where(count: '1')
    @ingames = Field.where(count: '2')
  end

  def new
    if !Field.exists?(player1: current_user.email)
      field = Field.new
      Field.crtgfield(field, current_user.email)
    end
    redirect_to user_root_path
  end

  def connecting
    @currentmail = params[:currentgame]
    @field = Field.where(player1: @currentmail).take
    @field.player2 = current_user.email
    @field.count = 2
    @field.save
    redirect_to user_root_path
  end
end
