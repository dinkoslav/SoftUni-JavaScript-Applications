var app = app || {};

app.bookView = (function() {
    function BookView(selector, data) {
        $.get('templates/home.html', function(template) {
            var output = Mustache.render(template, data);
            $(selector).html(output);
        })
    }

    return {
        load: function (selector, data) {
            new BookView(selector, data);
        }
    }
}());



