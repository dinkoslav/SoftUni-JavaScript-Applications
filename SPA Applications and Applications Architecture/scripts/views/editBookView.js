var app = app || {};

app.editBookView = (function() {
    function EditBookView(selector, data) {
        $.get('templates/edit-book.html', function(template) {
            var output = Mustache.render(template, data);
            $(selector).html(output);
        })
    }

    return {
        load: function (selector, data) {
            new EditBookView(selector, data);
        }
    }
}());

