class OpslogicalController < ApplicationController
	before_filter :authenticate_user!
    require 'json'
    require 'rest_client'
  def index
  	
    #@lines = JSON.parse(lines)
  end
end
