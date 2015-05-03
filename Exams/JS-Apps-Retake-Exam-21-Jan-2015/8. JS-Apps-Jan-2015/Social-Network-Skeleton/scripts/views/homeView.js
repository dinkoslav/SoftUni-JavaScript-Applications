var app = app || {};

app.homeView = (function() {
    function HomeView(selector, user) {
        $.get('templates/header.html', function(template) {
        var output = Mustache.render(template, user);
        $(selector).html(output);
    });
    }

    return {
        load: function (selector, user) {
            new HomeView(selector, user);
        }
    }
}());
