class CreateDescriptors < ActiveRecord::Migration[5.1]
  def change
    create_table :descriptors do |t|
      t.string :word
      t.string :font_name
      t.integer :font_id

      t.timestamps
    end
  end
end
