class CompanySerializer < ActiveModel::Serializer
  attributes :id, :name, :siren

  has_many :installations
end
