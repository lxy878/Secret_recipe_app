class RecipesController < ApplicationController

    def index
        recipes = Recipe.all
        # fix: move to model
        render json: recipes.to_json(
            include:{
                meal: {
                    only: [:name, :id]
                }
            }, except: [:meal_id, :created_at, :updated_at]
        )
    end

    def show
        recipe = Recipe.find_by(id: params[:id])

        if recipe
            # fix: move to model
            render json: recipe.to_json(include: {
                meal: {
                    only: [:name, :id]
                },
                ingredients: {
                    include: {
                        unit:{
                            only: [:id, :name]
                        }
                    },
                    only: [:id, :name, :qty]
                }
            }, except: [:created_at, :updated_at, :meal_id])
        else
            render json: {message: 'error'}
        end
    end

    def create

    end

    def update

    end

    def destroy

    end
end
