class BDProduct{

    static getProductList(){
        return new Promise(function(resolve, reject) {
            $.ajax({
              url: 'http://127.0.0.1:8000/api/v1/products',
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