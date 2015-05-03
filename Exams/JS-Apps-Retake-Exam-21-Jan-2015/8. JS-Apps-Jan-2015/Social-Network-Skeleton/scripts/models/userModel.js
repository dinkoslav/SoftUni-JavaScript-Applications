var app = app || {};

app.user = (function() {
    function User (baseUrl, requester) {
        this._baseUrl = baseUrl;
        this._requester = requester;
    }

    User.prototype.register = function Register(data){
        return this._requester.post('users', data);
    };

    User.prototype.editProfile = function Register(data){
        return this._requester.put('users/' + sessionStorage.objectId, data);
    };

    User.prototype.getUserById = function getUserById(userId){
        return this._requester.get('users/' + userId);
    };

    User.prototype.logout = function logout(){
        return this._requester.post('logout');
    };

    User.prototype.login = function login(data){
        return this._requester.get('login?username=' + data.username + '&password=' + data.password);
    };

    return {
        load: function(baseUrl, requester){
            return new User(baseUrl, requester);
        }
    }
}());
