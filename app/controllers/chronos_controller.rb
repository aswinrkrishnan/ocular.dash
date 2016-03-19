class ChronosController < ApplicationController
	before_filter :authenticate_user!
  def home
  	getStats
  end

  def getJobs
  end

  def getStats
  	@failedJobs  = 10
  	@successJobs = 10
  	@idleJobs    = 10
  	@totalJob    = @successJobs + @failedJobs + @idleJobs 
  end

  def getJobInfo
  end
end
