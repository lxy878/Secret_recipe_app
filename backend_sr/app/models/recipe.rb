class Recipe < ApplicationRecord
  belongs_to :meal
  has_many :ingredients

  def create_ingredients(params)
    params[:ingredients].each do |ingredient|
      self.ingredients.build(ingredient)
    end
  end

  def self.create_recipe(meal_params, recipe_params, ingredients_params)
    newRecipe = Recipe.new(recipe_params)
    newRecipe.meal = Meal.find_or_create_by(meal_params)
    newRecipe.create_ingredients(ingredients_params)
    newRecipe
  end

end
