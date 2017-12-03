class CreateFonts < ActiveRecord::Migration[5.1]
  def change
    create_table :fonts do |t|
      t.string :name
      t.string :family
      t.string :style
      t.string :weight

      t.timestamps
    end
  end
end
