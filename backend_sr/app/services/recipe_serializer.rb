class RecipeSerializer

    def initialize(recipe_object)
        @recipe = recipe_object
    end

    def index_json
        options = {
            include:{
                meal: {
                    only: [:name, :id]
                }
            }, except: [:meal_id, :created_at, :updated_at]
        }
        @recipe.to_json(options)
    end

    def show_json
        options = {
            include: {
                meal: {
                    only: [:name, :id]
                },
                ingredients: {
                    only: [:id, :name, :qty, :unit]
                }
            }, 
            except: [:created_at, :updated_at, :meal_id]
        }
        @recipe.to_json(options)
    end
end