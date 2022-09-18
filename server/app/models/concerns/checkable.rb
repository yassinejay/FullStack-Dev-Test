module Checkable
  extend ActiveSupport::Concern

  class_methods do
    def find_or_create(field, params)
      record = find_by(field)

      return { record: record } unless record.blank?

      record = create(params)
      return { record: record } if record.save

      { record: nil, errors: record.errors.full_messages }
    end
  end
end
