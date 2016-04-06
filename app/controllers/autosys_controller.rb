class AutosysController < ApplicationController

	URI = "http://127.0.0.1:5000"
	def index
		@failureCount = 0
		@successCount = 0
		@idleCount = 0
		keyword = params[:keyword]
		if keyword != nil
			rest_resource = RestClient::Resource.new(URI+"/jobList?keyword="+keyword, "", "")
			jobList = rest_resource.get
			@jobList = JSON.parse(jobList)
			@jobList.each do |job|
				if job['status'] == 'SU'
					@successCount += 1
				elsif job['status'] == 'FA'
					@failureCount += 1
				else
					@idleCount += 1
				end
			end 
		elsif
			@jobList = []
			#@jobList = JSON.parse(@json)
		end		
		@failedJobs  = @failureCount
		@successJobs = @successCount
		@idleJobs    = @idleCount
		@totalJob    = @successJobs + @failedJobs + @idleJobs 
	end

	def getJobDetail
		jobName = params[:jobName]
		rest_resource = RestClient::Resource.new(URI+'/jobPreviousRuns?jobName='+jobName, "", "")
		jobDetail = rest_resource.get
		@jobDetail = JSON.parse(jobDetail)
		respond_to do |format|
			format.json { render json: @jobDetail, :status => :ok}
		end
	end

	def getJobs
	end

end
