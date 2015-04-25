var app = app || {};

app.phone = (function() {
    function Phone (baseUrl, requester) {
        this._baseUrl = baseUrl;
        this._requester = requester;
    }

    Phone.prototype.getAllPhones = function(){
        return this._requester.get('classes/Phone');
    }

    //Phone.prototype.getPhoneByNameAndNumber = function(userId, phoneNumber){
    //    return this._requester.get('classes/Phone/' + userId + '?phoneNumber="' + phoneNumber + '"');
    //}

    Phone.prototype.addPhone = function(data){
        return this._requester.post('classes/Phone', data);
    }

    Phone.prototype.deletePhone = function(data){
        return this._requester.delete('classes/Phone/' + data);
    }

    return {
        load: function(baseUrl, requester){
            return new Phone(baseUrl, requester);
        }
    }
}());

