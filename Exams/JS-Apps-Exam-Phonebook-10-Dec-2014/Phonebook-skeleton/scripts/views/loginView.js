var app = app || {};

app.loginView = (function() {
    function LoginView(selector) {
        $.get('templates/login-form.html', function(template) {
            var output = Mustache.render(template);

            $('#header').text('Phonebook - Login');
            $(selector).html(output);
        })
    }

    return {
        load: function (selector) {
            new LoginView(selector);
        }
    }
}());
