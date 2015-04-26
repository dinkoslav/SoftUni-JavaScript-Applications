var app = app || {};

app.addBookView = (function() {
    function AddBookView(selector) {
        $.get('templates/add-book.html', function(template) {
            var output = Mustache.render(template);
            $(selector).html(output);
        })
    }

    return {
        load: function (selector) {
            new AddBookView(selector);
        }
    }
}());




