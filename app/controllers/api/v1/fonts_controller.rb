class Api::V1::FontsController < ApiController
  before_action :set_font, only: [:show, :update, :destroy]

  # GET /fonts
  def index
    # If we need to get a specific font
    if params[:font_id].present?
      @font = Font.find(params[:font_id])
      render json: {status: 'SUCCESS', message: 'Loaded selected fonts', data: @font}, status: :ok
    else
      @fonts = Font.joins(:descriptors).where(:descriptors => {:word => params[:descriptor]}).where("descriptors.font_name = fonts.name")
      render json: {status: 'SUCCESS', message: 'Loaded selected fonts', data: @fonts}, status: :ok
    end
  end

  # GET /fonts/1
  def show
    render json: @font
  end

  # POST /fonts
  def create
    # If font is already in database, don't add it again
    if Font.find_by(name: params[:name], family: params[:family], style: params[:style]).present?
      render json: {status: 'SUCCESS', message: 'Font already exists', data: ''}, status: :ok
    else
      # Font is not in database, so add it
      @font = Font.new(
        :name => params[:name], 
        :family => params[:family], 
        :style => params[:style], 
      )
      if @font.save
        render json: @font, status: :created, location: @font
      else
        render json: @font.errors, status: :unprocessable_entity
      end
    end
  end

  # PATCH/PUT /fonts/1
  def update
    if @font.update(font_params)
      render json: @font
    else
      render json: @font.errors, status: :unprocessable_entity
    end
  end

  # DELETE /fonts/1
  def destroy
    @font.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_font
      @font = Font.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def font_params
      params.require(:font).permit(:name, :family, :style, :weight)
    end
end
