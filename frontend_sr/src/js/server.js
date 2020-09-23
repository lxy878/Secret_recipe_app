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
}