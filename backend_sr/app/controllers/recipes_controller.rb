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
                    only: [:id, :name, :qty, :unit]
                }
            }, 
            except: [:created_at, :updated_at, :meal_id])
        else
            render json: {message: 'error'}
        end
    end

    def create
        # refactor and fix when image and meal are empty
        # find or create meal
        meal = Meal.find_or_create_by(meal_params)
        newRecipe = Recipe.new(recipe_params)
        newRecipe.meal = meal

        # ingredients permit and looping
        newRecipe.create_ingredients(ingredients_params)

        if newRecipe.save
            render json: newRecipe.to_json()
        else
            render json: {message: 'error'}
        end
    end

    def update

    end

    def destroy
        recipe = Recipe.find_by(id: params[:id])
        if recipe
            recipe.destroy
            render json: {message: 'Destroy'}.to_json()
        else
            render json: {message: 'error'}.to_json()
        end

    end

    private

    def params_permit(key, *args)
        # params.require(key).permit()  
    end

    def ingredients_params
        params.permit(ingredients:[:name, :qty, :unit])
    end

    def meal_params
        params.require(:meal).permit(:name)
    end


    def recipe_params
        # <ActionController::Parameters {
        #     "authenticity_token"=>"KeEmysICyJ2GNbLC2WoGViKrbLzCiZniRXmQ06tbJsMtLXpvqfZDU/dP9YHNE2WMd7sSRXQ+U34vje7E7QBIVw==",
        #      "commercial"=>{
        #          "title"=>"sdfdf", 
        #          "description"=>"dfdfdf",
        #         "state_attributes"=>{
        #             "name"=>"North Carolina"
        #         }
        #     },
        #     "commit"=>"Create Commercial",
        #     "controller"=>"commercials",
        #     "action"=>"create"
        # } permitted: false>
        
        # params.require(:commercial).permit(:title, :description, state_attributes:[:name])
        params.require(:recipe).permit(:name, :serving, :image_url, :directions)
    end
end
