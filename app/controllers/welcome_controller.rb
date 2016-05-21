# WelcomeController
class WelcomeController < ApplicationController
  def index
    @games = Field.where(count: '1')
    @ingames = Field.where(count: '2')
    if user_signed_in?
      @players = User.where(email: current_user.email).take
    end
  end

  def new
    if !Field.exists?(player1: current_user.email) && !Field.exists?(player2: current_user.email)
      field = Field.new
      Field.CreatingField(field, current_user.email)

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
      Field.ConnectingField(@field, current_user.email)

      @user = User.where(email: current_user.email).take
      @user.playersid = 2
      @user.save
    end
    redirect_to user_root_path
  end

  def disconnect
    @user = User.where(email: current_user.email).take
    if @user.playersid == "1"
      @field = Field.where(player1: current_user.email)
      @user.playersid = nil
      @user2 = User.where(email: @field.player2).take
      @user2.save
      @field.destroy_all
      @user.save
    else
      if Field.exists?(player2: current_user.email)
        @field = Field.where(player2: current_user.email).take
        @user.playersid = nil
        @field.player2 = nil
        @field.count = 1
        @user.save
        @field.save
      end
    end
    redirect_to user_root_path
  end
end
