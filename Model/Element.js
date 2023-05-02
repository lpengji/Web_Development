class Element {
    #name;
    #birthDate;
    #deathDate;
    #imageURL;
    #wikiURL;    

    constructor(name,birthDate,deathDate,wikiURL,imageURL){
        this.name = name;
        this.birthDate = birthDate;
        this.deathDate = deathDate;
        this.wikiURL = wikiURL;
        this.imageURL = "../img/"+imageURL;
    }

    setName(name){
        this.#name=name;
    }
    getName(){
        return this.#name;
    }

    setBirthDate(birthDate){
        this.#birthDate=birthDate;
    }
    getBirthDate(){
        return this.#birthDate;
    }

    setDeathDate(deathDate){
        this.#deathDate=deathDate;
    }
    getDeathDate(){
        return this.#deathDate;
    }

    setImageURL(imageURL){
        this.#imageURL="../img/"+imageURL;
    }
    getImageURL(){
        return this.#imageURL;
    }

    setWikiURL(wikiURL){
        this.#wikiURL=wikiURL;
    }
    getWikiURL(){
        return this.#wikiURL;
    }

    // retorna la imagen y nombre del elemento en formato HTML
    static toIndexHTML(person){
        var destination = "plantilla.html";
        return `<article class="`+person.name+`"><img src=`+person.imageURL+` height="45" /> 
        <a href="`+destination+`" onclick="createHTMLPage()">`+person.name+`</a><br></article>
        `
    }

    // retorna los elementos relacionado 
    static generateRelatedList(relatedList,RelatedListType){
        
        let originalRelatedList = JSON.parse(localStorage.getItem(RelatedListType));
        let returningString =''
        for(let i=0; i<relatedList.length; i++){
            let actualRelatedElement = originalRelatedList.filter(item => item.name === relatedList[i])
            returningString +=`<div id="relationDiv" class="`+relatedList[i]+`"><img src=`+actualRelatedElement[0].imageURL+` height="45" /> 
            <a href="plantilla.html" onclick="createHTMLPage()">`+actualRelatedElement[0].name+`</a></div>`
        }
        return returningString
    }
}