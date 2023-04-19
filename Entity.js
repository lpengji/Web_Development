class Entity extends Person{
    

    constructor(name,birthDate,deathDate,wikiURL,imageURL){
        super(name,birthDate,deathDate,wikiURL,imageURL);
        //this.#person=person;
    }
    /*
    get getPerson(){
        return this.#person;
    }

    set setPerson(person = []){
        this.#person=person;
    }
    
    addPerson(Person){
        this.#person.push(Person);
    }

    deletePerson(Person){
        this.#person = this.#person.filter((condition)=> condition !=='Person')
    }
    */
}