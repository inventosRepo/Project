class MultiplayerController < ApplicationController
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
      unless @current_game.nil?
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
      else
        @level_map = map.data
      end
    end

    @games = Field.where(online_players: '1')
    @ingames = Field.where(online_players: '2')
    @pos_x = params[:pos_x]
    @pos_y = params[:pos_y]
    # pos_writing
    unless @pos_x.nil? && @pos_y.nil?
      @user.player_x = @pos_x
      @user.player_y = @pos_y
      @user.save
    else
      @user.player_x = 0
      @user.player_y = 0
      @user.save
    end
    respond_to do |format|
      format.html
      format.json { render json: @user }
    end
  end
end
