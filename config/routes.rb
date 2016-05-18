Rails.application.routes.draw do
  devise_for :users
  root 'welcome#index', as: 'user_root'

  post 'code/hi'
  get 'code/hi'
  post 'code/new'
  get 'code/new'
  post 'welcome/new'
  post 'welcome/connecting'
  resources :welcome do
    member do
      post 'index'
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
