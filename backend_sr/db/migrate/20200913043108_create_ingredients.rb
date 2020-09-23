class CreateIngredients < ActiveRecord::Migration[6.0]
  def change
    create_table :ingredients do |t|
      t.string :name
      t.float :qty
      t.string :unit
      t.belongs_to :recipe
      t.timestamps
    end
  end
end
