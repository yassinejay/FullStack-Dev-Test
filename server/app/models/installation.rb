class Installation < ApplicationRecord
  # ========== Associations
  belongs_to :company
  belongs_to :customer

  # ========== Enumerations
  enum kind: %i[photovoltaic hybrid]

  # ========== Validations
  validates :panels_identification, presence: true, length: { is: 6 }
  validates :installed_at, :kind, :panels_number, presence: true
end
