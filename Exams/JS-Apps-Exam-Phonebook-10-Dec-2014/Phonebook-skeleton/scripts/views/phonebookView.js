var app = app || {};

app.phonebookView = (function() {
    function PhonebookView(selector, data) {
        $.get('templates/menu.html', function(template) {
            var output = Mustache.render(template);
            $(selector).html(output);
        });
        $.get('templates/phonebook.html', function(template) {
            var output = Mustache.render(template, data);

            $('#header').text('Phonebook - List');
            $(selector).append(output);
        })
    }

    return {
        load: function (selector, data) {
            new PhonebookView(selector, data);
        }
    }
}());

