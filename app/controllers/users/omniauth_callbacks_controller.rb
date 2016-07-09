class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def vkontakte
    @user = User.from_omniauth(request.env['omniauth.auth'])
    sign_in @user
    redirect_to user_root_path
  end
end
