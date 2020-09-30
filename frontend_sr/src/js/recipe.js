class Recipe{
    constructor(recipe){
        this.id = recipe.id;
        this.directions = recipe.directions;
        this.name = recipe.name;
        this.imageUrl = recipe.image_url;
        this.serving = recipe.serving;
        this.meal = recipe.meal;
        this.ingredients = recipe.ingredients;
    }

    recipeItem(index){
        return `<img src=${this.imageUrl} alt="Image">
        <div id='item-detail'>
            <h4 id='word_wrap'>${this.name}</h4>
            <p id='inform'>serving: ${this.serving}</p>
            <p id='inform'>meal: ${this.meal.name}</p>
            <div id='item_buttons' class='${this.id}' array_index='${index}'><div>
        </div>`
    }

    recipeDetails(){
        return ` <h1 id='recipe_title'>${this.name}</h1>
        <img src="${this.imageUrl}" alt="No Image" id='recipe_image'>
        <div id='recipe_details'>
            <p><strong><span>Meal: </span></strong>${this.meal.name}</p>
            <p><strong><span>Serving People: </span></strong> ${this.serving}</p>
        </div>

        <div id='recipe_details'>
            <h3>Ingredients:</h3>
            <ul id='ingredients'>
                ${this.ingredients.reduce((string, ingredient) => string += this.recipeIngredient(ingredient),'')}
            </ul>
            <h3>Directions: </h3>
            <p id='directions'>${this.directions}</p>
        </div>`
    }
    
    recipeIngredient(ing){
        return `<li>${ing.name} (<strong><span>${ing.qty}</span> <span>${ing.unit}</span></strong>)</li>`
    }
}