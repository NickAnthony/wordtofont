require 'test_helper'

class FontsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @font = fonts(:one)
  end

  test "should get index" do
    get fonts_url, as: :json
    assert_response :success
  end

  test "should create font" do
    assert_difference('Font.count') do
      post fonts_url, params: { font: { family: @font.family, name: @font.name, style: @font.style, weight: @font.weight } }, as: :json
    end

    assert_response 201
  end

  test "should show font" do
    get font_url(@font), as: :json
    assert_response :success
  end

  test "should update font" do
    patch font_url(@font), params: { font: { family: @font.family, name: @font.name, style: @font.style, weight: @font.weight } }, as: :json
    assert_response 200
  end

  test "should destroy font" do
    assert_difference('Font.count', -1) do
      delete font_url(@font), as: :json
    end

    assert_response 204
  end
end
