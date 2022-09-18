class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone_number

  has_many :installations
end
