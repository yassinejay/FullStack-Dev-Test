class Customer < ApplicationRecord
  include Checkable

  # ========== Associations
  has_many :installations, dependent: :destroy
  has_many :companies, through: :installations

  # ========== Validations
  validates :name, uniqueness: true, presence: true
  validates :email, presence: true, format: { with: /\A.*@.*\..*\z/ }
  validates :phone_number, presence: true, format: { with: /\A(?:\+?\d{1,3}\s*-?)?\(?(?:\d{3})?\)?[- ]?\d{3}[- ]?\d{4,6}\z/ }
end
