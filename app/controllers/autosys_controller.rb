class AutosysController < ApplicationController

	$application = "Autosys"
	AUTOSYS_URI = ENV["AUTOSYS_URI"]
	def index
		@failureCount = 0
		@successCount = 0
		@idleCount = 0
		keyword = params[:keyword]
		if keyword != nil
			rest_resource = RestClient::Resource.new(AUTOSYS_URI+"/jobList?keyword="+keyword, :timeout => -1, :open_timeout => -1)
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
		end		
		@failedJobs  = @failureCount
		@successJobs = @successCount
		@idleJobs    = @idleCount
		@totalJob    = @successJobs + @failedJobs + @idleJobs 
		rescue => ex	
			render :template => "errors/internal_server_error"
	end

	def jobPreviousRuns
		jobName = params[:jobName]
		rest_resource = RestClient::Resource.new(AUTOSYS_URI+'/jobPreviousRuns?jobName='+jobName, :timeout => -1, :open_timeout => -1)
		jobDetail = rest_resource.get
		@jobDetail = JSON.parse(jobDetail)
		respond_to do |format|
			format.json { render json: @jobDetail, :status => :ok}
		end
		rescue => ex
			 render :template => "errors/internal_server_error"
	end

	def getJobDesc
		jobName = params[:jobName]
		rest_resource = RestClient::Resource.new(AUTOSYS_URI+'/getJobDesc?jobName='+jobName, :timeout => -1, :open_timeout => -1)
		jobDetail = rest_resource.get
		@jobDetail = JSON.parse(jobDetail)
		respond_to do |format|
			format.json { render json: @jobDetail, :status => :ok}
		end
	end

	def getJobRunDetail
		jobName = params[:jobName]
		rest_resource = RestClient::Resource.new(AUTOSYS_URI+'/getJobRunDetail?jobName='+jobName, :timeout => -1, :open_timeout => -1)
		jobDetail = rest_resource.get
		@jobDetail = JSON.parse(jobDetail)
		respond_to do |format|
			format.json { render json: @jobDetail, :status => :ok}
		end
		rescue => ex
			 render :template => "errors/internal_server_error"
	end

	def getJobLog
		fileName = params[:fileName]
		logType = params[:logType]
		timeSuffix = params[:timeSuffix]
		rest_resource = RestClient::Resource.new(AUTOSYS_URI+'/getLog?fileName='+fileName+'&logType='+logType+'&timeSuffix='+timeSuffix, :timeout => -1, :open_timeout => -1)
		jobLog = rest_resource.get	
		send_data jobLog
		rescue => ex
			 render :template => "errors/internal_server_error"
	end

end
