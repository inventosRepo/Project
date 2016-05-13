class PersonsController < ApplicationController
  def profile
  end

  def generate
    @user = User.where(email: current_user.email).take
    User.generate_code(@user)
  end
end
