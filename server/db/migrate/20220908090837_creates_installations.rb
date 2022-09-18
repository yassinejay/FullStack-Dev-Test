class CreatesInstallations < ActiveRecord::Migration[6.1]
  def change
    create_table :installations do |t|
      t.text :address, null: false
      t.datetime :installed_at, null: false
      t.string :panels_number, null: false
      t.integer :kind, null: false
      t.integer :panels_identification, null: false
      t.references :company, foreign_key: true, index: true
      t.references :customer, foreign_key: true, index: true
      t.timestamps
    end
  end
end
