const productBody = document.querySelector(".product");
const personBody = document.querySelector(".person");
const entityBody = document.querySelector(".entity");

let personList = [];
let entityList = [];
let productList = [];

// carga los objetos por defecto al localStorage
function previousSetValues(){
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

previousSetValues();

// carga los contenidos del localStorage por pantalla
function onLoad(){
    this.loadPersonList();
    this.loadEntityList();
    this.loadProductList();
}

function loadPersonList(){
    personList = JSON.parse(localStorage.getItem("personList"));
    

    for(let i=0; i<personList.length; i++){
        personBody.innerHTML += Person.toIndexHTML(personList[i]) ;
    }
}

function loadEntityList(){
    entityList = JSON.parse(localStorage.getItem("entityList"));
    

    for(let i=0; i<entityList.length; i++){
        entityBody.innerHTML += Entity.toIndexHTML(entityList[i]) ;
    }
}

function loadProductList(){
    productList = JSON.parse(localStorage.getItem("productList"));
    

    for(let i=0; i<personList.length; i++){
        productBody.innerHTML += Product.toIndexHTML(productList[i]) ;
    }
}