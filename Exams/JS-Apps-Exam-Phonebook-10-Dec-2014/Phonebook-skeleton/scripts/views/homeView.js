var app = app || {};

app.homeView = (function() {
    function HomeView(selector, user) {
        $.get('templates/menu.html', function(template) {
        var output = Mustache.render(template);
        $(selector).html(output);
    });
        $.get('templates/home.html', function(template) {
            var output = Mustache.render(template, user);

            $('#header').text('Phonebook - Home');
            $(selector).append(output);
        })
    }

    return {
        load: function (selector, user) {
            new HomeView(selector, user);
        }
    }
}());
