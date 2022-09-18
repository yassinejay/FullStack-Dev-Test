class InstallationSerializer < ActiveModel::Serializer
  attributes :id, :address, :installed_at, :panels_number, :kind, :panels_identification, :company, :customer

  belongs_to :company
  belongs_to :customer
end
