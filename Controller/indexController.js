const productBody = document.querySelector(".product");
const personBody = document.querySelector(".person");
const entityBody = document.querySelector(".entity");

let personList = [];
let entityList = [];
let productList = [];
let relationList = [];

let user ={
    "x" : "x",
    "y" : "y",
    "z" : "z"
};

// carga los objetos por defecto al localStorage
function previousSetValues(){
    sessionStorage.setItem("Logged",false);
    sessionStorage.setItem("FirstLoged",false)

    localStorage.setItem("user",JSON.stringify(user))

    localStorage.setItem("relation",JSON.stringify(relationList))
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
    loginLogoutController()
}

// cargar las personas
function loadPersonList(){
    let personList
    
    $.ajax({
        url: "http://127.0.0.1:8000/api/v1/persons",
        type: "GET",
        success: function(response){
            personList = response.persons
            for(let i=0; i<personList.length; i++){
                personBody.innerHTML += Person.toIndexHTML(personList[i].person) ;
            }
        },
        error: function(xhr, status, error) {
            console.log('Error in request');
            console.log(error); // Handle the error here
          }
    });
 
}

// cargar las entidades
function loadEntityList(){
    let entityList
    
    $.ajax({
        url: "http://127.0.0.1:8000/api/v1/entities",
        type: "GET",
        success: function(response){
            entityList = response.entities
            for(let i=0; i<entityList.length; i++){
                entityBody.innerHTML += Entity.toIndexHTML(entityList[i].entity) ;
            }
        },
        error: function(xhr, status, error) {
            console.log('Error in request');
            console.log(error); // Handle the error here
          }
    });
}

// cargar los productos
function loadProductList(){
    let productList
    
    $.ajax({
        url: "http://127.0.0.1:8000/api/v1/products",
        type: "GET",
        success: function(response){
            productList = response.products
            for(let i=0; i<productList.length; i++){
                productBody.innerHTML += Product.toIndexHTML(productList[i].product) ;
            }
        },
        error: function(xhr, status, error) {
            console.log('Error in request');
            console.log(error); // Handle the error here
          }
    });
}

// cargar los datos para la modificación
function loadData(){
    let name = document.getElementById("name");
    let birthDate = document.getElementById("birthDate");
    let deathDate = document.getElementById("deathDate");
    let imageURL = document.getElementById("imageURL");
    let wikiURL = document.getElementById("wikiURL");

    let currentChangingObject = JSON.parse(sessionStorage.getItem("actualChangingElement")) 
    let currentList = JSON.parse(localStorage.getItem(getRelatedListType(currentChangingObject)))

    let currentObject = currentList.filter(item => item.name === currentChangingObject)

    name.value = currentObject[0].name;
    birthDate.value = currentObject[0].birthDate;
    deathDate.value = currentObject[0].deathDate;
    imageURL.value = currentObject[0].imageURL.substring(7);
    wikiURL.value = currentObject[0].wikiURL;
}