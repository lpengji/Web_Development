const currentPageBody = document.querySelector(".currentPage")
const pageNameBody = document.querySelector(".pageName")
const birthDateBody = document.querySelector(".birthDate");
const deathDateBody = document.querySelector(".deathDate")
const autorImageBody = document.querySelector(".autorImage")
const iFrameBody = document.querySelector("iframe")
const titleBody = document.querySelector("title")
const leftFooterBody = document.querySelector(".leftImage");
const rightFooterBody = document.querySelector(".rightImage")

// anotar la lista a operar y redirigir a la pagina de createNewElement
function changeToCreateForum(){
    let addingButton = event.target;
    let actualAddingButtonList = addingButton.parentNode.className + "List"
    sessionStorage.setItem("actualAddingButtonList",JSON.stringify(actualAddingButtonList));
    
    window.location.href = "createNewElementForum.html"
}

// verifica y añade el nuevo elemento 
function addNewElement(){
    let name = document.getElementById("name").value;
    let birthDate = document.getElementById("birthDate").value;
    let deathDate = document.getElementById("deathDate").value;
    let imageURL = document.getElementById("imageURL").value;
    let wikiURL = document.getElementById("wikiURL").value;
    
    if(!comprobarDatosRellenos(name,birthDate,imageURL,wikiURL))
        return false
    
    if(comprobarDatosRepetidos(name))
        return false

    if(!deathDate)
        deathDate= "none";
    
    let addingListType = JSON.parse(sessionStorage.getItem("actualAddingButtonList"))
    let localstorageList = JSON.parse(localStorage.getItem(addingListType))
    localstorageList.push(new Element(name,birthDate,deathDate,wikiURL,imageURL))
    localStorage.setItem(addingListType,JSON.stringify(localstorageList))

    addNewRelation(name,addingListType)

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

function comprobarDatosRepetidos(name){
    let datoRepetido = false
    let addingListType = JSON.parse(sessionStorage.getItem("actualAddingButtonList"))
    let localstorageList = JSON.parse(localStorage.getItem(addingListType))
    

    localstorageList = localstorageList.filter(item => item.name.toLowerCase() === name.toLowerCase())
    
    if(localstorageList != 0){
        alert("El  introducido ya existe en la aplicación")
        datoRepetido = true
    }

    return datoRepetido
}

// anotar la lista a operar y redirigir a la pagina de changeElementForum
function changeToModifyForum(){
    let addingButton = event.target;
    let actualChangingElement = addingButton.parentNode.className
    sessionStorage.setItem("actualChangingElement",JSON.stringify(actualChangingElement));
    window.location.href = "changeElementForum.html"
}

// verifica y modifica el elemento seleccionado
function modifyElement(){
    let name = document.getElementById("name").value;
    let birthDate = document.getElementById("birthDate").value;
    let deathDate = document.getElementById("deathDate").value;
    let imageURL = document.getElementById("imageURL").value;
    let wikiURL = document.getElementById("wikiURL").value;
    
    if (name === "" || birthDate === "" || imageURL === "" || wikiURL === "") {
        alert("Por favor complete los campos obligatorios.");
        return false;
    }

    if(!deathDate)
        deathDate= "none";

    let actualChangingElement = JSON.parse(sessionStorage.getItem("actualChangingElement"))
    let currentList = JSON.parse(localStorage.getItem(getRelatedListType(actualChangingElement)))
    
    let currentObject = currentList.filter(item => item.name === actualChangingElement)

    currentObject[0].name = name
    currentObject[0].birthDate = birthDate
    currentObject[0].deathDate = deathDate
    currentObject[0].imageURL = "img/"+imageURL
    currentObject[0].wikiURL = wikiURL

    localStorage.setItem(getRelatedListType(actualChangingElement),JSON.stringify(currentList))

    updateRelationList(actualChangingElement,name);

    window.location.href="index.html"
    
}

// elimina el elemento seleccionado
function removeElement(){
    let actualButton = event.target;
    let actualDeletingElement = actualButton.parentNode.className;

    let actualList = JSON.parse(localStorage.getItem(getRelatedListType(actualDeletingElement)));
    
    actualList = actualList.filter(item => item.name !== actualDeletingElement);

    localStorage.setItem(getRelatedListType(actualDeletingElement), JSON.stringify(actualList));

    removeRelation(actualDeletingElement)

    location.reload();
}

// anota la lista que va a operar en reloadHTMLPage()
function createHTMLPage(){
    let lastclickedEvent = event.target;
    
    let lastclickedEventClassName = lastclickedEvent.parentNode.className;

    let elementList = JSON.parse(localStorage.getItem(getRelatedListType(lastclickedEventClassName)))

    elementList = elementList.filter(item => item.name === lastclickedEventClassName)

    sessionStorage.setItem("lastUsedList",JSON.stringify(elementList))
    
}
// carga y crea dinamicamente la pagina HTML 
function reloadHTMLPage(){

    let elementList = JSON.parse(sessionStorage.getItem("lastUsedList"))

    currentPageBody.innerHTML = elementList[0].name
    pageNameBody.innerHTML = elementList[0].name
    birthDateBody.innerHTML += elementList[0].birthDate
    deathDateBody.innerHTML += elementList[0].deathDate
    autorImageBody.setAttribute("src",elementList[0].imageURL);
    iFrameBody.setAttribute("src",elementList[0].wikiURL);
    titleBody.innerHTML = elementList[0].name
    
    generateFooter();    
}

// genera los elementos relacionados en el footer 
function generateFooter(){
    
    let actualVisitingElement = JSON.parse(sessionStorage.getItem("lastUsedList"))[0].name

    let relatedPersonList = JSON.parse(sessionStorage.getItem("lastUsedList"))[0].personList
    let relatedEntityList = JSON.parse(sessionStorage.getItem("lastUsedList"))[0].entityList
    let relatedProductList = JSON.parse(sessionStorage.getItem("lastUsedList"))[0].productList

    leftFooterBody.innerHTML = `<button onclick="addRelation()">add</button> ` 
    rightFooterBody.innerHTML= `<button onclick="addRelation()">add</button> `

    if(getRelatedListType(actualVisitingElement) === "productList" ){
        leftFooterBody.innerHTML += "Personas"
        rightFooterBody.innerHTML += "Entidades"
        leftFooterBody.innerHTML += Product.generateRelatedList(relatedPersonList,"personList");
        rightFooterBody.innerHTML += Entity.generateRelatedList(relatedEntityList,"entityList");
    }
    else if(getRelatedListType(actualVisitingElement) === "personList" ){
        leftFooterBody.innerHTML += "Entidades"
        rightFooterBody.innerHTML += "Productos"
        leftFooterBody.innerHTML += Person.generateRelatedList(relatedEntityList,"entityList");
        rightFooterBody.innerHTML += Product.generateRelatedList(relatedProductList,"productList");
    }
    else if(getRelatedListType(actualVisitingElement) === "entityList" ){
        leftFooterBody.innerHTML += "Productos"
        rightFooterBody.innerHTML += "Personas"
        leftFooterBody.innerHTML += Product.generateRelatedList(relatedProductList,"productList");
        rightFooterBody.innerHTML += Person.generateRelatedList(relatedPersonList,"personList");
    }

    generateRemoveButton();
}

// genera los botones para eliminar los elementos relacionados
function generateRemoveButton(){
    const relationBody = document.querySelectorAll("#relationDiv")
    for(let i =0; i<relationBody.length; i++){
        relationBody[i].innerHTML += ` <button onclick="removeRelatedElement()">remove</button>`;
    }
}

// elimina el elemento pulsado 
function removeRelatedElement(){
    let actualElement = document.querySelector("title").textContent
    let actualRelatedElement = event.target.parentNode.className
    
    let actualElementList = JSON.parse(localStorage.getItem(getRelatedListType(actualElement)))
    let actualRelatedElementList = JSON.parse(localStorage.getItem(getRelatedListType(actualRelatedElement)))

    let actualObject = actualElementList.filter(item => item.name === actualElement)
    actualObject[0][getRelatedListType(actualRelatedElement)] = actualObject[0][getRelatedListType(actualRelatedElement)].filter(item => item !== actualRelatedElement)

    let actualRelatedObject = actualRelatedElementList.filter(item => item.name === actualRelatedElement)
    actualRelatedObject[0][getRelatedListType(actualElement)] = actualRelatedObject[0][getRelatedListType(actualElement)].filter(item => item !== actualElement)

    
    localStorage.setItem(getRelatedListType(actualElement),JSON.stringify(actualElementList))
    localStorage.setItem(getRelatedListType(actualRelatedElement),JSON.stringify(actualRelatedElementList))
    sessionStorage.setItem("lastUsedList",JSON.stringify(actualObject))

    location.reload();
}

//retorna el tipo de lista segun el valor elementName
function getRelatedListType(elementName){
    let relation = JSON.parse(localStorage.getItem("relation"))
    
    relation = relation.filter(item => item.name === elementName)

    return relation[0].list
}

//añadir nueva relation
function addNewRelation(newName,listType){

    let relationList = JSON.parse(localStorage.getItem("relation"))
    relationList.push(new Relation(newName,listType))
    localStorage.setItem("relation",JSON.stringify(relationList))

}

//actualizar lista de relaciones
function updateRelationList(actualChangingElement,newName){
    
    let relationList = JSON.parse(localStorage.getItem("relation"))
    let currentListObject = relationList.filter(item => item.name === actualChangingElement)

    currentListObject[0].name = newName
    localStorage.setItem("relation",JSON.stringify(relationList))
}

//eliminar una relacion
function removeRelation(oldName){
    let relationList = JSON.parse(localStorage.getItem("relation"))
    relationList = relationList.filter(item => item.name !== oldName)

    localStorage.setItem("relation",JSON.stringify(relationList))
}