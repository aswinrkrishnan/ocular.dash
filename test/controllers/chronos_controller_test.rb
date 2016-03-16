require 'test_helper'

class ChronosControllerTest < ActionController::TestCase
  test "should get home" do
    get :home
    assert_response :success
  end

  test "should get getJobs" do
    get :getJobs
    assert_response :success
  end

  test "should get getStats" do
    get :getStats
    assert_response :success
  end

  test "should get getJobInfo" do
    get :getJobInfo
    assert_response :success
  end

end
