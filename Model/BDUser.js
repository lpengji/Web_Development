const LOGIN_URL_LINK = "http://127.0.0.1:8000/api/v1/access_token";

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
}