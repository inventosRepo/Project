# WelcomeController
class WelcomeController < ApplicationController
  def generate_code
    @user = User.where(email: current_user.email).take
    @user.generate_code
    respond_to do |format|
      format.js
    end
  end
end
