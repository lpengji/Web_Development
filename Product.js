class Product extends Element{
    
    personList = [];
    entityList = [];

    constructor(name,birthDate,deathDate,wikiURL,imageURL,personList,entityList) {
        super(name,birthDate,deathDate,wikiURL,imageURL);
        this.personList = personList;
        this.entityList = entityList;
        
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
            <a href="plantilla.html" onclick="reloadHTMLPage()">`+personList[0].name+`</a><br>`
        }
        
        return returningString
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
    
    
}