class CodeController < ApplicationController
  def hi
    if params[:code] == '' || !User.exists?(code: params[:code])
      flash[:error] = 'Wrong code. Please try again'
    else
      @user = User.where(code: params[:code]).take
      sign_in(:user, @user)
      @user.remove_code
    end
    redirect_to user_root_path
  end
end
