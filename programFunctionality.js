const currentPageBody = document.querySelector(".currentPage")
const pageNameBody = document.querySelector(".pageName")
const birthDateBody = document.querySelector(".birthDate");
const deathDateBody = document.querySelector(".deathDate")
const autorImageBody = document.querySelector(".autorImage")
const iFrameBody = document.querySelector("iframe")
const titleBody = document.querySelector("title")


function changeToCreateForum(){
    let addingButton = event.target;
    let actualAddingButtonList = addingButton.parentNode.className + "List"
    sessionStorage.setItem("actualAddingButtonList",JSON.stringify(actualAddingButtonList));

    window.location.href = "createNewElementForum.html"
}

function addNewElement(){
    let name = document.getElementById("name").value;
    let birthDate = document.getElementById("birthDate").value;
    let deathDate = document.getElementById("deathDate").value;
    let imageURL = document.getElementById("imageURL").value;
    let wikiURL = document.getElementById("wikiURL").value;

    if(!deathDate)
        deathDate= "none";
    
    let addingListType = JSON.parse(sessionStorage.getItem("actualAddingButtonList"))
    let localstorageList = JSON.parse(localStorage.getItem(addingListType))
    localstorageList.push(new Person(name,birthDate,deathDate,wikiURL,imageURL))
    localStorage.setItem(addingListType,JSON.stringify(localstorageList))

    window.location.href="index.html"
}

function modifyElement(){
    //introducir en el localstorage el elemento a cambiar 
}

function removeElement(){
    let actualButton = event.target;
    let actualListType = actualButton.parentNode.parentNode.className + "List";

    let actualList = JSON.parse(localStorage.getItem(actualListType));
    
    actualList = actualList.filter(item => item.name !== actualButton.parentNode.className);

    localStorage.setItem(actualListType, JSON.stringify(actualList));

    location.reload();
}

function createHTMLPage(){
    let lastclickedEvent = event.target;
    let lastclickedEventListType = lastclickedEvent.parentNode.parentNode.className + "List";

    let lastclickedEventList = JSON.parse(localStorage.getItem(lastclickedEventListType));
    
    lastclickedEventList = lastclickedEventList.filter(item => item.name === lastclickedEvent.parentNode.className)
    
    sessionStorage.setItem("lastclickedEventList",JSON.stringify(lastclickedEventList));
}

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