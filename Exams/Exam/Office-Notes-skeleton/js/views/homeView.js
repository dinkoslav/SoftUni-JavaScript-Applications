var app = app || {};

app.homeView = (function() {
    function HomeView(selector, data) {
        $.get('templates/home.html', function(template) {
            var output = Mustache.render(template, data);
            $(selector).html(output);
        })
    }

    return {
        load: function (selector, data) {
            new HomeView(selector, data);
        }
    }
}());
