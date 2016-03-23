class DockerController < ApplicationController
  
  HOST_URI = "http://s025wpll6601.s4.chp.cba:8443"
  def index
  	rest_resource = RestClient::Resource.new(HOST_URI+"/v2/_catalog", "", "")
    repoList = rest_resource.get
    @repoList = JSON.parse(repoList)
  end
end
