const loginBody = document.querySelector(".login");
const mainBody = document.querySelector("main");
const mainBodyElements = mainBody.children;
const userInfo = document.querySelector("userInfo");

// comprobar si el usuario se ha logeado
function loginLogoutController(){
    let state = sessionStorage.getItem("response")
    let firstLoged = JSON.parse(sessionStorage.getItem("FirstLoged")) 

    if(state !== null && state !== undefined && state !== ""){
        this.replaceLoginButton();
        this.addAddButton();
        this.addModificationButton();
        this.addRemoveButton();
    }else{
        this.replaceLogoutButton();
        this.removeAddButton();
        this.removeModificationButton();
        this.removeRemoveButton();
        
    }
}

// cargar los elemento al hacer login
function login(){
    let user = document.getElementById("campoUsuario").value
    let password = document.getElementById("campoContraseña").value
    
    BDUser.login(user,password).then(function(response) {
        sessionStorage.setItem("response",JSON.stringify(response));
        sessionStorage.setItem("FirstLoged",true)
        loginLogoutController();
    }).catch(function(error) {
        alert(error.responseJSON.error_description);
        // Código a ejecutar en caso de error
    });
}

// añadir boton logout
function replaceLoginButton(){
    loginBody.innerHTML = `<button onclick="logout()">logout</button>`
}

// añadir boton add
function addAddButton(){
    let type;
    for(let i =0; i<mainBodyElements.length; i++){
        type = mainBodyElements[i].getAttribute("class")
        mainBodyElements[i].innerHTML += `<button id="add" onclick="changeToCreateForum()">add `+type+` </button>`;
    }
}

// añadir boton modificacion
function addModificationButton(){
    const articlesList = document.querySelectorAll("article");
    for(let i =0; i<articlesList.length; i++){
        articlesList[i].innerHTML += `<button id="modification" onclick="changeToModifyForum()">change</button>`;
    }
}

// añadir boton delete
function addRemoveButton(){
    const articlesList = document.querySelectorAll("article");
    for(let i =0; i<articlesList.length; i++){
        articlesList[i].innerHTML += `<button id="remove" onclick="removeElement()">remove</button>`;
    }
}

// cargar los elemento al hacer logout
function logout(){
    sessionStorage.clear();
    loginLogoutController()
}

// añadir input y boton login
function replaceLogoutButton(){
    loginBody.innerHTML = 
    `<label for="campoUsuario">Usuario:</label>
    <input id="campoUsuario" type="text" name="campoUsuario" />
    <label for="campoContraseña">Contraseña:</label>
    <input id="campoContraseña" type="password" name="campoContraseña" />
    <input type="submit" name="enviar" value="login" onclick="login()"/>`
}

function removeAddButton(){
    for(let i =0; i<mainBodyElements.length; i++){
        mainBodyElements[i].removeChild(document.getElementById("add"));
    }
}

function removeModificationButton(){
    const articlesList = document.querySelectorAll("article");
    for(let i =0; i<articlesList.length; i++){
        articlesList[i].removeChild(document.getElementById("modification"));
    }
}

function removeRemoveButton(){
    const articlesList = document.querySelectorAll("article");
    for(let i =0; i<articlesList.length; i++){
        articlesList[i].removeChild(document.getElementById("remove"));
    }
}