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
    if(addingListType ==="productList" ){
        localstorageList.push(new Product(name,birthDate,deathDate,wikiURL,imageURL,[],[]))
    }
    else if(addingListType ==="personList"){
        localstorageList.push(new Person(name,birthDate,deathDate,wikiURL,imageURL,[],[]))
    
    }
    else if(addingListType ==="entityList"){
        localstorageList.push(new Entity(name,birthDate,deathDate,wikiURL,imageURL,[],[]))
    
    }

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

    modifyRelation(actualChangingElement,name)

    localStorage.setItem(getRelatedListType(actualChangingElement),JSON.stringify(currentList))

    updateRelationList(actualChangingElement,name);

    window.location.href="index.html"
    
}

function modifyRelation(oldName, newName){
    let firtRelatedList
    let secondRelatedList
    let actualElementList = JSON.parse(localStorage.getItem(getRelatedListType(oldName)))
    let actualObject = actualElementList.filter(item => item.name === oldName)

    if(getRelatedListType(oldName) === "productList" ){
        firtRelatedList = actualObject[0].personList
        secondRelatedList = actualObject[0].entityList
    }
    else if(getRelatedListType(oldName) === "personList" ){
        firtRelatedList = actualObject[0].productList
        secondRelatedList = actualObject[0].entityList
    }
    else if(getRelatedListType(oldName) === "entityList" ){
        firtRelatedList = actualObject[0].productList
        secondRelatedList = actualObject[0].personList
    }

    modifyOldRelation(oldName,newName,firtRelatedList)
    modifyOldRelation(oldName,newName,secondRelatedList)
}

// modifica la relacion que hay en la lista de relaciones de cada elemento involucrado
function modifyOldRelation(oldName,newName,relatedElement){
    let actualElementList = JSON.parse(localStorage.getItem(getRelatedListType(relatedElement[0])))

    for(let i =0; i< relatedElement.length; i++){
        let actualObject = actualElementList.filter(item => item.name === relatedElement[i])
        actualObject[0][getRelatedListType(oldName)].splice(actualObject[0][getRelatedListType(oldName)].indexOf(oldName),1,newName) 
    }

    localStorage.setItem(getRelatedListType(relatedElement[0]),JSON.stringify(actualElementList))    
}

// elimina el elemento seleccionado
function removeElement(){
    let actualButton = event.target;
    let actualDeletingElement = actualButton.parentNode.className;

    let actualList = JSON.parse(localStorage.getItem(getRelatedListType(actualDeletingElement)));
    
    removeRelatedElementRelation(actualDeletingElement)

    actualList = actualList.filter(item => item.name !== actualDeletingElement);

    localStorage.setItem(getRelatedListType(actualDeletingElement), JSON.stringify(actualList));

    removeInRelationList(actualDeletingElement)

    location.reload();
}

// prepara para eliminar las relaciones donde aparece el elemento eliminado
function removeRelatedElementRelation(actualDeletingElement){
    let firtRelatedList
    let secondRelatedList
    let actualElementList = JSON.parse(localStorage.getItem(getRelatedListType(actualDeletingElement)))
    let actualObject = actualElementList.filter(item => item.name === actualDeletingElement)

    if(getRelatedListType(actualDeletingElement) === "productList" ){
        firtRelatedList = actualObject[0].personList
        secondRelatedList = actualObject[0].entityList
    }
    else if(getRelatedListType(actualDeletingElement) === "personList" ){
        firtRelatedList = actualObject[0].productList
        secondRelatedList = actualObject[0].entityList
    }
    else if(getRelatedListType(actualDeletingElement) === "entityList" ){
        firtRelatedList = actualObject[0].productList
        secondRelatedList = actualObject[0].personList
    }

    if(firtRelatedList.length !== 0){
        removeOldRelation(actualDeletingElement,firtRelatedList)
    }
        
    if(secondRelatedList.length !== 0){
        removeOldRelation(actualDeletingElement,secondRelatedList)
    }
}

// elimina las relaciones donde aparece el elemento eliminado
function removeOldRelation(actualDeletingElement, relatedElement){

    let actualElementList = JSON.parse(localStorage.getItem(getRelatedListType(relatedElement[0])))

    for(let i =0; i< relatedElement.length; i++){
        let actualObject = actualElementList.filter(item => item.name === relatedElement[i])
        actualObject[0][getRelatedListType(actualDeletingElement)].splice(actualObject[0][getRelatedListType(actualDeletingElement)].indexOf(actualDeletingElement),1) 
    }

    localStorage.setItem(getRelatedListType(relatedElement[0]),JSON.stringify(actualElementList))    

}

// anota el elemento que va a operar en reloadHTMLPage()
function createHTMLPage(){
    let lastclickedEvent = event.target;
    
    let lastclickedEventClassName = lastclickedEvent.parentNode.className;

    let elementList = JSON.parse(localStorage.getItem(getRelatedListType(lastclickedEventClassName)))

    elementList = elementList.filter(item => item.name === lastclickedEventClassName)

    sessionStorage.setItem("lastUsedElement",JSON.stringify(elementList[0].name))
    
}
// carga y crea dinamicamente la pagina HTML 
function reloadHTMLPage(){

    let element = JSON.parse(sessionStorage.getItem("lastUsedElement"))

    let actualElementList = JSON.parse(localStorage.getItem(getRelatedListType(element)))

    let elementList = actualElementList.filter(item => item.name === element)
   

    currentPageBody.innerHTML = elementList[0].name
    pageNameBody.innerHTML = elementList[0].name
    birthDateBody.innerHTML += elementList[0].birthDate
    deathDateBody.innerHTML += elementList[0].deathDate
    autorImageBody.setAttribute("src",elementList[0].imageURL);
    iFrameBody.setAttribute("src",elementList[0].wikiURL);
    titleBody.innerHTML = elementList[0].name
    
    generateFooter();    
}

// genera los elementos relacionados con el elemento en el footer 
function generateFooter(){
    
    let actualVisitingElement = JSON.parse(sessionStorage.getItem("lastUsedElement"))

    let actualElementList = JSON.parse(localStorage.getItem(getRelatedListType(actualVisitingElement)))
    let elementList = actualElementList.filter(item => item.name === actualVisitingElement)

    let relatedPersonList = elementList[0].personList
    let relatedEntityList = elementList[0].entityList
    let relatedProductList = elementList[0].productList

    leftFooterBody.innerHTML = `<button onclick="addRelation()">add</button> ` 
    rightFooterBody.innerHTML= `<button onclick="addRelation()">add</button> `

    if(getRelatedListType(actualVisitingElement) === "productList" ){
        leftFooterBody.innerHTML += "Personas"
        rightFooterBody.innerHTML += "Entidades"
        leftFooterBody.id = "personList"
        rightFooterBody.id = "entityList"
        leftFooterBody.innerHTML += Product.generateRelatedList(relatedPersonList,"personList");
        rightFooterBody.innerHTML += Entity.generateRelatedList(relatedEntityList,"entityList");
    }
    else if(getRelatedListType(actualVisitingElement) === "personList" ){
        leftFooterBody.innerHTML += "Entidades"
        rightFooterBody.innerHTML += "Productos"
        leftFooterBody.id = "entityList"
        rightFooterBody.id = "productList"
        leftFooterBody.innerHTML += Person.generateRelatedList(relatedEntityList,"entityList");
        rightFooterBody.innerHTML += Product.generateRelatedList(relatedProductList,"productList");
    }
    else if(getRelatedListType(actualVisitingElement) === "entityList" ){
        leftFooterBody.innerHTML += "Productos"
        rightFooterBody.innerHTML += "Personas"
        leftFooterBody.id = "productList"
        rightFooterBody.id = "personList"
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

    location.reload();
}

// añade una nueva relacion al elemento
function addRelation(){
    let container = event.target.parentNode
    let cancelButton = event.target
    cancelButton.innerHTML = `<button onclick="generateFooter()">cancelar</button>`
    generateSelectionableElement(container);
}

// muestra por pantalla los elementos relacionables 
function generateSelectionableElement(container){
    let elementRelatedListType = event.target.parentNode.id

    let actualElement = document.querySelector("title").textContent
    let actualElementList = JSON.parse(localStorage.getItem(getRelatedListType(actualElement)))
    let alredyLinkedElementList = actualElementList.filter(item => item.name === actualElement)[0][elementRelatedListType]
    
    let allLinkableElementList = JSON.parse(localStorage.getItem(elementRelatedListType))
    let yetToBeLinkedElementList =  allLinkableElementList.filter(item => !alredyLinkedElementList.includes(item.name))

    for (let i = 0; i < yetToBeLinkedElementList.length; i++) {
        let element = document.createElement("div");
        element.innerHTML = `<a href="#">add `+yetToBeLinkedElementList[i].name+`</a>`;

        element.addEventListener("click", () => {
            relateNewElements(actualElement,yetToBeLinkedElementList[i].name);
            console.log(yetToBeLinkedElementList[i].name)
            relateNewElements(yetToBeLinkedElementList[i].name,actualElement);
            location.reload();
        });

        container.appendChild(element);
      }
}

// relaciona dos elementos
function relateNewElements(actualElement, yetToBeRelatedElement){
    let actualElementList = JSON.parse(localStorage.getItem(getRelatedListType(actualElement)))

    let actualObject = actualElementList.filter(item => item.name === actualElement)
    actualObject[0][getRelatedListType(yetToBeRelatedElement)].push(yetToBeRelatedElement)
    
    localStorage.setItem(getRelatedListType(actualElement),JSON.stringify(actualElementList))    
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
function removeInRelationList(oldName){
    let relationList = JSON.parse(localStorage.getItem("relation"))
    relationList = relationList.filter(item => item.name !== oldName)

    localStorage.setItem("relation",JSON.stringify(relationList))
}