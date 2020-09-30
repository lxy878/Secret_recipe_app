class RecipesController < ApplicationController

    def index
        recipes = Recipe.all
        render json: RecipeSerializer.new(recipes).index_json
    end

    def show
        recipe = Recipe.find_by(id: params[:id])
        if recipe
            render json: RecipeSerializer.new(recipe).show_json
        else
            render json: {error: "Recipe doesn't exist."}.to_json()
        end
    end

    def create
        newRecipe = Recipe.create_recipe(meal_params, recipe_params, ingredients_params)
        if newRecipe.save
            render json: RecipeSerializer.new(newRecipe).index_json
        else
            render json: {error: 'Create new recipe failed'}.to_json()
        end
    end

    def destroy
        recipe = Recipe.find_by(id: params[:id])
        if recipe
            recipe.destroy
            render json: {message: "Recipe deleted"}.to_json()
        else
            render json: {error: 'Delete recipe failed'}.to_json()
        end

    end

    private

    def ingredients_params
        params.permit(ingredients:[:name, :qty, :unit])
    end

    def meal_params
        params.require(:meal).permit(:name)
    end


    def recipe_params
        params.require(:recipe).permit(:name, :serving, :image_url, :directions)
    end
end
