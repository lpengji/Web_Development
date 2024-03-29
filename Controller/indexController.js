const productBody = document.querySelector(".product");
const personBody = document.querySelector(".person");
const entityBody = document.querySelector(".entity");

let state = sessionStorage.getItem("response")
// carga los objetos por defecto al localStorage
// function previousSetValues(){
//     sessionStorage.setItem("FirstLoged",false)
// }


function showOnLoad(){
    if(state !== null && state !== undefined && state !== ""){
        productBody.style.display = "block";
        personBody.style.display = "block";
        entityBody.style.display = "block";
    }else{
        productBody.style.display = "none";
        personBody.style.display = "none";
        entityBody.style.display = "none";
    }
}

// carga los contenidos del localStorage por pantalla
function onLoad(){
    if(state !== null && state !== undefined && state !== ""){
        BDUser.getUserInfoByName(username)
        .then(function(user) {
            if(user.state === "ACTIVE"){
                loadUserInformation()
                Promise.all([loadPersonList(), loadEntityList(), loadProductList()])
                .then(function() {
                    loginController();
                })
                .catch(function(error) {
                    console.error(error);
                });
            }
            else{
                sessionStorage.clear();
                productBody.style.display = "none";
                personBody.style.display = "none";
                entityBody.style.display = "none";
                console.log("Sin permiso de acceso")
            }
                
        })
        .catch(function(error) {
            console.error(error);
        });
    }else{
        productBody.style.display = "none";
        personBody.style.display = "none";
        entityBody.style.display = "none";
    }
}

// cargar las personas
function loadPersonList(){
    return new Promise(function(resolve, reject) {
        let personList;
        BDPerson.getPersonList()
        .then(function(response) {
            personList = response.persons;
            for (let i = 0; i < personList.length; i++) {
                personBody.innerHTML += Person.toIndexHTML(personList[i].person, "persons");
            }
            resolve();
        })
        .catch(function(error) {
            reject(error);
        });
    });
 
}

// cargar las entidades
function loadEntityList(){
    return new Promise(function(resolve, reject) {
        let entityList;
        BDEntity.getEntityList()
        .then(function(response) {
            entityList = response.entities;
            for (let i = 0; i < entityList.length; i++) {
                entityBody.innerHTML += Entity.toIndexHTML(entityList[i].entity, "entities");
            }
            resolve();
        })
        .catch(function(error) {
            reject(error);
        });
    });
}

// cargar los productos
function loadProductList(){
    return new Promise(function(resolve, reject) {
        let productList;
        BDProduct.getProductList()
        .then(function(response) {
            productList = response.products;
            for (let i = 0; i < productList.length; i++) {
                productBody.innerHTML += Product.toIndexHTML(productList[i].product, "products");
            }
            resolve();
        })
        .catch(function(error) {
            reject(error);
        });
    });
}

// cargar los datos para la modificación
function loadData(){
    loadUserInformation()
    let name = document.getElementById("name");
    let birthDate = document.getElementById("birthDate");
    let deathDate = document.getElementById("deathDate");
    let imageURL = document.getElementById("imageURL");
    let wikiURL = document.getElementById("wikiURL");

    let changingInformation = JSON.parse(sessionStorage.getItem("actualChangingElement")) 

    if (changingInformation.elementType === "products"){
        BDProduct.getProductById(changingInformation.elementId).then(function(response) {
            name.value = response.product.name;
            birthDate.value = response.product.birthDate;
            deathDate.value = response.product.deathDate;
            imageURL.value = response.product.imageUrl;
            wikiURL.value = response.product.wikiUrl;
        })
        .catch(function(error) {
            console.error(error);
        });
    }
    else if(changingInformation.elementType === "persons"){
        BDPerson.getPersonById(changingInformation.elementId).then(function(response) {
            name.value = response.person.name;
            birthDate.value = response.person.birthDate;
            deathDate.value = response.person.deathDate;
            imageURL.value = response.person.imageUrl;
            wikiURL.value = response.person.wikiUrl;
        })
        .catch(function(error) {
            console.error(error);
        });

    }else if(changingInformation.elementType === "entities"){
        BDEntity.getEntityById(changingInformation.elementId).then(function(response) {
            name.value = response.entity.name;
            birthDate.value = response.entity.birthDate;
            deathDate.value = response.entity.deathDate;
            imageURL.value = response.entity.imageUrl;
            wikiURL.value = response.entity.wikiUrl;
        })
        .catch(function(error) {
            console.error(error);
        });
    }
}