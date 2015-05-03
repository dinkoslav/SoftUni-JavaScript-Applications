var app = app || {};

app.user = (function (){
    var User = function(baseUrl, requester){
        this._baseUrl = baseUrl;
        this._requester = requester;
    };

    User.prototype.register = function(data){
        return this._requester.post('users', data);
    };

    User.prototype.login = function(data){
        return this._requester.get('login?username=' + data.username + '&password=' + data.password);
    };

    User.prototype.editProfile = function(data){
        return this._requester.put('users/' + sessionStorage.objectId, data);
    };

    User.prototype.getUserById = function(){
        var userId = sessionStorage.objectId;
        return this._requester.get('users/' + userId);
    };

    return {
        load: function(baseUrl, requester){
            return new User(baseUrl, requester);
        }
    }
})();
