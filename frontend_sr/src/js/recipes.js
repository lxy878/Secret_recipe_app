class Recipes{
    constructor(){
        this.recipes = [];
        this.server = new Server();
        this.createButton();
        this.c = 0;
        // get recipe 
    }

    // show all recipes 
    getRecipes(){
        this.server.fetchForRecipes().then(json=>{
            this.recipes =[];
            json.forEach(recipe => {
                this.recipes.push(new Recipe(recipe)); 
            });
        }).then(()=>{
            this.renderRecipes()
        })
    }

    renderRecipes(){
        const recipesContainer = document.getElementById('recipes_container')
        recipesContainer.innerHTML = ''
        this.recipes.forEach(recipe =>{
            const newDiv = document.createElement('div')
            newDiv.id = 'item'
            newDiv.className = recipe.id
            newDiv.innerHTML = `
                <img src=${recipe.imageUrl} alt="Image">
                <div id='item-detail'>
                    <h4 id='word_wrap'>${recipe.name}</h4>
                    <p id='inform'>serving: ${recipe.serving}</p>
                    <p id='inform'>meal: ${recipe.meal.name}</p>
                    <div id='item_buttons'><div>
                </div>
            `;
            
            const divButtons = newDiv.querySelector('div#item_buttons')
            this.addEventView(divButtons)
            this.addEventDelete(divButtons)

            recipesContainer.appendChild(newDiv);
        })
    }

    addEventView(div){
        const buttonView = document.createElement('button')
        buttonView.innerText = 'View'
        buttonView.addEventListener('click', e=>{
            console.log(e.target.innerText)
        })
        div.appendChild(buttonView)
    }

    addEventDelete(div){
        const buttonDelete = document.createElement('button')
        buttonDelete.innerText = 'Delete'
        buttonDelete.addEventListener('click', e=>{
            console.log(e.target.innerText)
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

    removeCreateForm(element){
        element.removeChild(element.firstElementChild)
    }

    addCreateForm(element){
        element.innerHTML = `
            <form id='createField'>
                <p>Name: <input type="text" id='recipe_name'></p>
                <p>Meal: <input type="text" id='recipe_meal'></p>
                <p>Serving: <input type="text" id='recipe_serving'></p>
                <p>Image Link: <input type="text" id='recipe_image_url'></p>
                <div id='ingredients'><p>Ingredients:</p></div><br>
                <button id='add_ingredient'>More ingredients</button>
                <p>Directions: <textarea  id='recipe_directions'></textarea></p>
                <input type='submit', value='Create'>
            </form>
        `;
        this.addIngEvent();
        this.addSubmitEvent();
    }
    
    addSubmitEvent(){
        document.querySelector('form#createField').addEventListener('submit', e=>{
            e.preventDefault();
            const form = e.target
            const packege = this.collectData(form);
            // Post data
            this.server.fetchForCreate(packege).then(json=>console.log(json))
            document.querySelector('button#create_button').innerText = 'Create New Recipe';
            document.querySelector('#recipes_container').className = 'extend_container'
            this.removeCreateForm(document.querySelector('div#form_render'));
            this.getRecipes();
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
        data.ingredients = []
        // collect ingredients' attributes
        form.querySelectorAll(`[id=ingredient]`).forEach(ingredient=>{
            const newIng = {}
            ingredient.querySelectorAll(`[id*=ingredient]`).forEach(e => newIng[e.id.split('ingredient_')[1]] = e.value)
            data.ingredients.push(newIng)
        })
        return data
    }

    addIngEvent(){
        const buttonAddIng = document.querySelector('button#add_ingredient')
        buttonAddIng.addEventListener('click', e=>{
            e.preventDefault();
            const divIngs = document.querySelector('div#ingredients')
            const newDiv = document.createElement('div');
            newDiv.id = 'ingredient'
            newDiv.innerHTML = `            
                <p>Name: <input type="text" id='ingredient_name' ></p>
                <p>Qty: <input type="number" id='ingredient_qty' ></p>
                <p>Unit: <input type="text" id='ingredient_unit'></p>
            `;
            divIngs.appendChild(newDiv)
        })
    }
}