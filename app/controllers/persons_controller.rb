class PersonsController < ApplicationController
  def profile
  end

  def generate
    @user = User.where(email: current_user.email).take
    @user.generate_code
  end
end
