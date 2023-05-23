const Person_URL_LINK = "http://127.0.0.1:8000/api/v1/persons";

class BDPerson {

    static getPersonList() {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: Person_URL_LINK,
                method: 'GET',
                success: function(response) {
                    resolve(response);
                },
                error: function(error) {
                    reject(error);
                }
            });
        });
    }

    static getPersonById(id){
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: Person_URL_LINK+`/${id}` ,
                method: 'GET',
                success: function(response) {
                    resolve(response);
                },
                error: function(error) {
                    reject(error);
                }
            });
        });
    }

    static getPersonEtagById(id){
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: Person_URL_LINK+`/${id}`,
                type: 'GET',
                success: function(response, textStatus, jqXHR) {
                    var etag = jqXHR.getResponseHeader('ETag');
                    resolve(etag);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    reject(errorThrown);
                }
            });
        });
    }

    static postNewPerson(name,birthDate,deathDate,imageUrl,wikiUrl){
        $.ajax({
            url: Person_URL_LINK ,
            method: 'POST',
            headers:{
                "Authorization":JSON.parse(sessionStorage.getItem("response")).token_type 
                +" "+ JSON.parse(sessionStorage.getItem("response")).access_token
            },
            data: {
                name: name,
                birthDate: birthDate,
                deathDate: deathDate,
                imageUrl: imageUrl,
                wikiUrl: wikiUrl,
            },
            success: function(response) {
                alert("Nueva persona creada");
            },
            error: function(error) {
                alert(error.responseJSON.message)
            }
        });
    }

    static deletePersontById(id){
        $.ajax({
            url: Person_URL_LINK+`/${id}`,
            type: 'DELETE',
            headers:{
                "Authorization":JSON.parse(sessionStorage.getItem("response")).token_type 
                +" "+ JSON.parse(sessionStorage.getItem("response")).access_token
            },
            success: function(response) {
              console.log('Element deleted');
            },
            error: function(error) {
              console.error('Error deleting element:', error);
            }
        })
    }
    
    static getPersonEtagById(id) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: Person_URL_LINK+`/${id}`,
                type: 'GET',
                success: function(response, textStatus, request) {
                var etag = request.getResponseHeader('ETag');
                resolve(etag);
                },
                error: function(error) {
                console.log(error);
                reject(error);
                }
            });
        });
    }

    static changePersonInformation(id,newData){
        BDPerson.getPersonEtagById(id).then(function(etag) {
            $.ajax({
                url: Person_URL_LINK+`/${id}`,
                type: "PUT",
                data: JSON.stringify(newData),
                headers: {
                    "If-Match": etag,
                    "Authorization":JSON.parse(sessionStorage.getItem("response")).token_type 
                    +" "+ JSON.parse(sessionStorage.getItem("response")).access_token
                },
                contentType: "application/json",
                success: function(response) {
                    alert("modificacíon exitosa")
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

    static changeRelation(relatedElementType,relatedElementId,currentElementId,operation){
        return new Promise(function(resolve,reject){
            $.ajax({
                url: Person_URL_LINK+`/${currentElementId}`+`/${relatedElementType}`+`/${operation}`+`/${relatedElementId}`,
                type: 'PUT',
                headers:{
                    "Authorization":JSON.parse(sessionStorage.getItem("response")).token_type 
                    +" "+ JSON.parse(sessionStorage.getItem("response")).access_token
                },
                success: function(response) {
                  resolve();
                },
                error: function(error) {
                  console.error('Error deleting relation:', error);
                }
            })
        })
    }
}