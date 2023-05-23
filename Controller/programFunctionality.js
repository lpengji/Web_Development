const currentPageBody = document.querySelector(".currentPage")
const pageNameBody = document.querySelector(".pageName")
const birthDateBody = document.querySelector(".birthDate");
const deathDateBody = document.querySelector(".deathDate")
const autorImageBody = document.querySelector(".autorImage")
const iFrameBody = document.querySelector("iframe")
const titleBody = document.querySelector("title")
const leftFooterBody = document.querySelector(".leftImage");
const rightFooterBody = document.querySelector(".rightImage")
const footerBody = document.querySelector("footer")

let state = sessionStorage.getItem("response")
let currentVisitingElementType = JSON.parse(sessionStorage.getItem("currentVisitingElementType"))
let currentElementId = JSON.parse(sessionStorage.getItem("currentVisitingElementId"))

// anotar la lista a operar y redirigir a la pagina de createNewElement
function changeToCreateForum(){
    sessionStorage.setItem("addingListType",JSON.stringify(event.target.parentNode.className)); 
    window.location.href = "createNewElementForum.html"
}

// verifica y añade el nuevo elemento 
function addNewElement(){
    let name = document.getElementById("name").value;
    let birthDate = document.getElementById("birthDate").value;
    let deathDate = document.getElementById("deathDate").value;
    let imageURL = document.getElementById("imageURL").value;
    let wikiURL = document.getElementById("wikiURL").value;
    
    let currentAddingListType = JSON.parse(sessionStorage.getItem("addingListType"))
    
    if(!comprobarDatosRellenos(name,birthDate,imageURL,wikiURL))
        return false
    if(!deathDate)
        deathDate= "null";

    if(currentAddingListType ==="product" ){
        BDProduct.postNewProduct(name,birthDate,deathDate,imageURL,wikiURL)
    }
    else if(currentAddingListType ==="person"){
        BDPerson.postNewPerson(name,birthDate,deathDate,imageURL,wikiURL)
    
    }
    else if(currentAddingListType ==="entity"){
        BDEntity.postNewEntity(name,birthDate,deathDate,imageURL,wikiURL)
    
    }
    sessionStorage.setItem("addingListType",""); 
    window.location.href="index.html"
}

function comprobarDatosRellenos(name,birthDate,imageURL,wikiURL){
    let datosRellenos = false
    if (name === "" || birthDate === "" || imageURL === "" || wikiURL === "") {
        alert("Por favor complete los campos obligatorios.");
    }
    else
        datosRellenos = true

    return datosRellenos;
}

// anotar la lista a operar y redirigir a la pagina de changeElementForum
function changeToModifyForum(){
    let modificationData = {
        elementType: event.target.parentNode.getAttribute('data-type'),
        elementId: event.target.parentNode.id
    }
    sessionStorage.setItem("actualChangingElement",JSON.stringify(modificationData));
    window.location.href = "changeElementForum.html"
}

// verifica y modifica el elemento seleccionado
function modifyElement(){
    let newData = {
        name : document.getElementById("name").value,
        birthDate : document.getElementById("birthDate").value,
        deathDate : document.getElementById("deathDate").value,
        imageUrl : document.getElementById("imageURL").value,
        wikiUrl : document.getElementById("wikiURL").value
    }
    
    let changingInformation = JSON.parse(sessionStorage.getItem("actualChangingElement")) 

    if (newData.name === "" || newData.birthDate === "" || newData.imageURL === "" || newData.wikiURL === "") {
        alert("Por favor complete los campos obligatorios.");
        return false;
    }

    if(!newData.deathDate)
        deathDate= "none";

    if (changingInformation.elementType === "products"){
        BDProduct.changeProductInformation(changingInformation.elementId,newData)
    }
    else if(changingInformation.elementType === "persons"){
        BDPerson.changePersonInformation(changingInformation.elementId,newData)
    }else if(changingInformation.elementType === "entities"){
        BDEntity.changeEntityInformation(changingInformation.elementId,newData)
    }

    sessionStorage.setItem("actualChangingElement","");
    window.location.href="index.html"
}

// elimina el elemento seleccionado
function removeElement(){

    if (event.target.parentNode.getAttribute('data-type') === "products"){
        BDProduct.deleteProductById(event.target.parentNode.id)
    }
    else if(event.target.parentNode.getAttribute('data-type') === "persons"){
        BDPerson.deletePersontById(event.target.parentNode.id)

    }else if(event.target.parentNode.getAttribute('data-type') === "entities"){
        BDEntity.deleteElementById(event.target.parentNode.id)
    }

    location.reload();
}


// anota el elemento que va a operar en reloadHTMLPage()
function createHTMLPage(){

    if (event.target.parentNode.getAttribute('data-type') === "products"){
        BDProduct.getProductById(event.target.parentNode.id).then(function(response) {
            sessionStorage.setItem("currentVisitingElementId",JSON.stringify(response.product.id))
        })
        .catch(function(error) {
            console.error(error);
        });
    }
    else if(event.target.parentNode.getAttribute('data-type') === "persons"){
        BDPerson.getPersonById(event.target.parentNode.id).then(function(response) {
            sessionStorage.setItem("currentVisitingElementId",JSON.stringify(response.person.id))
        })
        .catch(function(error) {
            console.error(error);
        });

    }else if(event.target.parentNode.getAttribute('data-type') === "entities"){
        BDEntity.getEntityById(event.target.parentNode.id).then(function(response) {
            sessionStorage.setItem("currentVisitingElementId",JSON.stringify(response.entity.id))
        })
        .catch(function(error) {
            console.error(error);
        });
    }
    sessionStorage.setItem("currentVisitingElementType",JSON.stringify(event.target.parentNode.getAttribute('data-type')))
}

// carga y crea dinamicamente la pagina HTML 
function reloadHTMLPage(){

    let currentElement;

    if (currentVisitingElementType === "products"){
        BDProduct.getProductById(currentElementId).then(function(response) {
            currentElement = response.product
            currentPageBody.innerHTML = currentElement.name
            pageNameBody.innerHTML = currentElement.name
            birthDateBody.innerHTML += currentElement.birthDate
            deathDateBody.innerHTML += currentElement.deathDate
            autorImageBody.setAttribute("src","../img/"+currentElement.imageUrl);
            iFrameBody.setAttribute("src",currentElement.wikiUrl);
            titleBody.innerHTML = currentElement.name

            generateFooter(currentElement).then(function(){
                if(state !== null && state !== undefined && state !== ""){
                    generateRemoveButton();
                } 
            }).catch(function(error){
                console.log(error)
            })
        })
        .catch(function(error) {
            console.error(error);
        });
    }
    else if(currentVisitingElementType === "persons"){
        BDPerson.getPersonById(currentElementId).then(function(response) {
            currentElement = response.person
            currentPageBody.innerHTML = currentElement.name
            pageNameBody.innerHTML = currentElement.name
            birthDateBody.innerHTML += currentElement.birthDate
            deathDateBody.innerHTML += currentElement.deathDate
            autorImageBody.setAttribute("src","../img/"+currentElement.imageUrl);
            iFrameBody.setAttribute("src",currentElement.wikiUrl);
            titleBody.innerHTML = currentElement.name

            generateFooter(currentElement).then(function(){
                if(state !== null && state !== undefined && state !== ""){
                    generateRemoveButton();
                } 
            }).catch(function(error){
                console.log(error)
            })
        })
        .catch(function(error) {
            console.error(error);
        });

    }else if(currentVisitingElementType === "entities"){
        BDEntity.getEntityById(currentElementId).then(function(response) {
            currentElement = response.entity
            currentPageBody.innerHTML = currentElement.name
            pageNameBody.innerHTML = currentElement.name
            birthDateBody.innerHTML += currentElement.birthDate
            deathDateBody.innerHTML += currentElement.deathDate
            autorImageBody.setAttribute("src","../img/"+currentElement.imageUrl);
            iFrameBody.setAttribute("src",currentElement.wikiUrl);
            titleBody.innerHTML = currentElement.name

            generateFooter(currentElement).then(function(){
                if(state !== null && state !== undefined && state !== ""){
                    generateRemoveButton();
                } 
            }).catch(function(error){
                console.log(error)
            })
        })
        .catch(function(error) {
            console.error(error);
        });
    }   
}

// genera los elementos relacionados con el elemento en el footer 
function generateFooter(currentElement){
    return new Promise(function(resolve,reject){
        let relatedPersonList = currentElement.persons
        let relatedEntityList = currentElement.entities
        let relatedProductList = currentElement.products

        if(state !== null && state !== undefined && state !== ""){
            leftFooterBody.innerHTML = `<button onclick="addRelation()">add</button> ` 
            rightFooterBody.innerHTML= `<button onclick="addRelation()">add</button> `
        }
        
        if(currentVisitingElementType === "products" ){
            leftFooterBody.innerHTML += "Personas"
            rightFooterBody.innerHTML += "Entidades"
            leftFooterBody.id = "persons"
            rightFooterBody.id = "entities"
            if(relatedPersonList !== null){
                Element.generateRelatedList(relatedPersonList,"Person","persons").then(function(returningString) {
                    leftFooterBody.innerHTML += returningString; 
                })
                .catch(function(error) {
                    console.error(error);
                });
            }
            if(relatedEntityList !== null){
                Element.generateRelatedList(relatedEntityList,"Entity","entities").then(function(returningString) {
                    rightFooterBody.innerHTML += returningString; 
                    resolve();
                })
                .catch(function(error) {
                    console.error(error);
                    reject(error);
                });
            }
        }
        else if(currentVisitingElementType === "persons" ){
            leftFooterBody.innerHTML += "Entidades"
            rightFooterBody.innerHTML += "Productos"
            leftFooterBody.id = "entities"
            rightFooterBody.id = "products"
            if(relatedEntityList !== null){
                Element.generateRelatedList(relatedEntityList,"Entity","entities").then(function(returningString) {
                    leftFooterBody.innerHTML += returningString; 
                })
                .catch(function(error) {
                    console.error(error);
                });
            }
            if(relatedProductList !== null){
                Element.generateRelatedList(relatedProductList,"Product","products").then(function(returningString) {
                    rightFooterBody.innerHTML += returningString; 
                    resolve();
                })
                .catch(function(error) {
                    console.error(error);
                    reject(error);
                });
            }
        }
        else if(currentVisitingElementType === "entities" ){
            leftFooterBody.innerHTML += "Productos"
            rightFooterBody.innerHTML += "Personas"
            leftFooterBody.id = "products"
            rightFooterBody.id = "persons"
            if(relatedProductList !== null){
                Element.generateRelatedList(relatedProductList,"Product","products").then(function(returningString) {
                    leftFooterBody.innerHTML += returningString; 
                })
                .catch(function(error) {
                    console.error(error);
                });
            }
            if(relatedPersonList !== null){
                Element.generateRelatedList(relatedPersonList,"Person","persons").then(function(returningString) {
                    rightFooterBody.innerHTML += returningString; 
                    resolve();
                })
                .catch(function(error) {
                    console.error(error);
                    reject(error);
                });
            }
        }        
    })
}

// genera los botones para eliminar los elementos relacionados
function generateRemoveButton(){
    const relationBody = document.getElementsByClassName("relationDiv")
    for(let i =0; i<relationBody.length; i++){
        relationBody[i].innerHTML += ` <button onclick="removeRelatedElement()">remove</button>`;
    }
}

// elimina el elemento pulsado 
function removeRelatedElement(){
    let relatedElementType=  event.target.parentNode.getAttribute('data-type')
    let relatedElementId= event.target.parentNode.id
     
    if(currentVisitingElementType === "products"){
        BDProduct.changeRelation(relatedElementType,relatedElementId,currentElementId,"rem").then(function(){
            location.reload();
        }).catch(function(error){
            console.log(error)
        })
    }
    else if(currentVisitingElementType === "persons"){
        BDPerson.changeRelation(relatedElementType,relatedElementId,currentElementId,"rem").then(function(){
            location.reload();
        }).catch(function(error){
            console.log(error)
        })
    }
    else if(currentVisitingElementType === "entities"){
        BDEntity.changeRelation(relatedElementType,relatedElementId,currentElementId,"rem").then(function(){
            location.reload();
        }).catch(function(error){
            console.log(error)
        })
    }
}

// añade una nueva relacion al elemento
function addRelation(){
    let container = event.target.parentNode
    let cancelButton = event.target
    cancelButton.innerHTML = `<button onclick="location.reload()">cancelar</button>`
    generateSelectionableElement(container);
}

// muestra por pantalla los elementos relacionables 
function generateSelectionableElement(container){
    let elementRelatedListType = event.target.parentNode.id
    let RelatedListType

    if(elementRelatedListType === "products"){
        RelatedListType = "Product"
    }
    else if(elementRelatedListType === "persons"){
        RelatedListType = "Person"
    }
    else if(elementRelatedListType === "entities"){
        RelatedListType = "Entity"
    }

    let getAllLinkableElementList = "BD" + RelatedListType + ".get" + RelatedListType + "List";
    
    if(currentVisitingElementType === "products"){
        BDProduct.getProductById(currentElementId).then(function(resolve){
            let alredyLinkedElementList = resolve.product[elementRelatedListType]

            if(alredyLinkedElementList === null)
                alredyLinkedElementList = []

            eval(getAllLinkableElementList)().then(function(resolve){
                let yetToBeLinkedElementList = resolve[elementRelatedListType]
                .filter(item => !alredyLinkedElementList.includes(item[RelatedListType.toLowerCase()].id))

                for (let i = 0; i < yetToBeLinkedElementList.length; i++) {
                    let element = document.createElement("div");
                    element.innerHTML = `<a href="#">add `+yetToBeLinkedElementList[i][RelatedListType.toLowerCase()].name+`</a>`;

                    element.addEventListener("click", () => {
                        relateNewElements(currentElementId,currentVisitingElementType,
                            yetToBeLinkedElementList[i][RelatedListType.toLowerCase()].id,elementRelatedListType);
                    });

                    container.appendChild(element);
                  }
            })
        })
    }
    else  if(currentVisitingElementType === "persons"){
        BDPerson.getPersonById(currentElementId).then(function(resolve){
            let alredyLinkedElementList = resolve.person[elementRelatedListType]

            if(alredyLinkedElementList === null)
                alredyLinkedElementList = []

            eval(getAllLinkableElementList)().then(function(resolve){
                let yetToBeLinkedElementList = resolve[elementRelatedListType]
                .filter(item => !alredyLinkedElementList.includes(item[RelatedListType.toLowerCase()].id))

                for (let i = 0; i < yetToBeLinkedElementList.length; i++) {
                    let element = document.createElement("div");
                    element.innerHTML = `<a href="#">add `+yetToBeLinkedElementList[i][RelatedListType.toLowerCase()].name+`</a>`;

                    element.addEventListener("click", () => {
                        relateNewElements(currentElementId,currentVisitingElementType,
                            yetToBeLinkedElementList[i][RelatedListType.toLowerCase()].id,elementRelatedListType);
                    });

                    container.appendChild(element);
                  }
            })
        })
    }
    else  if(currentVisitingElementType === "entities"){
        BDEntity.getEntityById(currentElementId).then(function(resolve){
            let alredyLinkedElementList = resolve.entity[elementRelatedListType]

            if(alredyLinkedElementList === null)
                alredyLinkedElementList = []

            eval(getAllLinkableElementList)().then(function(resolve){
                let yetToBeLinkedElementList = resolve[elementRelatedListType]
                .filter(item => !alredyLinkedElementList.includes(item[RelatedListType.toLowerCase()].id))

                for (let i = 0; i < yetToBeLinkedElementList.length; i++) {
                    let element = document.createElement("div");
                    element.innerHTML = `<a href="#">add `+yetToBeLinkedElementList[i][RelatedListType.toLowerCase()].name+`</a>`;

                    element.addEventListener("click", () => {
                        relateNewElements(currentElementId,currentVisitingElementType,
                            yetToBeLinkedElementList[i][RelatedListType.toLowerCase()].id,elementRelatedListType);
                    });

                    container.appendChild(element);
                  }
            })
        })
    }
}

// relaciona dos elementos
function relateNewElements(currentElementId,currentVisitingElementType,relatedElementId,relatedElementType){
    if(currentVisitingElementType === "products"){
        BDProduct.changeRelation(relatedElementType,relatedElementId,currentElementId,"add").then(function(){
            location.reload();
        }).catch(function(error){
            console.log(error)
        })
    }
    else if(currentVisitingElementType === "persons"){
        BDPerson.changeRelation(relatedElementType,relatedElementId,currentElementId,"add").then(function(){
            location.reload();
        }).catch(function(error){
            console.log(error)
        })
    }
    else if(currentVisitingElementType === "entities"){
        BDEntity.changeRelation(relatedElementType,relatedElementId,currentElementId,"add").then(function(){
            location.reload();
        }).catch(function(error){
            console.log(error)
        })
    }  
}