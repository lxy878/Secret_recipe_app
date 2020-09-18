class Recipes{
    constructor(){
        this.recipes = []
        this.server = new Server()
    }

    getRecipes(){
        this.server.fetchForRecipes().then(json=>{
            return json.forEach(recipe => this.recipes.push(new Recipe(recipe)));
        }).then(()=>{
            this.render()
        })
    }

    render(){
        this.recipes.forEach(recipe=> console.log(recipe))
    }
    
}