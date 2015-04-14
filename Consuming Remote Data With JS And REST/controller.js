var app = app || {};

app.controller = (function (){
    function Controller(data){
        this._data = data;
    }

    Controller.prototype.load = function(location){
        this._data.listAllBooks(
            function(data){
                $(location).empty();
                data.results.forEach(function(b){
                    var book = $('<div>');
                    $('<h1>').text(b.title).appendTo(book);
                    $('<p>').text('Author: ' + b.author).appendTo(book);
                    $('<p>').text('ISBN: ' + b.isbn).appendTo(book);
                    var deleteButton = $('<button>').text('Delete');
                    $(deleteButton).data('bookId', b.objectId);
                    deleteButton.attr('class', 'deleteButton');
                    var editButton = $('<button>').text('Edit');
                    $(editButton).data('bookId', b.objectId);
                    editButton.attr('class', 'editButton');
                    editButton.appendTo(book);
                    deleteButton.appendTo(book);
                    book.appendTo(location);
                })
            },
            function(error){
                this.error();
            }
        )
    };

    Controller.prototype.addEventHandlers = function(location){
        addBookEventHandler.call(this, location);
        deleteBookEventHandler.call(this, location);
        editBookEventHandler.call(this, location);
        submitEditBookEventHandler.call(this, location);
    };

    var addBookEventHandler = function(selector){
        var _this = this;
        $(selector).on('click', '#newBookButton', function(){
            var title = $('#title').val();
            var author = $('#author').val();
            var isbn = $('#isbn').val();
            var data = {
                title: title,
                author: author,
                isbn: isbn
            };
            _this._data.createNewBook(data,
                function(result){
                    _this.load(selector + '> div');
                },
                function(error){
                    _this.error();
                }
            )
        })
    };

    var deleteBookEventHandler = function(selector){
        var _this = this;
        $(selector).on('click', '.deleteButton', function(event){
            var bookId = $(event.target).data('bookId');
            _this._data.deleteABook(bookId,
            function(result){
                _this.load(selector + '> div');
            },
            function(error){
                _this.error();
            }
            )
        })
    };

    var editBookEventHandler = function(selector){
        var _this = this;
        $(selector).on('click', '.editButton', function(event){
            var bookId = $(event.target).data('bookId');
            var inputTitle = $('<input>').attr('class', 'inputTitle').attr('placeholder', 'New title');
            var inputAuthor = $('<input>').attr('class', 'inputAuthor').attr('placeholder', 'New author');
            var inputISBN = $('<input>').attr('class', 'inputISBN').attr('placeholder', 'New ISBN');
            var submitButton = $('<button>').text('Submit');
            $(submitButton).data('bookId', bookId);
            submitButton.attr('class', 'submitButton');
            inputTitle.appendTo($(event.target).parent());
            inputAuthor.appendTo($(event.target).parent());
            inputISBN.appendTo($(event.target).parent());
            submitButton.appendTo($(event.target).parent());
        })
    };

    var submitEditBookEventHandler = function(selector){
        var _this = this;
        $(selector).on('click', '.submitButton', function(event) {
            var bookId = $(event.target).data('bookId');
            var data = {};
            var newTitle = $(event.target).parent().find('.inputTitle').val();
            var newAuthor = $(event.target).parent().find('.inputAuthor').val();
            var newISBN = $(event.target).parent().find('.inputISBN').val();
            data.title = newTitle || undefined;
            data.author = newAuthor || undefined;
            data.isbn = newISBN || undefined;
            _this._data.updateABook(data, bookId,
                function(result){
                    _this.load(selector + '> div');
                },
                function(error){
                    _this.error();
                }
            )
        })
    }

    function error() {
        noty({
                text: 'Cannot load AJAX data.',
                type: 'error',
                layout: 'topCenter',
                timeout: 5000
            }
        );
    }

    return {
        get: function(data){
            return new Controller(data);
        }
    }
})();
