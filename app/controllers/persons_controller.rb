require 'timers'

class PersonsController < ApplicationController

  class Password < ActiveRecord::Base
  end

  def profile
    @p = Password.new
    @p.update(email: current_user.email)
    @p.update(password: "dsfdsffds")
  end
  
  def mobile
    @password = Password.find_by(params[:email])
  end

  def confirm
    @password = Password.new
    if @password.find_by(password_params)
      redirect_to render_root_path
    else
      redirect_to error_root_path
    end
  end

  private
  def password_params
    params.require(:password).permit(:password)
  end
end
