class Installation < ApplicationRecord
  # ========== Associations
  belongs_to :company
  belongs_to :customer

  # ========== Enumerations
  enum kind: %i[photovoltaic hybrid]

  # ========== Validations
  validates :panels_identification, presence: true, length: { is: 6 }
  validates :installed_at, :kind, :panels_number, presence: true

  def self.create_installation(installation, company, customer)
    new_company = Company.find_or_create(company&.slice(:siren), company)
    new_customer = Customer.find_or_create(customer&.slice(:name), customer)

    Installation.transaction do
      new_installation = create(installation.merge({
                                                     company_id: new_company[:record]&.id,
                                                     customer_id: new_customer[:record]&.id
                                                   }))
      new_installation.save!
      { record: new_installation }
    end
  rescue ActiveRecord::RecordInvalid => e
    { record: nil, errors: e.message }
  end
end
