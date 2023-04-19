const productBody = document.querySelector(".product");
const personBody = document.querySelector(".person");
const entityBody = document.querySelector(".entity");
const loginBody = document.querySelector(".login");
const mainBody = document.querySelector("main");

let personList = [];
let entityList = [];
let productList = [];



function previousSetValues(){
    personList.push(new Person("Tim Berners Lee",new Date(1995,6,8),
    "none","https://es.wikipedia.org/wiki/Tim_Berners-Lee","TimBernersLee.jpeg"));

    entityList.push(new Entity());

    localStorage.setItem("personList",JSON.stringify(personList));
}

previousSetValues();

function onLoad(){
    this.loadPersonList();
    //this.loadEntityList();
    //this.loadProductList();
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
    productList = JSON.parse(localStorage.getItem("productList")) || [];

    for(let i=0; i<productList.length; i++){
        productBody.innerHTML += productList[i].toIndexHTML();
    }
}