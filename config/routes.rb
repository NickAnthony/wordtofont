Rails.application.routes.draw do
  	# get 'home/index'

	namespace :api do 
	  namespace :v1 do 
	  		resources :fonts
	    	resources :descriptors
	    end 
	end
	# get '*other', to: 'home#index'
	get 'home/new', to: 'home#new'
	get 'home/index', to: 'home#index'
	root 'home#index'

end
