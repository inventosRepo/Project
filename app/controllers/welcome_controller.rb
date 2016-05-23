# WelcomeController
class WelcomeController < ApplicationController
  skip_before_filter :verify_authenticity_token, only: [:index]
  def index
    if user_signed_in?
      level = User.where(email: current_user.email).take
      @map = Level.SelectLevel(level.user_level)
    end
    @position_1 = params[:position_first_tank]
    @position_2 = params[:position_second_tank]
    # Запись в бд
    if user_signed_in? && (!@position_1.nil? || !@position_2.nil?)
      @user = User.where(email: current_user.email).take
      if @user.playersid == '1'
        @field = Field.where(player1: current_user.email).take
        @field.position_1 = @position_1
      else
        @field = Field.where(player2: current_user.email).take
        @field.position_2 = @position_2
      end
      @field.save
    end

    @games = Field.where(count: '1')
    @ingames = Field.where(count: '2')
    @players = User.where(email: current_user.email).take if user_signed_in?
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
    unless Field.exists?(player1: current_user.email)
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
    if @user.playersid == '1'
      @field = Field.where(player1: current_user.email)
      @game = Field.where(player1: current_user.email).take
      @user.playersid = nil
      unless @game.player2.nil?
        @user2 = User.where(email: @game.player2).take
        @user2.playersid = nil
        @user2.save
      end
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

  def save
  end
end
