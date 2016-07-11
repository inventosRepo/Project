Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  root 'welcome#index', as: 'user_root'
  post 'code/hi'
  get 'code/hi'
  post 'code/new'
  get 'code/new'
  get 'multiplayer/change_level'
  post 'multiplayer/change_level'
  post 'multiplayer/new'
  post 'multiplayer/connecting'
  post 'multiplayer/disconnect'
  get 'multiplayer/set_pos'
  post 'multiplayer/set_pos'
  post 'multiplayer/index'
  post 'welcome/generate_code'
  get 'welcome/generate_code'
  post 'welcome/index'
  get 'welcome/index'
  get 'multiplayer/index', as: 'multiplayer'
  post 'multiplayer/index'
  get 'singleplayer/index', as: 'singleplayer'
  resources :welcome do
    member do
      post 'new'
    end
  end

  resources :persons do
    collection do
      post 'profile'
      get 'profile'
      post 'generate'
      post 'index'
    end
  end
end
