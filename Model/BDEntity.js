const Entity_URL_LINK = "http://127.0.0.1:8000/api/v1/entities";

class BDEntity{

    static getEntityList(){
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: Entity_URL_LINK,
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