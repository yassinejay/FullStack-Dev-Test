class Api::V1::InstallationsController < Api::V1::BaseController
  before_action :set_installation, only: [:show]
  
  def index
    render json: Installation.all.order(created_at: :desc)
  end

  def show
    render json: @installation
  end

  def create
    company = Company.find_or_create(company_params&.slice(:siren), company_params)
    customer = Customer.find_or_create(customer_params&.slice(:name), customer_params)
    if customer[:errors].present? || company[:errors].present?
      render_error(customer[:errors], company[:record], customer[:record])
    else
      check_installation(company[:record], customer[:record])
    end
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

  def check_installation(company, customer)
    installation = Installation.create(only_installation_params.merge({
                                                                        company_id: company.id,
                                                                        customer_id: customer.id
                                                                      }))
    if installation.save
      render status: :created
    else
      render_error(installation.errors.full_messages, company, customer)
    end
  end

  def render_error(errors, company, customer)
    company&.destroy
    customer&.destroy
    render json: { errors: errors }, status: :unprocessable_entity
  end
end
