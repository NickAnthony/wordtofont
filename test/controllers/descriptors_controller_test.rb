require 'test_helper'

class DescriptorsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @descriptor = descriptors(:one)
  end

  test "should get index" do
    get descriptors_url, as: :json
    assert_response :success
  end

  test "should create descriptor" do
    assert_difference('Descriptor.count') do
      post descriptors_url, params: { descriptor: { font_id: @descriptor.font_id, font_name: @descriptor.font_name, word: @descriptor.word } }, as: :json
    end

    assert_response 201
  end

  test "should show descriptor" do
    get descriptor_url(@descriptor), as: :json
    assert_response :success
  end

  test "should update descriptor" do
    patch descriptor_url(@descriptor), params: { descriptor: { font_id: @descriptor.font_id, font_name: @descriptor.font_name, word: @descriptor.word } }, as: :json
    assert_response 200
  end

  test "should destroy descriptor" do
    assert_difference('Descriptor.count', -1) do
      delete descriptor_url(@descriptor), as: :json
    end

    assert_response 204
  end
end
