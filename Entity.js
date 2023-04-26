class Entity extends Element{
    
    personList = []
    productList = []

    constructor(name,birthDate,deathDate,wikiURL,imageURL,personList, productLIst){
        super(name,birthDate,deathDate,wikiURL,imageURL);
        this.personList = personList;
        this.productLIst = productLIst;

    }

    static generatePersonList(lastclicked,originListType){
        var returningString=" ";
        var lastclickedPersonRelatedList = lastclicked[0].personList;
        var personList;
        var actualName;
        for(var i=0; i<lastclickedPersonRelatedList.length; i++){
            personList = JSON.parse(localStorage.getItem(originListType))
            actualName = lastclickedPersonRelatedList[0];
            personList = personList.filter(item => item.name === actualName)

            returningString = returningString + `<img src=`+personList[0].imageURL+` height="45" /> 
            <a href="plantilla.html" onclick="reloadHTMLPage(`+originListType+`,`+personList[0].name+`)">`+personList[0].name+`</a><br>`
        }
        
        return returningString
    }

    static generateProductList(lastclicked,originListType){
        var returningString=" ";
        var lastclickedProductRelatedList = lastclicked[0].productLIst;
        var productList;
        var actualName;
        for(var i=0; i<lastclickedProductRelatedList.length; i++){
            productList = JSON.parse(localStorage.getItem(originListType))
            actualName = lastclickedProductRelatedList[0];
            productList = productList.filter(item => item.name === actualName)

            returningString = returningString + `<img src=`+productList[0].imageURL+` height="45" /> 
            <a href="plantilla.html" onclick="createHTMLPage()">`+productList[0].name+`</a><br>`
            
        }
        
        return returningString
    }
    
}