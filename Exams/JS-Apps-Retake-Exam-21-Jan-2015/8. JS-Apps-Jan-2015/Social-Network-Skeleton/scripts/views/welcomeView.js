var app = app || {};

app.welcomeView = (function() {
    function WelcomeView(selector) {
        $.get('templates/guest-home.html', function(template) {
            var output = Mustache.render(template);

            $(selector).html(output);
        })
    }

    return {
        load: function (selector) {
            new WelcomeView(selector);
        }
    }
}());
