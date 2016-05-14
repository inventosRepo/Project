class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_filter :check_for_mobile

  protected

  def check_for_mobile
    session[:mobile_override] = params[:mobile] if params[:mobile]
    prepare_for_mobile if mobile_device?
  end

  def prepare_for_mobile
    prepend_view_path Rails.root + 'app' + 'views_mobile'
  end

  def mobile_device?
    if session[:mobile_override]
      session[:mobile_override] == '1'
    else
      (request.user_agent =~ /Mobile|webOS|Android/)
    end
  end
  helper_method :mobile_device?
end
