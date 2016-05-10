class WelcomeController < ApplicationController

before_filter :authenticate_user!, :except => [:index, :mobile_auth]  

  def index
    user_agent =  request.env['HTTP_USER_AGENT'].downcase
    if user_agent.index('iphone')
      redirect_to mobile_auth_path
    end    
  end 

  def chat
  end

  def mobile_auth
  end

  def mobile_buttons
    if user_signed_in?
      @user = @user = User.find_by(email: current_user.email)
      sign_in(:user, @user)
    else
      @code = params[:code]
      @user = User.find_by(code: @code)
      if @user.nil?
        redirect_to error_path
      else
        sign_in(:user, @user)
      end
    end
  end

end
