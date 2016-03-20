class ChronosController < ApplicationController
	before_filter :authenticate_user!
    require 'json'
  def home
  	getStats
  	getJobs
  end

  def getJobs
  	@json = '[{"name": "job1","time": "10AM","status": "success"}, {"name": "job2","time": "11AM","status": "failed"},
  	{"name": "job3","time": "10AM","status": "idle"}, {"name": "job5","time": "10AM","status": "success"},
  	{"name": "job4","time": "10AM","status": "idle   "}, {"name": "job6","time": "10AM","status": "failed"}]'
  	@jobList = JSON.parse(@json)
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
