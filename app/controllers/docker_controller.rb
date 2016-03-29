class DockerController < ApplicationController
  
  HOST_URI = "http://s025wpll6601.s4.chp.cba:8443"
  def index
  	rest_resource = RestClient::Resource.new(HOST_URI+"/v2/_catalog", "", "")
    repoList = rest_resource.get
    @repoList = JSON.parse(repoList)
    getTags(@repoList)
  end
  def getTags(repoList)
  	@tagInfo = Array.new
  	repoList['repositories'].each do |repo|
	  rest_resource = RestClient::Resource.new(HOST_URI+ '/v2/' + repo + '/tags/list', "", "")
      repoDetail = rest_resource.get
      @repoDetail = JSON.parse(repoDetail)
      @tagInfo.push(@repoDetail)
	end 
  end
  def getTagDetail
    @the_start = "asdfasdf"
    render json: @the_start
  end
end
