const LOGIN_URL_LINK = "http://127.0.0.1:8000/api/v1/access_token";
const USER_URL_LINK = "http://127.0.0.1:8000/api/v1/users"

class BDUser {
    static login(username, password) {
        return new Promise(function(resolve, reject) {
            let data = {
                username: username,
                password: password
            };
            $.post(
                "/access_token",
                $.param(data),null)
                .done(function(response) {
                    resolve(response);
                 })
                 .fail(function(xhr) {
                    reject(xhr);
                }
            );
        });
    }

    static getAllUsers(){
        return new Promise(function(resolve, reject) {
            $.ajax({
              url: USER_URL_LINK,
              method: 'GET',
              headers:{
                "Authorization":JSON.parse(sessionStorage.getItem("response")).token_type 
                +" "+ JSON.parse(sessionStorage.getItem("response")).access_token
            },
              success: function(response) {
                resolve(response.users);
              },
              error: function(xhr, status, error) {
                reject(error);
              }
            });
          });
    }

    static getUserInfoByName(username){
        return new Promise(function(resolve, reject) {
            BDUser.getAllUsers()
              .then(function(users) {
                for (let i = 0; i < users.length; i++) {
                  if (users[i].user.username === username) {
                    resolve(users[i].user);
                    return;
                  }
                }
                reject("No se encontró ningún usuario con ese nombre");
              })
              .catch(function(error) {
                reject(error);
              });
          });
    }

    static getUserEtagById(id) {
      return new Promise(function(resolve, reject) {
          $.ajax({
              url: USER_URL_LINK+`/${id}`,
              type: 'GET',
              headers: {
                "Authorization":JSON.parse(sessionStorage.getItem("response")).token_type 
                +" "+ JSON.parse(sessionStorage.getItem("response")).access_token
            },
              success: function(response, textStatus, request) {
              let etag = request.getResponseHeader('ETag');
              resolve(etag);
              },
              error: function(error) {
              console.log(error);
              reject(error);
              }
          });
      });
    }

    static changeUserInformation(id,username,email,password,role,birthdate){
        BDUser.getUserEtagById(id).then(function(etag) {
            let data= {
              username: username,
              email: email,
              password: password,
              role: role,
              birthDate: birthdate
            }
            
            $.ajax({
                url: USER_URL_LINK+`/${id}`,
                type: "PUT",
                data: JSON.stringify(data),
                headers: {
                    "If-Match": etag,
                    "Authorization":JSON.parse(sessionStorage.getItem("response")).token_type 
                    +" "+ JSON.parse(sessionStorage.getItem("response")).access_token
                },
                contentType: "application/json",
                success: function(response) {
                    alert("modificación exitosa")
                },
                error: function(xhr, status, error) {
                    console.log(error)
                }
            })
        })
        .catch(function(error) {
            console.error("Error al obtener el ETag:", error);
        });
    }

    static changeUserInformation(id,username,email,password,role,birthdate,state){
      BDUser.getUserEtagById(id).then(function(etag) {
          let data= {
            username: username,
            email: email,
            password: password,
            role: role,
            birthDate: birthdate,
            state: state
          }
          
          $.ajax({
              url: USER_URL_LINK+`/${id}`,
              type: "PUT",
              data: JSON.stringify(data),
              headers: {
                  "If-Match": etag,
                  "Authorization":JSON.parse(sessionStorage.getItem("response")).token_type 
                  +" "+ JSON.parse(sessionStorage.getItem("response")).access_token
              },
              contentType: "application/json",
              success: function(response) {
                  alert("modificación exitosa")
              },
              error: function(xhr, status, error) {
                  console.log(error)
              }
          })
      })
      .catch(function(error) {
          console.error("Error al obtener el ETag:", error);
      });
  }

    static deleteUserById(id){
      $.ajax({
        url: USER_URL_LINK+`/${id}`,
        type: 'DELETE',
        headers:{
            "Authorization":JSON.parse(sessionStorage.getItem("response")).token_type 
            +" "+ JSON.parse(sessionStorage.getItem("response")).access_token
        },
        success: function(response) {
          alert('User deleted');
        },
        error: function(error) {
          console.error('Error deleting element:', error);
        }
    })
    }
}