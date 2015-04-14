var app = app || {};

app.data = (function (){
    var HEADERS = {
        'X-Parse-Application-Id': 'XbnxfQqzecXcTqCYXFMMXlcjues9VCjReyRVyEdx',
        'X-Parse-REST-API-Key': 'II4zzFbfRBX2utAlgbn7xl7De7IYiZTTIQX04ShV'
    };

    function Data(url, ajaxRequester){
        this._url = url;
        this._ajaxRequester = ajaxRequester;
    }

    Data.prototype.listAllBooks = function(success, error){
        this._ajaxRequester.getRequest(HEADERS, this._url, success, error);
    };

    Data.prototype.createNewBook = function(data, success, error){
        this._ajaxRequester.postRequest(HEADERS, this._url, data, success, error);
    };

    Data.prototype.updateABook = function(data, bookId, success, error){
        this._ajaxRequester.putRequest(HEADERS, this._url + "/" + bookId, data, success, error);
    };

    Data.prototype.deleteABook = function(bookId, success, error){
        this._ajaxRequester.deleteRequest(HEADERS, this._url + "/" + bookId, success, error);
    };

    return {
        get: function(url, ajaxRequester){
            return new Data(url, ajaxRequester);
        }
    }
})();

