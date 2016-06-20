Rails.application.routes.draw do
  devise_for :users
  root 'welcome#index', as: 'user_root'
  post 'code/hi'
  get 'code/hi'
  post 'code/new'
  get 'code/new'
  get 'welcome/change_level'
  post 'welcome/change_level'
  post 'welcome/new'
  post 'welcome/connecting'
  post 'welcome/disconnect'
  post 'welcome/save'
  post 'welcome/index'
  post 'welcome/generate_code'
  get 'welcome/generate_code'
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
    end
  end
end
