class Recipe < ApplicationRecord
  belongs_to :meal
  has_many :ingredients

  def create_ingredients(params)
    params[:ingredients].each do |ingredient|
      self.ingredients.build(ingredient)
    end
  end
end
