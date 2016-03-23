class ChronosController < ApplicationController
	before_filter :authenticate_user!
	require 'json'
	require 'rest_client'
	def home
	
    @jobList = JSON.parse(@json) # we will convert the return
    @failureCount = 0
    @successCount = 0
    @idleCount = 0
    @jobList.each do |job|
    	if (job['lastSuccess'] <=> job['lastError']) == 1
    		@successCount += 1
    	elsif (job['lastSuccess'] <=> job['lastError']) == -1
    		@failureCount += 1
    	else
    		@idleCount += 1
    	end
    end 
    @failedJobs  = @failureCount
    @successJobs = @successCount
    @idleJobs    = @idleCount
    @totalJob    = @successJobs + @failedJobs + @idleJobs 
end
end
