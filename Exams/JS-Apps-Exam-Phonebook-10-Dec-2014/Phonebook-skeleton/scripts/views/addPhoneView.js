var app = app || {};

app.addPhoneView = (function() {
    function AddPhoneView(selector) {
        $.get('templates/menu.html', function(template) {
            var output = Mustache.render(template);
            $(selector).html(output);
        });
        $.get('templates/add-phone-form.html', function(template) {
            var output = Mustache.render(template);

            $('#header').text('Phonebook - Add Phone');
            $(selector).append(output);
        })
    }

    return {
        load: function (selector) {
            new AddPhoneView(selector);
        }
    }
}());


