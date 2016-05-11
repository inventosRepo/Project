class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

 before_filter :configure_permitted_parameters, if: :devise_controller?

    protected

        def configure_permitted_parameters
            devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:code, :email, :password) }
            devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:email, :password) }
            devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:code, :email, :password, :current_password) }
        end

   def check_for_mobile
    session[:mobile_override] = params[:mobile] if params[:mobile]
    prepare_for_mobile if mobile_device?
  end

  def prepare_for_mobile
    prepend_view_path Rails.root + 'app' + 'views_mobile'
  end

  def mobile_device?
    if session[:mobile_override]
      session[:mobile_override] == "1"
    else
      # Season this regexp to taste. I prefer to treat iPad as non-mobile.
      (request.user_agent =~ /Mobile|webOS|Android/) && (request.user_agent !~ /iPad/)
    end
  end
  helper_method :mobile_device?


before_filter :check_for_mobile


end
