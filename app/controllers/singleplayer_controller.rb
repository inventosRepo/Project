class SingleplayerController < ApplicationController
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
  end
end
