class BDEntity{

    static getEntityList(){
        return new Promise(function(resolve, reject) {
            $.ajax({
              url: 'http://127.0.0.1:8000/api/v1/entities',
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

    
}