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
