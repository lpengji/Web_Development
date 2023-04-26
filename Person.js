class Person extends Element{ 

    entityList = []
    productList = []

    constructor(name,birthDate,deathDate,wikiURL,imageURL, entityList, productList){
        super(name,birthDate,deathDate,wikiURL,imageURL)
        this.entityList = entityList;
        this.productList = productList;
    }

    static generateEntityList(lastclicked,originListType){
        var returningString=" ";
        var lastclickedEntityRelatedList = lastclicked[0].entityList;
        var entityList;
        var actualName;
        for(var i=0; i<lastclickedEntityRelatedList.length; i++){
            entityList = JSON.parse(localStorage.getItem(originListType))
            actualName = lastclickedEntityRelatedList[0];
            entityList = entityList.filter(item => item.name === actualName)

            returningString = returningString + `<img src=`+entityList[0].imageURL+` height="45" /> 
            <a href="plantilla.html" onclick="reloadHTMLPage()">`+entityList[0].name+`</a><br>`
        }
        
        return returningString
    }

    static generateProductList(lastclicked,originListType){
        var returningString=" ";
        var lastclickedProductRelatedList = lastclicked[0].productList;
        var productList;
        var actualName;
        for(var i=0; i<lastclickedProductRelatedList.length; i++){
            productList = JSON.parse(localStorage.getItem(originListType))
            actualName = lastclickedProductRelatedList[0];
            productList = productList.filter(item => item.name === actualName)

            returningString = returningString + `<img src=`+productList[0].imageURL+` height="45" /> 
            <a href="plantilla.html" onclick="reloadHTMLPage()">`+productList[0].name+`</a><br>`
        }
        
        return returningString
    }
}