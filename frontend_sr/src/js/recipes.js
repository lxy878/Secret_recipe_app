class Recipes{
    constructor(){
        this.recipes = [];
        this.server = new Server();
        this.createButton();
    }

    // show all recipes 
    getRecipes(){
        this.server.fetchForRecipes().then(json=>{
            json.forEach(recipe => {
                this.recipes.push(new Recipe(recipe)); 
                // ---------- soluation for the review problem  ---------
                this.recipes = this.recipes.sort((a,b)=>{
                    if (a.name > b.name)
                        return 1    
                    else if(a.name < b.name)
                        return -1
                    else 
                        return 0
                });
                // ---------- soluation for the review problem  ---------
            });
        }).then(()=>this.renderRecipes())
    }

    renderRecipes(){
        const recipesContainer = document.getElementById('recipes_container')
        recipesContainer.innerHTML = ''
        this.recipes.forEach((recipe, index) =>{
            const newDiv = document.createElement('div')
            newDiv.id = 'item'
            newDiv.innerHTML = recipe.recipeItem(index);
            const divButtons = newDiv.querySelector('div#item_buttons')
            this.addEventView(divButtons)
            this.addEventDelete(divButtons)

            recipesContainer.appendChild(newDiv);
        })
    }

    // show a recipe
    addEventView(div){
        const buttonView = document.createElement('button')
        buttonView.innerText = 'View'
        buttonView.addEventListener('click', e=>{
            const id = e.target.parentElement.className
            this.server.fetchForRecipe(id).then(json=> {
                if (json.error) return alert(json.error)
                this.renderRecipe(new Recipe(json))
            })
        })
        div.appendChild(buttonView)
    }

    renderRecipe(recipe){
        const recipeContainer = document.getElementById('recipe_container')
        recipeContainer.innerHTML = ''
        recipeContainer.hidden = false;
        recipeContainer.className = recipe.id
        recipeContainer.innerHTML = recipe.recipeDetails()
    }

    // delete a recipe
    addEventDelete(div){
        const buttonDelete = document.createElement('button')
        const recipeContainer = document.getElementById('recipe_container')
        buttonDelete.innerText = 'Delete'
        buttonDelete.addEventListener('click', e=>{
            const id = e.target.parentElement.className 
            this.server.fetchForDelete(id).then(json => {
                if (json.message){
                    alert(json.message)
                    this.recipes.splice(e.target.parentElement.getAttribute('array_index'), 1)
                    this.renderRecipes()
                }else{
                    alert(json.error)
                }
            })
            if (id === recipeContainer.className){
                recipeContainer.hidden = true;
                recipeContainer.innerHTML = '';
            }
        })
        div.appendChild(buttonDelete)
    }

    // create a recipe
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
    
    addCreateForm(element){
        element.innerHTML = `
            <form id='createField'>
            <p>Name: <input type="text" id='recipe_name' placeholder='Recipe name....'></p>
            <p>Meal: <input type="text" id='recipe_meal' placeholder='Type of meals....' required></p>
            <p>Serving: <input type="text" id='recipe_serving' placeholder='Number of people.....'></p>
            <p>Image Link: <input type="text" id='recipe_image_url' placeholder='Image Link....'></p>
            <div id='ingredients'><p>Ingredients:</p></div><br>
            <button id='add_ingredient'>More ingredients</button>
            <p>Directions: <textarea  id='recipe_directions'></textarea></p>
            <input type='submit', value='Create'>
            </form>`;
        this.addIngEvent();
        this.addSubmitEvent();
    }
    
    addIngEvent(){
        const buttonAddIng = document.querySelector('button#add_ingredient')
        buttonAddIng.addEventListener('click', e=>{
            e.preventDefault();
            const divIngs = document.querySelector('div#ingredients')
            const newDiv = document.createElement('div');
            newDiv.id = 'ingredient'
            newDiv.innerHTML = `            
            <p>Name: <input type="text" id='ingredient_name' placeholder='Ingredient name....'></p>
            <p>Qty: <input type="number" id='ingredient_qty' placeholder='Number of ingredient....'></p>
            <p>Unit: <input type="text" id='ingredient_unit' placeholder='Measure of ingredient....'></p>`;
            divIngs.appendChild(newDiv)
        })
    }
    
    addSubmitEvent(){
        document.querySelector('form#createField').addEventListener('submit', e=>{
            e.preventDefault();
            const form = e.target
            const packege = this.collectData(form);
            // Post data
            this.server.fetchForCreate(packege).then(json=>{
                if(json.error) return alert(json.error)
                this.recipes.push(new Recipe(json))
                this.renderRecipes();
            })
            
            document.querySelector('button#create_button').innerText = 'Create New Recipe';
            document.querySelector('#recipes_container').className = 'extend_container'
            this.removeCreateForm(document.querySelector('div#form_render'));
        })
    }
    
    collectData(form){
        const data = {'recipe':{}, 'meal':{}}
        
        // collect recipe attributes
        form.querySelectorAll(`[id*=recipe]`).forEach(e=> {
            const key = e.id.split('recipe_')[1]
            if(key === 'meal'){
                data[key] = {name: e.value}
            }else{
                data.recipe[key] = e.value
            }
        })
        if (!data.recipe.image_url) data.recipe.image_url = './src/images/no_image.jpeg' 
        data.ingredients = []
        
        // collect ingredients' attributes
        form.querySelectorAll(`[id=ingredient]`).forEach(ingredient=>{
            const newIng = {}
            ingredient.querySelectorAll(`[id*=ingredient]`).forEach(e => newIng[e.id.split('ingredient_')[1]] = e.value)
            data.ingredients.push(newIng)
        })
        return data
    }

    removeCreateForm(element){
        element.removeChild(element.firstElementChild)
    }
}