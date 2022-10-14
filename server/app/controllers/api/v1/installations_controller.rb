class Api::V1::InstallationsController < Api::V1::BaseController
  before_action :set_installation, only: [:show]
  
  def index
    render json: Installation.all.order(created_at: :desc)
  end

  def show
    render json: @installation
  end

  def create
    check_installation
  end

  private

  def set_installation
    @installation = Installation.find_by(id: params[:id])
  end

  def installation_params
    params.permit(installation:
      [:address, :installed_at, :panels_number, :kind, :panels_identification,
       { company: %i[name siren] },
       { customer: %i[name email phone_number] }])
  end

  def customer_params
    installation_params[:installation][:customer]
  end

  def company_params
    installation_params[:installation][:company]
  end

  def only_installation_params
    installation_params[:installation].except(:company, :customer)
  end

  def check_installation
    installation = Installation.create_installation(only_installation_params, company_params, customer_params)
    installation[:record].present? ? (render status: :created) : render_error(installation[:errors])
  end

  def render_error(errors)
    render json: { errors: errors }, status: :unprocessable_entity
  end
end
