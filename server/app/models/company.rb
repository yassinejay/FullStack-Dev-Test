class Company < ApplicationRecord
  include Checkable

  # ========== Associations
  has_many :installations, dependent: :destroy
  has_many :customers, through: :installations
  # ========== Validations
  validates :name, :siren, presence: true, uniqueness: true
  validates :siren, length: { is: 9 }
end
