class Person extends Element{ 

    entityList = []
    productList = []

    constructor(name,birthDate,deathDate,wikiURL,imageURL, entityList, productList){
        super(name,birthDate,deathDate,wikiURL,imageURL)
        this.entityList = entityList;
        this.productList = productList;
    }
}