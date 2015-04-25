var app = app || {};

app.registerView = (function() {
    function RegisterView(selector) {
        $.get('templates/register-form.html', function(template) {
            var output = Mustache.render(template);

            $('#header').text('Phonebook - Registration');
            $(selector).html(output);
        })
    }

    return {
        load: function (selector) {
            new RegisterView(selector);
        }
    }
}());
