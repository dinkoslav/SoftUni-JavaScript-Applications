var app = app || {};

app.book = (function (){
    var Book = function(baseUrl, requester){
        this._baseUrl = baseUrl;
        this._requester = requester;
    }

    Book.prototype.getAllBooks = function(){
        return this._requester.get("classes/Book");
    }

    Book.prototype.addBook = function(data){
        return this._requester.post("classes/Book", data);
    }

    Book.prototype.removeBook = function(id){
        return this._requester.delete("classes/Book/" + id);
    }

    Book.prototype.getBookById = function(id){
        return this._requester.get("classes/Book/" + id);
    }

    Book.prototype.editBook = function(id, data){
        return this._requester.put("classes/Book/" + id, data);
    }

    return {
        load: function(baseUrl, requester){
            return new Book(baseUrl, requester);
        }
    }
})();


