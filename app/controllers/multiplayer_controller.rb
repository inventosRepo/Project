class MultiplayerController < ApplicationController
  skip_before_filter :verify_authenticity_token, only: [:index]
  def index
    if user_signed_in?
      @user = User.where(email: current_user.email).take
      @current_game = if @user.playersid == '1'
                        Field.where(player1: current_user.email).take
                      else
                        Field.where(player2: current_user.email).take
                      end
      level = User.where(email: current_user.email).take
      map = Level.find(level.user_level)
      if @current_game.nil?
        @level_map = map.data
      else
        if user_signed_in? && @current_game.save_game == 0 && !@current_game.nil?
          @level_map = map.data
          @arr_tanks = @current_game.save_arrs_tanks
        else
          @level_map = @current_game.map
          @arr_tanks = @current_game.save_arrs_tanks
        end
        gon.arr_tanks = @arr_tanks

        @save_level = params[:lvlmap]
        @save_arrs_tanks = params[:arrs_tanks]
        # Запись в бд
        unless @save_level.nil?
          @current_game.map = @save_level
          @current_game.save_arrs_tanks = @save_arrs_tanks
          @current_game.save_game = 1
          @current_game.save
        end
      end
    end

    @games = Field.where(online_players: '1')
    @ingames = Field.where(online_players: '2')
    @pos_x = params[:pos_x]
    @pos_y = params[:pos_y]
    # pos_writing
    if @pos_x.nil? && @pos_y.nil?
      @user.player_x = 0
      @user.player_y = 0
    else
      @user.player_x = @pos_x
      @user.player_y = @pos_y
    end
    @user.save
    respond_to do |format|
      format.html
      format.json { render json: @user }
    end

    if user_signed_in?
      @players = User.where(email: current_user.email).take if user_signed_in?
      @players.user_level = 1
      @players.save
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
    redirect_to multiplayer_index_path
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
    redirect_to multiplayer_index_path
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
        @field.online_players = 1
        @user.save
        @field.save
      end
    end
    redirect_to multiplayer_index_path
  end
end
