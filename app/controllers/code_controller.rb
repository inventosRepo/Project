class CodeController < ApplicationController
  def new

  end
  def hi
    if(params[:code] == "" || User.find_by(code: params[:code]) == nil)
      redirect_to code_error_path      
    else
      sign_in(:user, User.find_by(code: params[:code])); 
      @user =  User.find_by(code: params[:code]);
      @user.code = nil;
      @user.save;
    end	
  end
  def error

  end
end
