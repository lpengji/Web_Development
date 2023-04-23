const productBody = document.querySelector(".product");
const personBody = document.querySelector(".person");
const entityBody = document.querySelector(".entity");

let personList = [];
let entityList = [];
let productList = [];

// carga los objetos por defecto al localStorage
function previousSetValues(){
    //sessionStorage.setItem("Logged",false);

    personList.push(new Person("Tim Berners Lee",new Date(1995,6,8),
    "none","https://es.wikipedia.org/wiki/Tim_Berners-Lee","TimBernersLee.jpeg"));

    entityList.push(new Entity("CERN",new Date(1954,7,29),
    "none","https://es.wikipedia.org/wiki/Organizaci%C3%B3n_Europea_para_la_Investigaci%C3%B3n_Nuclear","cern.png"));

    productList.push(new Product("HTML",new Date(1991,10,29),
    "none","https://es.wikipedia.org/wiki/HTML","html.png"))

    personList.push(new Person("A",new Date(1995,6,8),
    "none","https://es.wikipedia.org/wiki/Tim_Berners-Lee","TimBernersLee.jpeg"));

    entityList.push(new Entity("b",new Date(1954,7,29),
    "none","https://es.wikipedia.org/wiki/Organizaci%C3%B3n_Europea_para_la_Investigaci%C3%B3n_Nuclear","cern.png"));

    productList.push(new Product("c",new Date(1991,10,29),
    "none","https://es.wikipedia.org/wiki/HTML","html.png"))

    localStorage.setItem("personList",JSON.stringify(personList));
    localStorage.setItem("entityList",JSON.stringify(entityList));
    localStorage.setItem("productList",JSON.stringify(productList))
}

function runOnlyOnceSetDefaultValues(){
    if(!sessionStorage.getItem("doneLoadingData")){
        previousSetValues();
        sessionStorage.setItem("doneLoadingData","true");
    }
}

runOnlyOnceSetDefaultValues();

// carga los contenidos del localStorage por pantalla
function onLoad(){
    this.loadPersonList();
    this.loadEntityList();
    this.loadProductList();
}

// cargar las personas
function loadPersonList(){
    personList = JSON.parse(localStorage.getItem("personList"));
    
    for(let i=0; i<personList.length; i++){
        personBody.innerHTML += Person.toIndexHTML(personList[i]) ;
    }
}

// cargar las entidades
function loadEntityList(){
    entityList = JSON.parse(localStorage.getItem("entityList"));
    
    for(let i=0; i<entityList.length; i++){
        entityBody.innerHTML += Entity.toIndexHTML(entityList[i]) ;
    }
}

// cargar los productos
function loadProductList(){
    productList = JSON.parse(localStorage.getItem("productList"));

    for(let i=0; i<productList.length; i++){
        productBody.innerHTML += Product.toIndexHTML(productList[i]) ;
    }
}

// cargar los datos para la modificación
function loadData(){
    let name = document.getElementById("name");
    let birthDate = document.getElementById("birthDate");
    let deathDate = document.getElementById("deathDate");
    let imageURL = document.getElementById("imageURL");
    let wikiURL = document.getElementById("wikiURL");

    let listToLoad = JSON.parse(sessionStorage.getItem("actualAddingButtonList"))
    let currentListType = listToLoad[0];
    let currentList = JSON.parse(localStorage.getItem(currentListType))
    let currentData = listToLoad[1];

    currentObject = currentList.filter(item => item.name === currentData)

    name.value = currentObject[0].name;
    birthDate.value = currentObject[0].birthDate;
    deathDate.value = currentObject[0].deathDate;
    imageURL.value = currentObject[0].imageURL.substring(4);
    wikiURL.value = currentObject[0].wikiURL;
}