class PersonsController < ApplicationController

  def generate
     a = ("a".."z").to_a
    @user = User.find_by(email: current_user.email);
    @user.code = a[1..6].shuffle.join;
    @user.save;
  end

end