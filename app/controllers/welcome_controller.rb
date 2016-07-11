# WelcomeController
class WelcomeController < ApplicationController
  def index
  end

  def generate_code
    @user = User.where(email: current_user.email).take
    @user.generate_code
    respond_to do |format|
      format.js { render json: @user }
    end
  end
end
