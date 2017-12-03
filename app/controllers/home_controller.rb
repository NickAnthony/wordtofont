require 'rails/application_controller'

class HomeController < Rails::ApplicationController
  def index
  	render file: Rails.root.join('app/views/home', 'index.html.erb')
  end
  def new
  	render file: Rails.root.join('app/views/home', 'new.html.erb')
  end
end
