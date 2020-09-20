class Recipes{
    constructor(){
        this.recipes = [];
        this.server = new Server();
        this.createButton();
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
                    <p id='inform'>serving: ${recipe.serving}</p>
                    <p id='inform'>meal: ${recipe.meal.name}</p>
                    <div id='item_buttons'>
                        <button>View</button>
                        <button>Delete</button>
                    <div>
                </div>
            `
            // addEventListener for view and delete
            recipeContainer.appendChild(divTag);
        })
    }

    createButton(){
        const createButton = document.querySelector('#create_button');
        createButton.addEventListener('click', e=>{
            const element = e.target;
            const divForm = document.querySelector('div#form_render')
            const recipesContainer = document.querySelector('#recipes_container');
            if(element.innerText === 'Cancel'){
                element.innerText = 'Create New Recipe';
                recipesContainer.className = 'extend_container';
                this.removeCreateForm(divForm);
            }else{
                element.innerText = 'Cancel';
                this.addCreateForm(divForm);
                recipesContainer.className ='';
            }
            
        })
    }

    getRecipe(){
        console.log()
    }
}