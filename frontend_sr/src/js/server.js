class Server{
    constructor(){
        this.baseUrl = 'http://localhost:3000/recipes/'
    }

    fetchForRecipes(){
        return fetch(this.baseUrl).then(resp => resp.json())
    }

    fetchForCreate(data){
        const recipe = {
            'recipe': data
        }
        return fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json())
    }

    fetchForRecipe(id){
        return fetch(this.baseUrl+`${id}`).then(resp=>resp.json())
    }

    fetchForDelete(id){
        return fetch(this.baseUrl+`${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(resp=> resp.json())
    }
}