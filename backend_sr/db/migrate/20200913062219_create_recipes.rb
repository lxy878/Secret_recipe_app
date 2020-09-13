class CreateRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :serving
      t.string :image_url
      t.string :directions
      t.belongs_to :meal

      t.timestamps
    end
  end
end
