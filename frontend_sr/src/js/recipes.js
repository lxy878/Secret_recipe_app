class Recipes{
    constructor(){
        this.recipes = []
        this.server = new Server()
    }

    getRecipes(){
        this.server.fetchForRecipes().then(json=>{
            json.forEach(recipe => this.recipes.push(new Recipe(recipe)));
        }).then(()=>{
            this.render()
        })
    }

    render(){
        const recipeContainer = document.getElementById('recipes_container')
        const recipe = this.recipes[0]
        this.recipes.forEach(recipe =>{
            const divTag = document.createElement('div')
            divTag.id = 'item'
            divTag.innerHTML = `
                <img src=${recipe.imageUrl} alt="Image">
                <div id='item-detail'>
                    <h4 id='word_wrap'>${recipe.name}</h4>
                    <p>serving: ${recipe.serving}</p>
                    <p>meal: ${recipe.meal.name}</p>
                    <button>View</button>
                    <button>Delete</button>
                </div>
            `
            // addEventListener for view and delete
            recipeContainer.appendChild(divTag);
        })
    }
    
    getRecipe(){
        console.log()
    }
}