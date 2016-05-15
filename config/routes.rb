Rails.application.routes.draw do

  get 'errors/not_found'

  get 'errors/internal_server_error'

  root 'chronos#home'

  get 'chronos/home'

  get 'chronos/getJobs'

  get 'chronos/getStats'

  get 'chronos/getJobInfo'

  get 'opslogical/index'

  get 'docker/index'

  get 'docker/getTagDetail'

  get 'autosys/index'

  get 'autosys/getJobRunDetail'

  get 'autosys/jobPreviousRuns'

  get 'autosys/getJobDesc'

  get 'autosys/getJobLog'

  match "/404", :to => "errors#not_found", :via => :all

  match "/500", :to => "errors#internal_server_error", :via => :all

  match "*path", :to => "errors#not_found", :via => :all

end
