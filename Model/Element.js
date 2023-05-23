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
        this.imageURL = imageURL;
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
        this.#imageURL=imageURL;
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
    static toIndexHTML(element,type){
        var destination = "plantilla.html";
        return `<article class="`+element.name+`" data-type="`+type+`" id="`+element.id+`"><img src="../img/`+element.imageUrl+`" height="45" /> 
        <a href="`+destination+`" onclick="createHTMLPage()">`+element.name+`</a><br></article>
        `
    }

    // retorna los elementos relacionado 
    static generateRelatedList(relatedList, RelatedListType, dataType,state) {
        let getElement = "BD" + RelatedListType + ".get" + RelatedListType + "ById";
        let promises = [];
    
        for (let i = 0; i < relatedList.length; i++) {
            let promise = eval(getElement)(relatedList[i])
                .then(function(response) {
                    return `<div id="${relatedList[i]}" class="relationDiv" data-type="`+dataType+`">
                    <img src="../img/${response[RelatedListType.toLowerCase()].imageUrl}" height="45" />
                    <a href="plantilla.html" onclick="createHTMLPage()">${response[RelatedListType.toLowerCase()].name}</a>
                    </div>`;

                })
                .catch(function(error) {
                    console.error(error);
                    return ''; 
                });
    
            promises.push(promise);
        }
    
        return Promise.all(promises)
        .then(function(results) {
            return results.join('');
        });
    }
}