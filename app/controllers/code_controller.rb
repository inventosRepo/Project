class CodeController < ApplicationController
  def new

  end
  def hi
    @code = params[:code]
    sign_in(:user, User.find_by(code: @code))  
  end
end
