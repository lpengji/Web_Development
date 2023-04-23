const currentPageBody = document.querySelector(".currentPage")
const pageNameBody = document.querySelector(".pageName")
const birthDateBody = document.querySelector(".birthDate");
const deathDateBody = document.querySelector(".deathDate")
const autorImageBody = document.querySelector(".autorImage")
const iFrameBody = document.querySelector("iframe")
const titleBody = document.querySelector("title")

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
    localstorageList.push(new Person(name,birthDate,deathDate,wikiURL,imageURL))
    localStorage.setItem(addingListType,JSON.stringify(localstorageList))

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
    
    for(let i =0; i<localstorageList.length; i++){
        localstorageList = localstorageList.filter(item => item.name.toLowerCase() === name.toLowerCase())
    }
    
    if(localstorageList != 0){
        alert("El  introducido ya existe en la aplicación")
        datoRepetido = true
    }

    return datoRepetido
}

// anotar la lista a operar y redirigir a la pagina de changeElementForum
function changeToModifyForum(){
    let addingButton = event.target;
    let actualAddingButtonList = [addingButton.parentNode.parentNode.className + "List",addingButton.parentNode.className]
    sessionStorage.setItem("actualAddingButtonList",JSON.stringify(actualAddingButtonList));
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
    let listToLoad = JSON.parse(sessionStorage.getItem("actualAddingButtonList"))
    let currentListType = listToLoad[0];
    let currentList = JSON.parse(localStorage.getItem(currentListType))
    let currentData = listToLoad[1];
    
    currentObject = currentList.filter(item => item.name === currentData)

    currentObject[0].name = name
    currentObject[0].birthDate = birthDate
    currentObject[0].deathDate = deathDate
    currentObject[0].imageURL = "img/"+imageURL
    currentObject[0].wikiURL = wikiURL

    localStorage.setItem(currentListType,JSON.stringify(currentList))

    window.location.href="index.html"
    
}

// elimina el elemento seleccionado
function removeElement(){
    let actualButton = event.target;
    let actualListType = actualButton.parentNode.parentNode.className + "List";

    let actualList = JSON.parse(localStorage.getItem(actualListType));
    
    actualList = actualList.filter(item => item.name !== actualButton.parentNode.className);

    localStorage.setItem(actualListType, JSON.stringify(actualList));

    location.reload();
}

// anota la lista que va a operar en reloadHTMLPage()
function createHTMLPage(){
    let lastclickedEvent = event.target;
    let lastclickedEventListType = lastclickedEvent.parentNode.parentNode.className + "List";

    let lastclickedEventList = JSON.parse(localStorage.getItem(lastclickedEventListType));
    
    lastclickedEventList = lastclickedEventList.filter(item => item.name === lastclickedEvent.parentNode.className)
    
    sessionStorage.setItem("lastclickedEventList",JSON.stringify(lastclickedEventList));
}

// carga y crea dinamicamente la pagina HTML 
function reloadHTMLPage(){
    lastclicked = JSON.parse(sessionStorage.getItem("lastclickedEventList"))

    currentPageBody.innerHTML = lastclicked[0].name
    pageNameBody.innerHTML = lastclicked[0].name
    birthDateBody.innerHTML += lastclicked[0].birthDate
    deathDateBody.innerHTML += lastclicked[0].deathDate
    autorImageBody.setAttribute("src",lastclicked[0].imageURL);
    iFrameBody.setAttribute("src",lastclicked[0].wikiURL);
    titleBody.innerHTML = lastclicked[0].name
}