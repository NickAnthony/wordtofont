class Api::V1::DescriptorsController < ApiController
  before_action :set_descriptor, only: [:show, :update, :destroy]

  # GET /descriptors
  def index
    @descriptors = Descriptor.all

    render json: @descriptors
  end

  # GET /descriptors/1
  def show
    render json: @descriptor
  end

  # POST /descriptors
  def create
    @descriptor = Descriptor.new(descriptor_params)

    if @descriptor.save
      render json: @descriptor, status: :created, location: @descriptor
    else
      render json: @descriptor.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /descriptors/1
  def update
    if @descriptor.update(descriptor_params)
      render json: @descriptor
    else
      render json: @descriptor.errors, status: :unprocessable_entity
    end
  end

  # DELETE /descriptors/1
  def destroy
    @descriptor.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_descriptor
      @descriptor = Descriptor.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def descriptor_params
      params.require(:descriptor).permit(:word, :font_name, :font_id)
    end
end
