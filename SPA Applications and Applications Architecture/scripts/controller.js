var app = app || {};

app.controller = (function() {
    var Controller = function(model){
        this._model = model;
    }

    Controller.prototype.loadBooks = function(selector){
        this._model.book.getAllBooks()
            .then(function(data){
                app.bookView.load(selector, data);
            },
            function(error){
                console.log(error.statusText);
            })

        $(selector).unbind();
        attachRemoveBookEventHandler.call(this, selector);
    }

    Controller.prototype.addBook = function(selector){
        app.addBookView.load(selector);
        $(selector).unbind();
        attachAddBookEventHandler.call(this, selector);
    }

    Controller.prototype.editBook = function(selector, id){
        this._model.book.getBookById(id)
            .then(function(data){
                app.editBookView.load(selector, data);
            },
            function(error){
                console.log(error.statusText);
            })

        $(selector).unbind();
        attachEditBookEventHandler.call(this, selector);
    }

    var attachAddBookEventHandler = function(selector){
        var _this = this;
        $(selector).on('click', '#addBook', function(){
            var title = $('#title').val();
            var author = $('#author').val();
            var isbn = $('#isbn').val();
            var data = {
                "title": title,
                "author": author,
                "isbn": isbn
            };

            _this._model.book.addBook(data)
                .then(function(data){
                    _this.loadBooks(selector);
                },
                function(error){
                    console.log(error.statusText);
                })
        })
    }

    var attachRemoveBookEventHandler = function(selector){
        var _this = this;
        $(selector).on('click', '#deleteBook', function(){
            var objectId = $(this).data('id');
            _this._model.book.removeBook(objectId)
                .then(function(data){
                    _this.loadBooks(selector);
                },
                function(error){
                    console.log(error.statusText);
                })
        })
    }

    var attachEditBookEventHandler = function(selector){
        var _this = this;
        $(selector).on('click', '#editBook', function(){
            var objectId = $(this).data('id');
            var title = $('#title').val();
            var author = $('#author').val();
            var isbn = $('#isbn').val();
            var data = {
                "title": title,
                "author": author,
                "isbn": isbn
            };

            _this._model.book.editBook(objectId, data)
                .then(function(data){
                    _this.loadBooks(selector);
                },
                function(error){
                    console.log(error.statusText);
                })
        })
    }

    return {
        load: function (model) {
            return new Controller(model);
        }
    }
})();