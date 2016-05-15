class DockerController < ApplicationController

  DOCKER_URI = ENV["DOCKER_URI"]
  $application = "Docker Registry"
  def index
  	rest_resource = RestClient::Resource.new(DOCKER_URI+"/v2/_catalog", "", "")
    repoList = rest_resource.get
    @repoList = JSON.parse(repoList)
    @repoCount = @repoList['repositories'].length
    getTags(@repoList)
    rescue => ex
       render :template => "errors/internal_server_error"
  end
  def getTags(repoList)
  	@tagInfo = Array.new
  	@tagCount = 0
  	repoList['repositories'].each do |repo|
     rest_resource = RestClient::Resource.new(DOCKER_URI+ '/v2/' + repo + '/tags/list', "", "")
     repoDetail = rest_resource.get
     @repoDetail = JSON.parse(repoDetail)
     @tagInfo.push(@repoDetail)
     @tagCount += @repoDetail['tags'].length
   end
   rescue => ex
       render :template => "errors/internal_server_error"
 end
 def getTagDetail
  repo = params[:repo]
  tag = params[:tag]
  rest_resource = RestClient::Resource.new(DOCKER_URI+'/v2/' + repo + '/manifests/' + tag, "", "")
  tagDetail = rest_resource.get
  @tagDetail = JSON.parse(tagDetail)
  respond_to do |format|
    format.json { render json: @tagDetail, :status => :ok}
  end
  rescue => ex
       render :template => "errors/internal_server_error"
end
end
