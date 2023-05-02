class Product extends Element{
    
    personList = [];
    entityList = [];

    constructor(name,birthDate,deathDate,wikiURL,imageURL,personList,entityList) {
        super(name,birthDate,deathDate,wikiURL,imageURL);
        this.personList = personList;
        this.entityList = entityList;
        
    }   
    
}