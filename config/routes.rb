Rails.application.routes.draw do
  devise_for :users
  get 'persons/profile'

root 'welcome#index'
get 'persons/profile', as: 'user_root'
get 'welcome/chat', as: 'chat'
get 'welcome/mobile_buttons', as: 'mobile_buttons'
get 'welcome/mobile_auth', as: 'mobile_auth'
post 'persons/profile'
post 'persons/generate'
post 'welcome/mobile_auth'
post 'welcome/mobile_buttons'

end
