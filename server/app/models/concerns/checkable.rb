module Checkable
  extend ActiveSupport::Concern

  class_methods do
    def find_or_create(field, params)
      record = find_by(field)

      return { record: record } unless record.blank?

      ActiveRecord::Base.transaction do
        record = create(params)
        record.save!
        { record: record }
      end
    rescue ActiveRecord::RecordInvalid => e
      { record: nil, errors: e.message }
    end
  end
end
