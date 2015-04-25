var app = app || {};

app.deletePhoneView = (function() {
    function DeletePhoneView(selector, data) {
        $.get('templates/menu.html', function(template) {
            var output = Mustache.render(template);
            $(selector).html(output);
        });
        $.get('templates/delete-phone-form.html', function(template) {
            var output = Mustache.render(template, data);

            $('#header').text('Phonebook - Delete Phone');
            $(selector).append(output);
        })
    }

    return {
        load: function (selector, data) {
            new DeletePhoneView(selector, data);
        }
    }
}());



