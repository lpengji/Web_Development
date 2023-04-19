const productBody = document.querySelector(".product");
const personBody = document.querySelector(".person");
const entityBody = document.querySelector(".entity");
const loginBody = document.querySelector(".login");
const mainBody = document.querySelector("main");
const mainBodyElements = mainBody.children;

function onLoad(){
    // creando los elementos de producto
    const bodyArticle = document.createElement("article");
    bodyArticle.innerHTML = '<img src="img/html.png" height="45" /> <a href="html.html">HTML</a>';

    // creando los elementos de persona
    const personArticle = document.createElement("article");
    personArticle.innerHTML = '<img src="img/TimBernersLee.jpeg" height="45" /> <a href="TimBernersLee.html">Tim Berners Lee</a>'

    // creando los elementos de entidad
    const entityArticle = document.createElement("article");
    entityArticle.innerHTML = '<img src="img/cern.png" height="45" /> <a href="CERN.html">CERN</a>'

    //asignando los elementos creados al dom
    productBody.appendChild(bodyArticle);
    personBody.appendChild(personArticle);
    entityBody.appendChild(entityArticle);
}


function login(){
    // creando logout button al logear
    loginBody.innerHTML = '<input type="submit" name="enviar" value="logout" onclick="logout()"/>';

    // crear los botones add  
    const addButton = document.createElement("button");
    const addText = document.createTextNode("add");
    addButton.appendChild(addText);
    
    for(let i =0; i<mainBodyElements.length; i++){
        mainBodyElements[i].append(addButton);
    }

    // crear los botones delete
}

function logout(){
    loginBody.innerHTML = `<label for="campoUsuario">Usuario:</label>
    <input id="campoUsuario" type="text" name="campoUsuario" />
    <label for="campoContraseña">Contraseña:</label>
    <input id="campoContraseña" type="password" name="campoContraseña" />
    <input type="submit" name="enviar" value="login" onclick="login()"/>`;
    
    for(let i =0; i<mainBodyElements.length; i++){
        mainBodyElements[i].removeChild(mainBodyElements[i].lastChild);
    }
}