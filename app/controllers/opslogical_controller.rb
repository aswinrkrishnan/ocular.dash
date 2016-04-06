class OpslogicalController < ApplicationController
	before_filter :authenticate_user!
    require 'json'
    require 'rest_client'
  def index
  	lines = rest_resource.get
    @lines = JSON.parse(lines)
    
  end
end
