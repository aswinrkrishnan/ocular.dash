class ChronosController < ApplicationController
	before_filter :authenticate_user!
  def home
  	@jobCount = 10
  end

  def getJobs
  end

  def getStats
  end

  def getJobInfo
  end
end
