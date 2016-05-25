Rails.application.routes.draw do
  devise_for :users
  root 'welcome#index', as: 'user_root'
  post 'code/hi'
  get 'code/hi'
  post 'code/new'
  get 'code/new'
  post 'welcome/new'
  post 'welcome/connecting'
  post 'welcome/disconnect'
  post 'welcome/save'
  post 'welcome/index'
  post 'welcome/generate_code'
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
