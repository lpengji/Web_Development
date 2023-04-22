class Person{
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
        this.imageURL = "img/"+imageURL;
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
        this.#imageURL="img/"+imageURL;
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

    static toIndexHTML(person){
        //createHTMLPage(person);

        return `<article class="`+person.name+`"><img src=`+person.imageURL+` height="45" /> 
        <a href="`+person.name.replace(/\s+/g, '')+`.html">`+person.name+`</a><br></article>
        `
    }

    createHTMLPage(person){
        
    }

}