const currentPageBody = document.querySelector(".currentPage")
const pageNameBody = document.querySelector(".pageName")
const birthDateBody = document.querySelector(".birthDate");
const deathDateBody = document.querySelector(".deathDate")
const autorImageBody = document.querySelector(".autorImage")
const iFrameBody = document.querySelector("iframe")


function addNewElement(){

}

function modifyElement(){

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
    
    localStorage.setItem("lastclickedEventList",JSON.stringify(lastclickedEventList));
}

function reloadHTMLPage(){
    lastclicked = JSON.parse(localStorage.getItem("lastclickedEventList"))

    currentPageBody.innerHTML = lastclicked[0].name
    pageNameBody.innerHTML = lastclicked[0].name
    birthDateBody.innerHTML += lastclicked[0].birthDate
    deathDateBody.innerHTML += lastclicked[0].deathDate
    autorImageBody.setAttribute("src",lastclicked[0].imageURL);
    iFrameBody.setAttribute("src",lastclicked[0].wikiURL);
}