class Product extends Entity{
    

    constructor(name,birthDate,deathDate,wikiURL,imageURL,person,entity) {
        super(name,birthDate,deathDate,wikiURL,imageURL);
        //this.#entities = entity;
    }
    /*
    get getEntities(){
        return this.#entities;
    }

    set setEntities(entities = []){
        this.#entities=entities;
    }

    addEntity(Entity){
        this.#entities.push(Entity);
    }

    deletePerson(Entity){
        this.#entities = this.#entities.filter((condition)=> condition !=='Entity');
    }
    */
    
}