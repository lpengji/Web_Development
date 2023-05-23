class Entity extends Element{
    
    personList = []
    productList = []

    constructor(name,birthDate,deathDate,wikiURL,imageURL,personList, productList){
        super(name,birthDate,deathDate,wikiURL,imageURL);
        this.personList = personList;
        this.productList = productList;
    }   
}