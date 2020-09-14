class RecipesController < ApplicationController

    def index
        recipes = Recipe.all
        # binding.pry
              # [
        #     {
        #         id:1,
        #         name:'',
        #         serving:'01',
        #         image_url:'',
        #         direction:'',
        #         meal: recipe.meal,
        #     }, 
        #     {......}
        # ]
        render json: recipes.to_json(except: [:directions, :created_at, :updated_at])
    end

    def show
              # [
        #     {
        #         id:1,
        #         name:'',
        #         serving:'01',
        #         image_url:'',
        #         direction:'',
        #         meal: recipe.meal,
        #         ingredients:[
        #             {
        #                 id:1,
        #                 name:'',
        #                 qty:1,
        #                 unit: ingredient.unit
        #             }, .....
        #         ]
        #     }, 
        #     {......}
        # ]
    end

    def create

    end

    def update

    end

    def destroy

    end
end
