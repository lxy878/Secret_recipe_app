class Recipe{
    constructor(){
        this.recipes = []
        this.server = new Server()
    }

    getRecipes(){
        this.server.fetchForRecipes().then(json=>{
            console.log(json)
        })
    }

    
}