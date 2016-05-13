class CodeController < ApplicationController
  def new
  end

  def hi
    if params[:code] == '' || !User.exists?(code: params[:code])
      flash[:error] = 'Wrong code. Please try again'
      redirect_to code_new_path
    else
      @user = User.where(code: params[:code]).take
      sign_in(:user, @user)
      User.remove_code(@user)
    end
  end
end
