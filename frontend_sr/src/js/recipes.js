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

    removeCreateForm(element){
        element.removeChild(element.firstChild)
    }

    addCreateForm(element){
        element.innerHTML = `
            <form action="POST" id='createField'>
                <p>Name: <input type="text" id='name'></p>
                <p>Meal: <input type="text" id='meal'></p>
                <p>Serving: <input type="text" id='serving'></p>
                <p>Image Link: <input type="text" id='image_url'></p>
                <div id='ingredients'>
                    <p>Ingredients:</p>
                </div>
                <br>
                <button id='add_ingredient'>More ingredient</button>
                <p>Directions: <textarea  id='directions'></textarea></p>
                <input type="submit" value='Create'><br>
        </div>`
        this.addIngEvent();
        // this.addSubmitEvent();
    }
    
    addSubmitEvent(){
        
    }
    
    addIngEvent(){
        const buttonAddIng = document.querySelector('button#add_ingredient')
        buttonAddIng.addEventListener('click', e=>{
            e.preventDefault();
            const divIngs = document.querySelector('div#ingredients')
            const newDiv = document.createElement('div');
            newDiv.id = 'ingredient'
            newDiv.innerHTML = `            
                <p>Name: <input type="text" id='name'></p>
                <p>Qty: <input type="number" id='qty'></p>
                <p>Unit: <input type="text" id='Unit'></p>`
            divIngs.appendChild(newDiv)
        })
    }

    getRecipe(){
        console.log()
    }
}