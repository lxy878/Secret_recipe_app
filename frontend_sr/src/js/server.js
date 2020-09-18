class Server{
    constructor(){
        this.baseUrl = 'http://localhost:3000'
    }

    fetchForRecipes(){
        // test 
        this.recipesUrl = this.baseUrl + '/recipes'
        return fetch(`${this.baseUrl}/recipes`).then(resp => resp.json())
    }
}