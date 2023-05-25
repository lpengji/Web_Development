const loginBody = document.querySelector(".login");
const mainBody = document.querySelector("main");
const mainBodyElements = mainBody.children;
const userInfo = document.querySelector("userInfo");
const userInformationBody = document.querySelector(".userInformation")

let isWriter = JSON.parse(sessionStorage.getItem("isWriter"));
let username = JSON.parse(sessionStorage.getItem("username"))

//generar boton login al inicio
function runOnlyOnceSetDefaultValues(){
    if (loginBody.innerHTML.trim() === '') {
        this.replaceLogoutButton();
    } 
}
runOnlyOnceSetDefaultValues();

// generar comentario de bienvenida con informacion del usuario
function loadUserInformation(){
    userInformationBody.innerHTML =`Bienvenido ${username}`
    generateMoreInformationButton()
}

//carga boton adicionales sobre informaciones
function generateMoreInformationButton(){
    userInformationBody.innerHTML += `  <button onclick="generateMoreInformation()">mis datos personales</button>`
    if(isWriter){
        userInformationBody.innerHTML += `  <button onclick="showAllUserInformation()">gestión usuario BBDD</button>`
        userInformationBody.innerHTML += `  <button onclick="showNotRegisteredUserInformation()">alta nuevo usuario</button>`
    
    }
}

// genera nuevo div con informacion del usuario
function generateMoreInformation(){
    let cancelButton = event.target
    cancelButton.innerHTML = `<button onclick="location.reload()">cancelar</button>`

    let informationDiv = document.createElement("div")
    informationDiv.classList.add("informationDiv")

    BDUser.getUserInfoByName(username)
    .then(function(user) {
        informationDiv.innerHTML = `
        ID <div id="id">${user.id}</div><br>
        <label for="username">Username:</label>
        <input id="username" type="text" name="username" value="${user.username}"/> <br>
        <label for="correo">correo:</label>
        <input id="correo" type="text" name="Correo" value="${user.email}"/> <br>
        <label for="password">Contraseña:</label>
        <input id="password" type="password" name="password" value="${user.username}"/><br>
        <label for="birthday">Fecha Nacimiento:</label>
        <input id="birthday" type="date" name="birthday" value="${user.birthDate}"/><br>
        <input type="submit" name="enviar" value="guardar" onclick="guardarInformacion()"/> `
    })
    .catch(function(error) {
        console.error(error);
    });
    userInformationBody.parentNode.insertBefore(informationDiv, userInformationBody.nextSibling)
}

function guardarInformacion(){
    let id = document.getElementById("id").innerHTML;
    let username = document.getElementById("username").value;
    let correo = document.getElementById("correo").value;
    let password = document.getElementById("password").value;
    let birthday = document.getElementById("birthday").value;
    let role = JSON.parse(sessionStorage.getItem("isWriter")) ? "writer" : "reader";
    BDUser.changeUserInformation(id,username,correo,password,role,birthday);
    sessionStorage.setItem("username",JSON.stringify(username))
    location.reload();
}

// muestra los datos de todos los usuarios
function showAllUserInformation(){
    let cancelButton = event.target
    cancelButton.innerHTML = `<button onclick="location.reload()">cancelar</button>`

    let allUserInformationDiv = document.createElement("div")
    allUserInformationDiv.classList.add("informationDiv")

    BDUser.getAllUsers()
    .then(function(users) {
        for(let i =0; i<users.length; i++){
            if(users[i].user.username !== JSON.parse(sessionStorage.getItem("username")) && users[i].user.state!=="PENDINGACCEPTANCE"){
                allUserInformationDiv.innerHTML += 
                `<div id="user${users[i].user.id}">ID <div class="userID">${users[i].user.id}</div> --
                <label for="UserUsername">Username:</label>
                <input id="UserUsername" type="text" name="UserUsername" value="${users[i].user.username}"/> --
                <label for="UserCorreo">correo:</label>
                <input id="UserCorreo" type="text" name="UserCorreo" value="${users[i].user.email}"/> --
                <label for="UserPassword">Contraseña:</label>
                <input id="UserPassword" type="password" name="UserPassword" value="${users[i].user.username}"/> --
                <label for="UserBirthday">Fecha Nacimiento:</label>
                <input id="UserBirthday" type="date" name="UserBirthday" value="${ users[i].user.birthDate}" /> - -
                <label for="UserRole">Rol:</label>
                <select id="UserRole" name="UserRole">
                    <option value="${users[i].user.role.toLowerCase()}" selected>${users[i].user.role}</option>
                    <option value="${users[i].user.role === 'WRITER' ? 'reader' : 'writer'}">
                        ${users[i].user.role === 'WRITER' ? 'READER' : 'WRITER'}
                    </option>
                </select><br>
                <input type="submit" name="enviar" value="guardar" onclick="guardarNewUserInformacion()"/>
                <input type="submit" name="enviar" value="dar de baja" onclick="setBajaUsuario()"/> 
                <input type="submit" name="enviar" value="${users[i].user.state === 'ACTIVE' ? 'inactive' : 'active'}" onclick="setEstadoUsuario()"/>
                <br><br><br><br>
                </div>
                `
            }
        }
    })
    .catch(function(error) {
        console.error(error);
    });
    userInformationBody.parentNode.insertBefore(allUserInformationDiv, userInformationBody.nextSibling)
}

// guarda los datos modificados por el writer
function guardarNewUserInformacion(){
    
    let currentDiv = document.querySelector(`.informationDiv #${event.target.parentNode.id}`)
    let id = currentDiv.querySelector(".userID").innerHTML
    let username = currentDiv.querySelector('input[name="UserUsername"]').value
    let correo = currentDiv.querySelector(`input[name="UserCorreo"]`).value
    let constraseña = currentDiv.querySelector(`input[name="UserPassword"]`).value
    let birthday = currentDiv.querySelector(`input[name="UserBirthday"]`).value
    let rol = currentDiv.querySelector('#UserRole').value
    BDUser.changeUserInformation(id,username,correo,constraseña,rol,birthday);
    location.reload();
}

// dar de baja a un usuario
function setBajaUsuario(){
    let currentDiv = document.querySelector(`.informationDiv #${event.target.parentNode.id}`)
    let id = currentDiv.querySelector(".userID").innerHTML
    BDUser.deleteUserById(id);
    location.reload();
}

// set activo/incativo
function setEstadoUsuario(){
    let currentDiv = document.querySelector(`.informationDiv #${event.target.parentNode.id}`)
    let id = currentDiv.querySelector(".userID").innerHTML
    let username = currentDiv.querySelector('input[name="UserUsername"]').value
    let correo = currentDiv.querySelector(`input[name="UserCorreo"]`).value
    let constraseña = currentDiv.querySelector(`input[name="UserPassword"]`).value
    let birthday = currentDiv.querySelector(`input[name="UserBirthday"]`).value
    let rol = currentDiv.querySelector('#UserRole').value
    let state = (event.target.value === "active" || event.target.value === "alta user") ? "active":"inactive";
    BDUser.changeUserInformation(id,username,correo,constraseña,rol,birthday,state);
    location.reload();
}

// muestra los usuarios pendiente de dar alta
function showNotRegisteredUserInformation(){
    let cancelButton = event.target
    cancelButton.innerHTML = `<button onclick="location.reload()">cancelar</button>`

    let notRegisteredUserInformationDiv = document.createElement("div")
    notRegisteredUserInformationDiv.classList.add("informationDiv")

    BDUser.getAllUsers()
    .then(function(users) {
        for(let i =0; i<users.length; i++){
            if(users[i].user.username !== JSON.parse(sessionStorage.getItem("username")) && users[i].user.state==="PENDINGACCEPTANCE"){
                notRegisteredUserInformationDiv.innerHTML += 
                `<div id="user${users[i].user.id}">ID <div class="userID">${users[i].user.id}</div> --
                <label for="UserUsername">Username:</label>
                <input id="UserUsername" type="text" name="UserUsername" value="${users[i].user.username}"/> --
                <label for="UserCorreo">correo:</label>
                <input id="UserCorreo" type="text" name="UserCorreo" value="${users[i].user.email}"/> --
                <label for="UserPassword">Contraseña:</label>
                <input id="UserPassword" type="password" name="UserPassword" value="${users[i].user.username}"/> --
                <label for="UserBirthday">Fecha Nacimiento:</label>
                <input id="UserBirthday" type="date" name="UserBirthday" value="${ users[i].user.birthDate}" /> - -
                <label for="UserRole">Rol:</label>
                <select id="UserRole" name="UserRole">
                    <option value="${users[i].user.role.toLowerCase()}" selected>${users[i].user.role}</option>
                    <option value="${users[i].user.role === 'WRITER' ? 'reader' : 'writer'}">
                        ${users[i].user.role === 'WRITER' ? 'READER' : 'WRITER'}
                    </option>
                </select><br>
                <input type="submit" name="enviar" value="alta user" onclick="setEstadoUsuario()"/>
                <br><br><br><br>
                </div>
                `
            }
        }
    })
    .catch(function(error) {
        console.error(error);
    });
    userInformationBody.parentNode.insertBefore(notRegisteredUserInformationDiv, userInformationBody.nextSibling)
}

// si el usuario se ha logeado y es writer
function loginController(){
    this.replaceLoginButton();
    if(isWriter){
        this.addAddButton();
        this.addModificationButton();
        this.addRemoveButton();
    }
}

function logoutController(){
    this.replaceLogoutButton();
    if(isWriter){
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
        sessionStorage.setItem("username",JSON.stringify(user))
        checkIsWriter(user).then(function(){
            loginController();
            location.reload();
        });
    }).catch(function(error) {
        alert(error.responseJSON.error_description);
    });
}

function checkIsWriter(username){
    return new Promise(function(resolve, reject) {
        BDUser.getUserInfoByName(username)
          .then(function(user) {
            sessionStorage.setItem("isWriter",user.role === "WRITER")
            resolve();
          })
          .catch(function(error) {
            reject(error);
          });
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
    logoutController()
    location.reload();
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